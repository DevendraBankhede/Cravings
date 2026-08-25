import crypto from "crypto";
import Razorpay from "razorpay";
import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";

// Lazily create Razorpay instance so missing keys fail loudly
const getRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

// ─── Helper: find a customer's order safely ─────────────────────────────────
const getCustomerOrder = async (userId, orderId) => {
  const customer = await Customer.findOne({ customerId: userId });
  if (!customer) return null;
  return Order.findOne({ _id: orderId, customerId: customer._id });
};

// ─── POST /payment/create-order ──────────────────────────────────────────────
// 1. Takes the app's orderId from the body
// 2. Creates a Razorpay order (amount in paise, 1 INR = 100 paise)
// 3. Saves the razorpayOrderId on our order document
// 4. Returns key + order details to the frontend
export const CreateRazorpayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      const err = new Error("orderId is required");
      err.statusCode = 400;
      return next(err);
    }

    const order = await getCustomerOrder(req.user._id, orderId);
    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    if (order.paymentDetails?.paymentStatus === "completed") {
      const err = new Error("Payment already completed for this order");
      err.statusCode = 400;
      return next(err);
    }

    const razorpay = getRazorpayInstance();

    // Razorpay expects amount in the SMALLEST currency unit (paise for INR)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.billDetails.finalAmount * 100), // e.g. ₹250 → 25000
      currency: "INR",
      receipt: `receipt_${order._id}`, // your internal reference
      notes: { appOrderId: String(order._id) }, // optional metadata
    });

    // Save the Razorpay order ID so we can match it during verification
    order.paymentDetails.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return res.status(200).json({
      message: "Razorpay order created",
      data: {
        key: process.env.RAZORPAY_KEY_ID, // sent to frontend to open checkout
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        appOrderId: order._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── POST /payment/verify ────────────────────────────────────────────────────
// After the user pays, Razorpay sends 3 IDs to the frontend handler.
// We MUST verify the HMAC-SHA256 signature on the backend to confirm
// the payment was not tampered with.
export const VerifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      const err = new Error("All payment verification fields are required");
      err.statusCode = 400;
      return next(err);
    }

    const order = await getCustomerOrder(req.user._id, orderId);
    if (!order) {
      const err = new Error("Order not found");
      err.statusCode = 404;
      return next(err);
    }

    // ── Signature Verification (CRITICAL security step) ──────────────────────
    // Razorpay signs: "razorpay_order_id|razorpay_payment_id"
    // using your Key Secret as the HMAC key.
    // If the computed hash matches the received signature → payment is genuine.
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Signatures don't match → payment was tampered with
      order.paymentDetails.paymentStatus = "failed";
      order.orderStatus = "failed";
      await order.save();

      const err = new Error("Payment signature verification failed");
      err.statusCode = 400;
      return next(err);
    }

    // ── Payment is verified. Update the order ────────────────────────────────
    order.paymentDetails.paymentStatus = "completed";
    order.paymentDetails.razorpayOrderId = razorpay_order_id;
    order.paymentDetails.razorpayPaymentId = razorpay_payment_id;
    order.paymentDetails.razorpaySignature = razorpay_signature;
    order.paymentDetails.paidAt = new Date();
    order.orderStatus = "accepted"; // move order to next stage
    await order.save();

    return res.status(200).json({
      message: "Payment verified and order successful",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
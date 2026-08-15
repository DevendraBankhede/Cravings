import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../config/Apiconfig";
import toast from "react-hot-toast";
import { foodTypeDot } from "./publicRestaurantDetails/helpers";
import {
  IoCartOutline,
  IoTrashOutline,
  IoArrowBack,
  IoStorefrontOutline,
} from "react-icons/io5";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useState } from "react";

const Cart = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const {
    cart,
    totalItems,
    totalPrice,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart();
  const { isLogin, role, user } = useAuth();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Already loaded (e.g. user opened checkout before)
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    // 1. Gaurd Check
    if (!isLogin) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (role !== "customer") {
      toast.error("Only customer can place order");
      return;
    }

    if (!cart?.items?.length) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setIsPlacingOrder(true);

      // 2. Create the app-level order in our database
      const createOrderRes = await api.post("/order/create", {
        restaurantId: cart.restaurantId,
        paymentMethod: "upi",
        orderItems: cart.items.map((i) => ({
          itemId: i._id,
          quantity: i.quantity,
        })),
      });
      const appOrderId = createOrderRes?.data?.data?._id;

      // 3. Ask our backend to create a Razorpay order
      //    Backend talks to Razorpay API → returns razorpayOrderId + amount
      const paymentOrderRes = await api.post("/payment/create-order", {
        orderId: appOrderId,
      });
      const paymentData = paymentOrderRes?.data?.data;

      // 4. Load the Razorpay JS SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // 5. Open the Razorpay checkout popup
      const options = {
        key: paymentData.key, // Your Key ID
        amount: paymentData.amount, // In paise (already set by backend)
        currency: paymentData.currency, // "INR"
        name: "Cravings",
        description: "Food Order Payment",
        order_id: paymentData.razorpayOrderId, // The Razorpay order ID (not our DB ID)

        // 6. Called by Razorpay when payment SUCCEEDS
        handler: async function (response) {
          // response contains:
          //   razorpay_order_id   - the Razorpay order ID
          //   razorpay_payment_id - the payment transaction ID
          //   razorpay_signature  - HMAC signature to verify on backend

          try {
            await api.post("/payment/verify", {
              orderId: appOrderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment successful!");
            clearCart();
            navigate("/customer-dashboard");
          } catch (err) {
            toast.error(
              err.response?.data?.message || "Payment verification failed",
            );
          }
        },

        prefill: {
          // Pre-fill customer details (optional)
          name: user.fullName,
          email: user.email,
        },

        theme: { color: "#c2410c" }, // Brand color

        modal: {
          ondismiss: () => toast.error("Payment cancelled"),
        },
      };

      const rzp = new window.Razorpay(options);

      // Called when payment FAILS inside the popup
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open(); // Open the popup!
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!cart.items.length) {
    return (
      <div className="min-h-screen bg-(--color-base-200) flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-24 h-24 rounded-full bg-(--color-base-300) flex items-center justify-center">
          <IoCartOutline className="text-5xl text-(--color-secondary)" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-(--color-base-content) mb-1">
            Your cart is empty
          </h2>
          <p className="text-sm text-(--color-secondary)">
            Add items from a restaurant to get started
          </p>
        </div>
        <Link
          to="/order-now"
          className="px-6 py-2 bg-(--color-primary) text-(--color-primary-content) rounded-xl font-semibold text-sm hover:opacity-90 transition"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-base-200)">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-(--color-base-300) transition text-(--color-base-content)"
          >
            <IoArrowBack className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-(--color-base-content) flex items-center gap-2">
              <IoCartOutline />
              Your Cart
            </h1>
            <p className="text-sm text-(--color-secondary) flex items-center gap-1 mt-0.5">
              <IoStorefrontOutline />
              {cart.restaurantName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Items List */}
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-(--color-base-100) rounded-xl p-4 border border-(--color-base-300) flex gap-4 items-center"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-(--color-base-300)">
                  {item.image?.url ? (
                    <img
                      src={item.image.url}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MdOutlineRestaurantMenu className="text-2xl text-(--color-secondary) opacity-40" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full border border-white shrink-0 ${foodTypeDot(item.foodType)}`}
                    />
                    <h3 className="text-sm font-semibold text-(--color-base-content) truncate">
                      {item.itemName}
                    </h3>
                  </div>
                  <p className="text-xs text-(--color-secondary) mb-1">
                    {item.category}
                  </p>
                  <p className="text-sm font-bold text-(--color-primary)">
                    ₹{(item.price * item.quantity).toFixed(2)}
                    <span className="ml-1 text-xs font-normal text-(--color-secondary)">
                      (₹{item.price} × {item.quantity})
                    </span>
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-(--color-base-300) rounded-full divide-(--color-base-300) divide-x">
                    <button
                      onClick={() => decreaseItem(item._id)}
                      className="px-1.5 py-0.5 text-(--color-primary) rounded-l-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition"
                    >
                      <IoIosRemoveCircleOutline className="text-xl" />
                    </button>
                    <div className="text-(--color-primary) flex justify-center items-center text-sm font-semibold px-2 py-0.5 min-w-7">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => increaseItem(item._id)}
                      className="px-1.5 py-0.5 text-(--color-primary) rounded-r-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition"
                    >
                      <IoIosAddCircleOutline className="text-xl" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-(--color-secondary) hover:text-red-500 transition"
                    title="Remove item"
                  >
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <div className="flex justify-end pt-1">
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:underline flex items-center gap-1"
              >
                <IoTrashOutline />
                Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-(--color-base-100) rounded-xl border border-(--color-base-300) p-5 sticky top-20">
            <h2 className="text-base font-bold text-(--color-base-content) mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-(--color-secondary)">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-(--color-secondary)">
                <span>Delivery fee</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-(--color-base-300) my-2" />
              <div className="flex justify-between font-bold text-(--color-base-content) text-base">
                <span>Total</span>
                <span className="text-(--color-primary)">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              disabled={isPlacingOrder}
              className="w-full py-3 bg-(--color-primary) text-(--color-primary-content) rounded-xl font-semibold text-sm hover:opacity-90 transition"
              onClick={handlePlaceOrder}
            >
              {isPlacingOrder ? "Processing..." : "Place Order"}
            </button>

            <Link
              to={`/restaurant-details/${cart.restaurantId}`}
              className="mt-3 flex items-center justify-center gap-1 text-xs text-(--color-primary) hover:underline"
            >
              <IoStorefrontOutline />
              Add more items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
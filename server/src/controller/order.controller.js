import Customer from "../models/customer.model.js";
import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";

const getDefaultDeliveryAddress = (currentUser) => {
  return {
    name: currentUser.fullName,
    address: "Address Line",
    city: "City",
    state: "State",
    pinCode: "000000",
    country: "India",
    geoLocation: {
      lat: "",
      lon: "",
    },
  };
};

export const CreateOrder = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (!currentUser || currentUser.userType !== "customer") {
      const error = new Error("Only customers can create orders");
      error.statusCode = 403;
      return next(error);
    }

    const { restaurantId, orderItems, paymentMethod, deliveryAddress } =
      req.body;

    if (
      !restaurantId ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      const error = new Error("restaurantId and orderItems are required");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentUser);

    //temp word
    const customer =
      (await Customer.findOne({ customerId: currentUser._id })) || currentUser;
    if (!customer) {
      const error = new Error("Customer profile not found");
      error.statusCode = 404;
      return next(error);
    }

    const menuDoc = await Menu.findOne({ restaurantId });
    if (!menuDoc || !menuDoc.menuItems?.length) {
      const error = new Error("Restaurant menu not found");
      error.statusCode = 404;
      return next(error);
    }

    const normalizedOrderItems = [];
    let itemsAmount = 0;

    for (const item of orderItems) {
      const menuItem = menuDoc.menuItems.id(item.itemId);
      const qty = Number(item.quantity);

      if (!menuItem || !qty || qty < 1) {
        const error = new Error("Invalid order item or quantity");
        error.statusCode = 400;
        return next(error);
      }

      itemsAmount += Number(menuItem.price) * qty;
      normalizedOrderItems.push({
        itemId: menuItem._id,
        quantity: qty,
      });
    }

    const platformFee = 5;
    const convenienceFee = 5;
    const deliveryCharge = 0;
    const taxAmount = Math.round(itemsAmount * 0.05 * 100) / 100;
    const discountAmount = 0;
    const totalAmount = Math.round(itemsAmount * 100) / 100;
    const finalAmount =
      Math.round(
        (totalAmount +
          platformFee +
          convenienceFee +
          deliveryCharge +
          taxAmount -
          discountAmount) *
          100,
      ) / 100;

    const newOrder = await Order.create({
      restaurantId,
      customerId: customer._id,
      orderItems: normalizedOrderItems,
      orderStatus: "pending",
      billDetails: {
        totalAmount,
        platformFee,
        convenienceFee,
        taxAmount,
        deliveryCharge,
        discountAmount,
        finalAmount,
      },
      deliveryAddress:
        deliveryAddress || getDefaultDeliveryAddress(currentUser),
      paymentDetails: {
        paymentMethod: paymentMethod || "upi",
        paymentStatus: "pending",
      },
    });

    res.status(201).json({
      message: "Order created with payment pending",
      data: newOrder,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
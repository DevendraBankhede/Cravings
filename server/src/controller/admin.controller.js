import User from "../models/user.model.js";
import Restaurant from "../models/restaurant.model.js";
import Rider from "../models/rider.model.js";
import Order from "../models/order.model.js";

export const GetAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalRiders = await Rider.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { "paymentDetails.paymentStatus": "completed" } },
      { $group: { _id: null, total: { $sum: "$billDetails.finalAmount" } } },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("restaurantId", "restaurantName");

    res.status(200).json({
      message: "Admin overview fetched successfully",
      data: {
        totalUsers,
        totalRestaurants,
        totalRiders,
        totalOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        recentOrders,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const GetAllRestaurantsAdmin = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().populate(
      "managerId",
      "fullName email phone",
    );
    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const UpdateRestaurantStatus = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive", "blocked"].includes(status)) {
      const error = new Error("Invalid status");
      error.statusCode = 400;
      return next(error);
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { status },
      { new: true },
    );

    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: `Restaurant status updated to ${status}`,
      data: restaurant,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const GetAllOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("restaurantId", "restaurantName")
      .populate({
        path: "customerId",
        populate: { path: "customerId", select: "fullName email phone" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

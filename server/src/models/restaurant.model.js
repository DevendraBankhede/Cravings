import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

export default Restaurant;
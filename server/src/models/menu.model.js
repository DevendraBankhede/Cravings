import mongoose from "mongoose";

const MenuSchema = mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    menuItems: {
      type: [
        {
          itemName: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          category: { type: String, required: true },
          image: {
            type: { url: { type: String }, publicId: { type: String } },
            required: true,
          },
          isAvailable: { type: Boolean, default: true },
          isTopRated: { type: Boolean, default: false },
          isRecommended: { type: Boolean, default: false },
          isNew: { type: Boolean, default: false },
        },
      ],
    },
  },
  { timestamps: true },
);


const Menu = mongoose.model("menu", MenuSchema);

export default Menu;
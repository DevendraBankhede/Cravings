import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurantName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
    geoLocation: {
      type: {
        lat: {
          type: String,
        },
        lon: {
          type: String,
        },
      },
    },

    documents: {
      type: {
        legalName: { type: String, required: true },
        companyType: { type: String, required: true },
        gstCertificate: { type: String, required: true },
        fssaiCertificate: { type: String, required: true },
        panCard: { type: String, required: true },
      },
    },
    financialDetails: {
      type: {
        bankName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
      },
    },
    contactDetails: {
      type: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },
    },
    servingHours: {
      type: {
        openingTime: { type: String, required: true },
        closingTime: { type: String, required: true },
      },
    },
    isOpen: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },
    averageRating: { type: Number, default: 0 },
    cuisineTypes: {
      type: [String],
      required: true,
    },
    restaurantImage: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, required: true },
        },
      ],
      required: true,
    },
    coverImage: {
      type: {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
      required: true,
    },
    description: { type: String, required: true },
    restaurantType: {
      type: String,
      enum: ["veg", "non-veg", "jain", "vegan", "both"],
      required: true,
    },
    socialMediaLinks: {
      type: [
        {
          platform: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

export default Restaurant;
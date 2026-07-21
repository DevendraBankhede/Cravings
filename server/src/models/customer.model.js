import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    addressBook: {
      type: [
        {
          name: { type: String, required: true },
          address: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          pinCode: { type: String, required: true },
          country: { type: String, required: true },
          addressType: {
            type: String,
            enum: ["home", "work", "other"],
            required: true,
          },
          isDefault: { type: Boolean, default: false },
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
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "suspended"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model("customer", CustomerSchema);

export default Customer;
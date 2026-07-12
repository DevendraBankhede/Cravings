import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    },
  },
  { timestamps: true },
);

const OTP = mongoose.model("otp", otpSchema);

export default OTP;
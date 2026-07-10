import mongoose from "mongoose";

const RiderSchema = mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Rider = mongoose.model("rider", RiderSchema);

export default Rider;
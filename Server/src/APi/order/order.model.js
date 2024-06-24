import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "payment done",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Types.ObjectId,
            ref: "Food",
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
export const orderModel = mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const userTokenSchema = mongoose.Schema({
  userId: { type: String, required: [true, "user id required"] },
  accessToken: { type: [String], required: [true, "Access token is required"] },
  refreshToken: {
    type: [String],
    required: [true, "Refresh token is required"],
  },
});

export const userTokenModel = mongoose.model("UserToken", userTokenSchema);

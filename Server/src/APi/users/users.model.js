import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";

// Address schema for better readabillity
// const addressSchema = mongoose.Schema({
//   Street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
// });
// User schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensure phoneNumber is a 10-digit number
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must br at least 6 character"],
    },
    favourites: {
      type: [mongoose.Types.ObjectId],
      ref: "Food",
      default: [],
    },
    order: {
      type: [mongoose.Types.ObjectId],
      ref: "Order",
      default: [],
    },
    cart: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered Password:", enteredPassword);
  console.log("Hashed Password:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

export const authenticationUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return FailedResponse(400, "User not found");
    }
    console.log("password", password);
    const isMatch = await user.matchPassword(password);
    console.log("afetr", isMatch);
    if (!isMatch) {
      return FailedResponse(400, "Password does not match");
    }

    const response = {
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      userPhone: user.phoneNumber,
      // userAddress: user.address,
      // userPinCode: user.pinCode,
    };
    return SuccessResponse(response, "Password Match");
  } catch (error) {
    console.log("err:", error);
    return FailedResponse(403, "Unable to do authentication");
  }
};

// Create and export the user model
export const userModel = mongoose.model("User", userSchema);

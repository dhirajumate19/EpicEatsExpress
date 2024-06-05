import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../utils/responses/response.js";

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
    // address: {
    //   type: addressSchema,
    //   required: true,
    // },
    // pinCode: {
    //   type: Number,
    //   required: true,
    //   validate: {
    //     validator: function (v) {
    //       return /\d{6}/.test(v); // Ensure pinCode is a 5-digit number
    //     },
    //     message: (props) => `${props.value} is not a valid pin code!`,
    //   },
    // },
  },
  { timestamps: true }
);
// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  }
  next();
});
// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const authenticationUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return failedResponse(400, "User not found");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return failedResponse(400, "Password does not match");
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
    return failedResponse(403, "Unable to do authentication");
  }
};

// Create and export the user model
export const userModel = mongoose.model("User", userSchema);

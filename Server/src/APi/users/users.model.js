import mongoose from "mongoose";
import bcrypt from "bcrypt";
// Address schema for better readabillity
const addressSchema = mongoose.Schema({
  Street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});
// User schema
const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must br at least 6 character"],
    },
    address: {
      type: addressSchema,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{6}/.test(v); // Ensure pinCode is a 5-digit number
        },
        message: (props) => `${props.value} is not a valid pin code!`,
      },
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
  return await bcrypt.compare(enteredPassword, this.password);
};
// Create and export the user model
export const userModel = mongoose.model("User", userSchema);

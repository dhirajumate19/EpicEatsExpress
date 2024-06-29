import mongoose from "mongoose";
import validator from "validator";

// Nested price schema
const priceSchema = mongoose.Schema(
  {
    org: {
      type: Number,
      required: true,
      min: [0, "Original price cannot be negative"],
    },
    mrp: {
      type: Number,
      required: true,
      min: [0, "MRP cannot be negative"],
    },
    off: {
      type: Number,
      required: true,
      min: [0, "Discount cannot be negative"],
    },
  },
  { _id: false }
);

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Food name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    img: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isURL(v, {
            protocols: ["http", "https"],
            require_protocol: true,
          });
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    price: {
      type: priceSchema,
      required: true,
    },
    category: { type: String, required: [true, "Category is required"] },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
  },
  {
    timestamps: true,
  }
);

// Additional custom validation to ensure that the offered price is not greater than the original price
foodSchema.path("price").validate(function (value) {
  return value.off <= value.org;
}, "Offered price cannot exceed original price");

export const foodModel = mongoose.model("Food", foodSchema);

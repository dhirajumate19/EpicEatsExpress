import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Food name is required"] },
    description: { type: String, required: [true, "Description is Required"] },
    img: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], // Ensure price is not negative
      max: [10000, "Price cannot exceed 10000"], // Arbitrary maximum value for validation

      default: { org: 0.0, mrp: 0.0, off: 0 },
      validate: {
        validator: function (v) {
          return v >= 0; // Additional validation for non-negative price
        },
        message: (props) => `${props.value} is not a valid price!`,
      },
    },
    category: { type: String, required: [true, "Category is required"] },
    ingredients: {
      type: [String],
      required: [true, "Ingredients is required"],
    },
  },
  {
    timestamps: true,
  }
);
// Additional custom validation to ensure that the offered price is not greater than the original price
foodSchema.path("price").validate(function (value) {
  return !(this.price && this.price.off > this.price.org);
}, "Offered price cannot exceed original price");

export const foodModel = mongoose.model("Food", foodSchema);

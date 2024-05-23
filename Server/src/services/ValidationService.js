import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().trim().min(1).required().messages({
    "string.base": "Full Name should be a type of 'text'",
    "string.empty": "Full Name cannot be an empty field",
    "any.required": "Full Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is required",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
      "string.empty": "Phone number cannot be an empty field",
      "any.required": "Phone number is required",
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one special character",
      "any.required": "Password is required",
    }),
  address: Joi.object({
    Street: Joi.string().trim().min(1).required().messages({
      "string.base": "Street should be a type of 'text'",
      "string.empty": "Street cannot be an empty field",
      "any.required": "Street is required",
    }),
    city: Joi.string().trim().min(1).required().messages({
      "string.base": "City should be a type of 'text'",
      "string.empty": "City cannot be an empty field",
      "any.required": "City is required",
    }),
    state: Joi.string().trim().min(1).required().messages({
      "string.base": "State should be a type of 'text'",
      "string.empty": "State cannot be an empty field",
      "any.required": "State is required",
    }),
    country: Joi.string().trim().min(1).required().messages({
      "string.base": "Country should be a type of 'text'",
      "string.empty": "Country cannot be an empty field",
      "any.required": "Country is required",
    }),
  }).required(),
  pinCode: Joi.number().integer().min(100000).max(999999).required().messages({
    "number.base": "Pin code must be a number",
    "number.min": "Pin code must be exactly 6 digits",
    "number.max": "Pin code must be exactly 6 digits",
    "any.required": "Pin code is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be an empty field",
    "any.required": "Password is required",
  }),
});

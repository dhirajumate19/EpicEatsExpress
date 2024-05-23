import { loginSchema, userSchema } from "../../services/ValidationService.js";

import { FailedResponse } from "../../utils/responses/response.js";
// Function to check if a string is not empty and trimmed
const validate = (data) => {
  return data && data.trim().length > 0;
};

export const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.send(FailedResponse(400, errorMessage.join(",")));
  }
  next();
};

export const loginValidtor = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.send(FailedResponse(400, errorMessage));
  }
  next();
};

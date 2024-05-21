import { FailedResponse } from "../../utils/responses/response.js";
// Function to check if a string is not empty and trimmed
const validate = (data) => {
  return data && data.trim().length > 0;
};

export const userValidation = (req, res, next) => {
  try {
    const { fullName, email, password, address, pinCode } = req.body;

    if (!validate(fullName)) {
      return res
        .status(400)
        .send(FailedResponse(400, "Please enter your full name"));
    }

    if (!validate(email)) {
      return res
        .status(400)
        .send(FailedResponse(400, "Please enter a valid email address"));
    }

    if (!validate(password)) {
      return res
        .status(400)
        .send(FailedResponse(400, "Please enter a password"));
    }

    if (
      !address ||
      typeof address !== "object" ||
      !validate(address.Street) ||
      !validate(address.city) ||
      !validate(address.state) ||
      !validate(address.country)
    ) {
      return res
        .status(400)
        .send(FailedResponse(400, "Please enter a valid address"));
    }

    if (!pinCode || typeof pinCode !== "number") {
      return res
        .status(400)
        .send(FailedResponse(400, "Please enter a valid pin code"));
    }

    // If all validations pass, move to the next middleware
    next();
  } catch (error) {
    return res
      .status(500)
      .send(FailedResponse(500, "An error occurred during validation"));
  }
};

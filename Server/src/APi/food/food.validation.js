import { foodSchema } from "../../services/Validation/ValidationService.js";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { foodModel } from "./food.model.js";

export const foodValidation = async (req, res, next) => {
  const foodData = req.body;
  for (const foodInfo of foodData) {
    const { error } = foodSchema.validate(foodInfo, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((details) => details.message);
      console.log("error", typeof errorMessage);
      return res.send(FailedResponse(400, errorMessage.join(",")));
    }
  }

  next();
};

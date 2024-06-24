import express from "express";
import {
  addProductsController,
  getProductItems,
  getProductItemsById,
} from "./food.controller.js";
import { foodValidation } from "./food.validation.js";
import { authenticateToken } from "../Auth/authToken.js";

const foodRouter = express.Router();

foodRouter.post(
  "/food",
  foodValidation,
  authenticateToken,
  addProductsController
);
foodRouter.get("/getfood", getProductItems);
foodRouter.get("/getfood/:id", authenticateToken, getProductItemsById);
export default foodRouter;

import express from "express";
import {
  addProductsController,
  getProductItems,
  getProductItemsById,
} from "./food.controller.js";
import { foodValidation } from "./food.validation.js";

const foodRouter = express.Router();

foodRouter.post("/food", foodValidation, addProductsController);
foodRouter.get("/", getProductItems);
foodRouter.get("/:id", getProductItemsById);
export default foodRouter;

import express from "express";
import { addProductsController, getProductItems } from "./food.controller.js";
import { foodValidation } from "./food.validation.js";

const foodRouter = express.Router();

foodRouter.post("/food", foodValidation, addProductsController);
foodRouter.get("/", getProductItems);
export default foodRouter;

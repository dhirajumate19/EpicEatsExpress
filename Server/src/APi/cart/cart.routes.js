import express from "express";
import {
  addToCart,
  getAllCartProduct,
  removeItemFromCart,
} from "./cart.controller.js";
import { authenticateToken } from "../Auth/authToken.js";
import { authMiddleware } from "./cartModdleware.js";

const cartRouter = express.Router();

cartRouter.post("/addcart", authMiddleware, addToCart);
cartRouter.get("/getcart", authMiddleware, getAllCartProduct);
cartRouter.delete("/removecartitem", authMiddleware, removeItemFromCart);
export default cartRouter;

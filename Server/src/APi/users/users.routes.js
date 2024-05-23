import express from "express";
import {
  userCreationController,
  userLoginController,
} from "./users.controller.js";
import { loginValidtor, userValidation } from "./users.validator.js";
const userRouter = express.Router();
userRouter.post("/signup", userValidation, userCreationController);
userRouter.post("/signin", loginValidtor, userLoginController);
export default userRouter;

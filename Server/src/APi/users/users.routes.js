import express from "express";
import { userCreationController } from "./users.controller.js";
import { userValidation } from "./users.validator.js";
const userRouter = express.Router();
userRouter.post("/user", userValidation, userCreationController);
export default userRouter;

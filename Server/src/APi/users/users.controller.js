import mongoose from "mongoose";
import { userModel } from "./users.model.js";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";

export const userCreationController = async (req, res) => {
  try {
    const { fullName, email, password, address, pinCode } = req.body;
    //create new user
    const newUser = new userModel({
      fullName,
      email,
      password,
      address,
      pinCode,
    });
    //Save user data to DB
    const response = await newUser.save();
    // Send success response
    res
      .status(201)
      .send(SuccessResponse({ Record: response }, "New User Added"));
  } catch (error) {
    console.log("Internal Error", error);
    res.status(500).send(
      FailedResponse(500, {
        message: error.errmsg,
        keyValue: { email: req.body.email },
      })
    );
  }
};

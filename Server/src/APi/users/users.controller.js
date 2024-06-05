import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticationUser, userModel } from "./users.model.js";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { S_Key } from "../../services/JWT/JWT.config.js";
import { generateToken } from "../../services/JWT/JWT.service.js";

// Controller function for user creation
export const userCreationController = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, address, pinCode } = req.body;

    // Check if the user already exists in the database
    const existingUser = await userModel.findOne({ email: email });

    // If user already exists, send a failure response
    if (existingUser) {
      return res
        .status(400)
        .send(FailedResponse(400, `User with email ${email} already exists`));
    }

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      phoneNumber,
      password,
      address,
      pinCode,
    });

    // Save user data to the database
    const response = await newUser.save();

    // Send success response
    res
      .status(201)
      .send(SuccessResponse({ Record: response }, "New User Added"));
  } catch (error) {
    // If an error occurs, send a failure response with error details
    res.status(500).send(
      FailedResponse(500, {
        message: error.errmsg,
        keyValue: { email: req.body.email },
      })
    );
  }
};

// Controller function for user login
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verifiedUser = await authenticationUser(email, password);

    if (!verifiedUser.data) {
      return res.send(FailedResponse(403, "Login failed"));
    }
    // console.log("payload in contro", verifiedUser);
    // Generate JWT token for user authentication
    const token = await generateToken({ userId: verifiedUser.data.userId });

    // Send success response with token and user details
    res
      .status(201)
      .send(SuccessResponse({ token, UserDetail: verifiedUser }, "User Login"));
  } catch (error) {
    // If an error occurs, log the error and send a failure response
    console.log(error);
    res.status(500).send(FailedResponse(500, "Internal Error"));
  }
};

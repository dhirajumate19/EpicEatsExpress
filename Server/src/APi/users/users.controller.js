import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "./users.model.js";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { S_Key } from "../../../config.js";

// Controller function for user creation
export const userCreationController = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, address, pinCode } =
      req.body;

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
      fullName,
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

    // Find the user in the database based on email
    const userFind = await userModel.findOne({ email: email });

    // If user does not exist, send a failure response
    if (!userFind) {
      return res
        .status(400)
        .send(FailedResponse(400, `${email} does not match`));
    }

    // Check if the entered password matches the user's password
    const isCorrectPassword = bcrypt.compareSync(password, userFind.password);

    // If password does not match, send a failure response
    if (!isCorrectPassword) {
      return res
        .status(400)
        .send(FailedResponse(400, `Password does not match`));
    }

    // Generate JWT token for user authentication
    const token = jwt.sign({ email }, S_Key);

    // Send success response with token and user details
    res
      .status(201)
      .send(SuccessResponse({ token, UserDetail: userFind }, "User Login"));
  } catch (error) {
    // If an error occurs, log the error and send a failure response
    console.log(error);
    res.status(500).send(FailedResponse(500, "Internal Error"));
  }
};

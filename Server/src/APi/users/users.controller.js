import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from "./users.model.js";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { S_Key } from "../../../config.js";

export const userCreationController = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, address, pinCode } =
      req.body;

    //check exsting user in DB
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .send(FailedResponse(400, `User with email ${email} already exists`));
    }
    //create new user
    const newUser = new userModel({
      fullName,
      email,
      phoneNumber,
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
    res.status(500).send(
      FailedResponse(500, {
        message: error.errmsg,
        keyValue: { email: req.body.email },
      })
    );
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = userModel.findOne({ email: email });

    if (!userFind) {
      return res
        .status(400)
        .send(FailedResponse(400, `${email} or Password does not match `));
    }

    const token = jwt.sign({ email }, S_Key);
    res.status(201).send(SuccessResponse(token, "User Login"));
  } catch (error) {
    console.log(error);
    res.status(500).send(
      FailedResponse(500, {
        message: error.errmsg,
        keyValue: { email: req.body.email },
      })
    );
  }
};

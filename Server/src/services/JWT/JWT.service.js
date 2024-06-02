import jwt from "jsonwebtoken";
import { ACCESS_EXP_IN, REFRESH_EXP_IN, S_Key } from "./JWT.config.js";
import { userTokenModel } from "./JWT.model.js";
export const generateToken = async (payload) => {
  try {
    if (!payload.userId) {
      throw new Error("Missing userId in payload");
    }

    const accessToken = jwt.sign(payload, S_Key, { expiresIn: ACCESS_EXP_IN });
    const refreshToken = jwt.sign(payload, S_Key, {
      expiresIn: REFRESH_EXP_IN,
    });

    let userToken = await userTokenModel.findOne({ userId: payload.userId });

    if (!userToken) {
      const newUserTokenData = {
        userId: payload.userId,
        accessToken: [accessToken],
        refreshToken: [refreshToken],
      };
      userToken = new userTokenModel(newUserTokenData);
    } else {
      userToken.accessToken.push(accessToken);
      userToken.refreshToken.push(refreshToken);
    }

    await userToken.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error generating token:", error);
    return { error: "Error while generating token" };
  }
};
export const validateToken = async (token) => {
  try {
    const decode = jwt.verify(token, S_Key);
    return { valid: true, decode };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};
export const reGenerateToken = async (refreshToken) => {
  try {
    const decode = jwt.verify(refreshToken, S_Key);
    const userId = decode.userId;

    const userToken = await userTokenModel.findOne({ userId });
    if (!userToken || !userToken.refreshToken.includes(refreshToken)) {
      throw new Error("Invalid refresh token");
    }
    const newAccessToken = jwt.sign({ userId }, S_Key, {
      expiresIn: ACCESS_EXP_IN,
    });
    userToken.accessToken.push(newAccessToken);
    await userToken.save();
    return { accessToken: newAccessToken };
  } catch (error) {
    return { error: "Error while regenerating token" };
  }
};
export const destroy = async (userId, token) => {
  try {
    const userToken = await userTokenModel.findOne({ userId });
    if (!userToken) {
      throw new Error("User not found");
    }
    userToken.accessToken = userToken.accessToken.filter(
      (item) => item !== token
    );
    userToken.refreshToken = userToken.refreshToken.filter(
      (iten) => item !== token
    );
    await userToken.save();
    return { sucess: true };
  } catch (error) {
    return { error: "Error while destroying token" };
  }
};
export const decodeToken = async (token) => {
  try {
    const decodeToken = jwt.decode(token);
    return { decodeToken };
  } catch (error) {
    return { error: "Error while decoding token" };
  }
};

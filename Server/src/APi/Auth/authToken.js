import jwt from "jsonwebtoken";
import {
  ACCESS_EXP_IN,
  REFRESH_EXP_IN,
  S_Key,
} from "../../services/JWT/JWT.config.js";
import {
  generateToken,
  reGenerateToken,
  validateToken,
} from "../../services/JWT/JWT.service.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Access token is required" });
  }
  const { valid, decode, error } = await validateToken(token);
  if (valid) {
    req.user = decode;
    next();
  } else {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.headers["x-refresh-token"];
      if (!refreshToken) {
        return res.status(401).send({ error: "Refresh token is required" });
      }
      const newTokens = await reGenerateToken(refreshToken);
      if (newTokens.error) {
        return res.status(403).send({ error: newTokens.error });
      }
      res.setHeader("Authorization", `Bearer ${newTokens.accessToken}`);
      res.setHeader("x-refresh-token", newTokens.refreshToken);

      req.user = jwt.decode(newTokens.accessToken);
      next();
    } else {
      return res.status(403).send({ error: "Invalid token" });
    }
  }
};

import jwt from "jsonwebtoken";
import { S_Key } from "../../services/JWT/JWT.config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, S_Key);

    // Attach the user information to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decodedToken.userId };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide",
      error: error.message,
    });
  }
};

export default  protect;
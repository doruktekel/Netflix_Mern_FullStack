import jwt from "jsonwebtoken";
import { envVars } from "../config/envVars.js";

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, envVars.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: envVars.NODE_ENV !== "development",
  });

  return token;
};

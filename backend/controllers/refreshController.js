import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "./authController.js";
import jwt from "jsonwebtoken";

export const refreshTokenController = async (req, res) => {
  const oldToken = req.body.refreshToken;
  if (!oldToken) return res.status(401).json("No token provided!");

  const user = await User.findOne({ refreshToken: oldToken });
  if (!user) return res.status(403).json("Token not found in database");

  jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json("Token expired!");
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
};

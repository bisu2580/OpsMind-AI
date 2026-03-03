import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/logout-user", logoutUser);
router.get("/get-user", verifyToken, getUser);

export default router;

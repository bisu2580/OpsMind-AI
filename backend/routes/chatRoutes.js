import express from "express";
import {
  chatController,
  chatHistoryController,
} from "../controllers/chatController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/", verifyToken, chatController);
router.get("/history", verifyToken, chatHistoryController);
export default router;

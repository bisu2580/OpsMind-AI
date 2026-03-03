import express from "express";
import { refreshTokenController } from "../controllers/refreshController.js";

const router = express.Router();

router.post("/refresh-token", refreshTokenController);

export default router;

import express from "express";
import { uploadToServerController } from "../controllers/fileController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/multerMiddleware.js";
const router = express.Router();

router.post(
  "/upload-to-server",
  verifyToken,
  upload.array("files", 10),
  uploadToServerController,
);

export default router;

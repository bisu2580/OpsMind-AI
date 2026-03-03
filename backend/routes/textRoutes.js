import express from "express";
import { generateText } from "../controllers/textController.js";
import {
  getDocumentsController,
  deleteDocumentController,
} from "../controllers/fileController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-documents", getDocumentsController);
router.delete("/delete-document/:id", verifyToken, deleteDocumentController);

export default router;

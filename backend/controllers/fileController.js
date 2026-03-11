import File from "../models/FileModel.js";
import { PDFParse } from "pdf-parse";
import { chunkText } from "../utils/chunker.js";
import { generateEmbeddingsBatch } from "../utils/embedding.js";
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const uploadToServerController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }
    const savedFiles = [];
    let chunks;
    for (const file of req.files) {
      const parser = new PDFParse({ url: file.path });
      const result = await parser.getText();

      const textChunks = [];
      const chunkPages = [];
      for (const page of result.pages) {
        if (!page.text) continue;
        const pageChunks = chunkText(page.text);
        textChunks.push(...pageChunks);
        for (let i = 0; i < pageChunks.length; i++) {
          chunkPages.push(page.num);
        }
      }

      const embeddings = await generateEmbeddingsBatch(textChunks);
      const vectorChunks = textChunks.map((chunk, index) => ({
        text: chunk,
        embeddings: embeddings[index],
        page: chunkPages[index],
      }));
      const doc = await File.create({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
        createdAt: formatDate(Date.now()),
        uploadedBy: req.user?.id,
        chunks: vectorChunks,
      });
      savedFiles.push(doc);
    }
    return res.status(200).json({
      success: true,
      message: "PDFs uploaded successfully",
      chunks: chunks,
      files: savedFiles,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getDocumentsController = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      files,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteDocumentController = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    await File.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

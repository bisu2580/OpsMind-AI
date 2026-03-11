import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  embeddings: { type: [Number], required: true },
  page: { type: Number },
});
const fileSchema = new mongoose.Schema(
  {
    filename: String,
    originalname: String,
    path: String,
    size: Number,
    mimetype: String,
    chunks: [chunkSchema],
    createdAt: {
      type: Date,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("File", fileSchema);

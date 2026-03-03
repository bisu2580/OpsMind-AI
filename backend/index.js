import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import textRoutes from "./routes/textRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/mongoose.js";
import authRoutes from "./routes/authRoutes.js";
import refreshTokenRoutes from "./routes/refreshRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
const app = express();
const port = 5000;
const __dirname = path.resolve();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/text", textRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/refresh", refreshTokenRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

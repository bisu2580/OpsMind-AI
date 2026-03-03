import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  citations: [
    {
      filename: String,
      score: Number,
    },
  ],
  createdAt: {
    type: Date,
  },
});

export default mongoose.model("Chat", chatSchema);

import { ragChat } from "../services/ragChat.js";
import Chat from "../models/chatModels.js";

export const chatController = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const result = await ragChat(query);
    const chat = new Chat({
      userId: req.user.id,
      messages: [
        { role: "user", content: query },
        {
          role: "assistant",
          content: result.answer,
          citations: result.citations,
        },
      ],
      createdAt: new Date(),
    });
    await chat.save();

    res.status(200).json({
      success: true,
      answer: result.answer,
      citations: result.citations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const chatHistoryController = async (req, res) => {
  try {
    const chatHistory = await Chat.find({ userId: req.user.id }).sort({
      createdAt: 1,
    });
    res.status(200).json({
      success: true,
      chatHistory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getAuditLogsController = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const auditLogs = chats.flatMap((chat) =>
      chat.messages
        .filter((msg) => msg.role === "user")
        .map((msg, idx) => {
          // Find the assistant reply immediately after this user message
          const assistantReply = chat.messages[chat.messages.indexOf(msg) + 1];
          return {
            query: msg.content,
            user: chat.userId?.username || chat.userId?.email || "Unknown",
            citations: assistantReply?.citations || [],
            // createdAt: msg.createdAt || chat.createdAt,
          };
        }),
    );

    return res.status(200).json({ success: true, auditLogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

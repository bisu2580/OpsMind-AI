import { chunkText } from "../utils/chunker";

export const breakToChunks = async (req, res) => {
  const { text } = req.body;
  try {
    const chunks = chunkText(text);
    console.log(chunks);
    res.status(200).json({ chunks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GEMINI_API_KEY,
});
export async function generateEmbeddings(text) {
  if (typeof text !== "string") {
    throw new Error("generateEmbedding expects a string");
  }
  const embedding = await embeddings.embedQuery(text);
  return embedding;
}
export async function generateEmbeddingsBatch(texts) {
  if (!Array.isArray(texts)) {
    throw new Error("generateEmbeddingsBatch expects an array of strings");
  }

  const response = await embeddings.embedDocuments(texts);

  return response;
}

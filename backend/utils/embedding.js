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

export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

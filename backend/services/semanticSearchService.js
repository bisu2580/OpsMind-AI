import File from "../models/FileModel.js";
import { cosineSimilarity } from "../utils/embedding.js";

export async function retrieveTopChunks(queryEmbedding, topK = 3) {
  const results = await File.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "chunks.embeddings",
        queryVector: queryEmbedding,
        numCandidates: 15,
        limit: 5,
      },
    },
    {
      $project: {
        filename: 1,
        originalname: 1,
        chunkText: "$chunks.text",
        chunkPage: "$chunks.page",
        chunkEmbeddings: "$chunks.embeddings",
      },
    },
  ]);

  const allChunks = [];
  
  for (const doc of results) {
    if (!doc.chunkEmbeddings || !doc.chunkText) continue;
    
    for (let i = 0; i < doc.chunkEmbeddings.length; i++) {
        const similarity = cosineSimilarity(queryEmbedding, doc.chunkEmbeddings[i]);
        allChunks.push({
            filename: doc.filename,
            originalname: doc.originalname,
            chunkText: doc.chunkText[i],
            chunkPage: doc.chunkPage ? doc.chunkPage[i] : null,
            score: similarity,
        });
    }
  }
  
  // Sort descending by score
  allChunks.sort((a, b) => b.score - a.score);
  
  return allChunks.slice(0, topK);
}

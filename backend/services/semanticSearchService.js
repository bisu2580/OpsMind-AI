import File from "../models/FileModel.js";
export async function retrieveTopChunks(queryEmbedding, topK = 3) {
  const results = await File.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "chunks.embeddings",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: topK,
      },
    },
    {
      $project: {
        filename: 1,
        chunkText: "$chunks.text",
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  return results;
}

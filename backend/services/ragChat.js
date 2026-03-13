import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retrieveTopChunks } from "./semanticSearchService.js";
import { buildSystemPrompt } from "./ragPromptBuilder.js";
import { generateEmbeddings } from "../utils/embedding.js";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GEMINI_API_KEY,
});

export async function ragChat(userQuery) {
  const queryEmbedding = await generateEmbeddings(userQuery);
  const retrievedChunks = await retrieveTopChunks(queryEmbedding, 3);
  const systemPrompt = buildSystemPrompt(userQuery, retrievedChunks);
  const response = await llm.invoke(systemPrompt);
  const citationMap = new Map();
  for (const c of retrievedChunks) {
    if (!citationMap.has(c.filename)) {
      citationMap.set(c.filename, {
        originalname: c.originalname,
        filename: c.filename,
        score: c.score,
        pages: new Set(),
      });
    }
    if (c.chunkPage) {
      citationMap.get(c.filename).pages.add(c.chunkPage);
    }
  }

  const citations = Array.from(citationMap.values()).map((c) => ({
    originalname: c.originalname,
    filename: c.filename,
    score: c.score,
    pageNumbers: Array.from(c.pages).sort((a, b) => a - b),
  }));

  return {
    answer: response.content,
    citations: citations,
  };
}

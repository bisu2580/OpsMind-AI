import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { generateEmbeddings } from "./utils/embedding.js";
import { retrieveTopChunks } from "./services/semanticSearchService.js";

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  const queryEmbedding = await generateEmbeddings("test query");
  const results = await retrieveTopChunks(queryEmbedding, 1);
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}
test();

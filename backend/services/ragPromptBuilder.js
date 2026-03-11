export function buildSystemPrompt(userQuery, retrievedChunks) {
  const context = retrievedChunks
    .map(
      (chunk, i) => {
        const pagesStr = chunk.chunkPage ? `Page: ${chunk.chunkPage}` : '';
        return `Source ${i + 1} (${chunk.filename} ${pagesStr}):\n${chunk.chunkText}`;
      }
    )
    .join("\n\n");

  return `
You are OpsMind AI, a corporate knowledge assistant.

Answer the user query using ONLY the information provided in the context below.
If the answer cannot be found explicitly in the context, respond with:
"I don’t know based on the available documents."

Always be precise and factual.

CONTEXT:
${context}

USER QUESTION:
${userQuery}
`;
}

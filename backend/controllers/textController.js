import genAI from "../config/gemini.js";

export const generateText = async (req, res) => {
  const receivedText = req.body.text;
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Role: You are an expert AI Prompt Engineer for state-of-the-art image generators like Flux.1 and SDXL.
       Task: Convert the user's short, simple input into a highly descriptive, professional-grade prompt.
       User Input: ${receivedText}
       Guidelines for Enhancement:
       Add Photographic Details: Specify camera angles (e.g., "low-angle," "macro"), lighting (e.g., "cinematic," "soft bokeh"), and textures.
       Inject Style: If the user doesn't specify, assume a modern, high-quality commercial aesthetic (e.g., "8k resolution," "hyper-realistic").
       Use Active Language: Describe scenes in motion rather than static objects (e.g., "Steam rising from a cup" instead of "A cup with steam").
       Platform Awareness: For Instagram, emphasize vibrant colors and clean compositions. For LinkedIn, emphasize professional and sleek aesthetics.
       Output Format: Provide ONLY the enhanced prompt. Do not include conversational text or "Here is your prompt.".`,
    });
    if (response.text) {
      res.json({ text: response.text });
    } else {
      res.json({ text: "Something went wrong" });
    }
  } catch (err) {
    res.json({ text: "Failed to generate text", error: err });
  }
};

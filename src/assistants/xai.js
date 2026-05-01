import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "../assistants/openai";

function createXAiClient() {
  const apiKey = import.meta.env.VITE_X_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_X_AI_API_KEY. Set your X AI API key in .env.local or your environment."
    );
  }

  return new OpenAI({
    baseURL: "https://api.x.ai/v1",
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export class Assistant extends OpenAIAssistant {
  constructor(model = "grok-3-mini-latest", client) {
    super(model, client ?? createXAiClient());
  }
}

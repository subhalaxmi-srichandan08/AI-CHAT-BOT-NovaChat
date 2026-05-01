import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "../assistants/openai";

function createDeepSeekClient() {
  const apiKey = import.meta.env.VITE_DEEPSEEK_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_DEEPSEEK_AI_API_KEY. Set your DeepSeek API key in .env.local or your environment."
    );
  }

  return new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export class Assistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat", client) {
    super(model, client ?? createDeepSeekClient());
  }
}

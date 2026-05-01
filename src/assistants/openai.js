import OpenAI from "openai";

function createOpenAIClient(baseURL) {
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_OPEN_AI_API_KEY. Set your OpenAI API key in .env.local or your environment."
    );
  }

  return new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
}

export class Assistant {
  #client;
  #model;

  constructor(model = "gpt-4o-mini", client) {
    this.#client = client ?? createOpenAIClient();
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
      });

      return result.choices[0].message.content;
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  async *chatStream(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
        stream: true,
      });

      for await (const chunk of result) {
        yield chunk.choices[0]?.delta?.content || "";
      }
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  #parseError(error) {
    return error;
  }
}

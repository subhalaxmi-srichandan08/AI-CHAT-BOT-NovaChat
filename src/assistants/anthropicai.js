import Anthropic from "@anthropic-ai/sdk";

function createAnthropicClient() {
  const apiKey = import.meta.env.VITE_ANTHROPIC_AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_ANTHROPIC_AI_API_KEY. Set your Anthropic API key in .env.local or your environment."
    );
  }

  return new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export class Assistant {
  #client;
  #model;

  constructor(model = "claude-3-5-haiku-latest", client) {
    this.#client = client ?? createAnthropicClient();
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await this.#client.messages.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
        max_tokens: 1024,
      });

      return result.content[0].text;
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  async *chatStream(content, history) {
    try {
      const result = await this.#client.messages.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
        max_tokens: 1024,
        stream: true,
      });

      for await (const chunk of result) {
        if (chunk.type === "content_block_delta") {
          yield chunk.delta.text || "";
        }
      }
    } catch (error) {
      throw this.#parseError(error);
    }
  }

  #parseError(error) {
    try {
      return error.error.error;
    } catch (parseError) {
      return error;
    }
  }
}

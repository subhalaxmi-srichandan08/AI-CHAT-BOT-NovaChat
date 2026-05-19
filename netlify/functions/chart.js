const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

exports.handler = async (event) => {
  try {
    const { message, history } = JSON.parse(event.body);

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: (history || []).map(({ role, content }) => ({
        role: role === "assistant" ? "model" : role,
        parts: [{ text: content }],
      })),
    });

    const response = await chat.sendMessage({
      message,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: response.text,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
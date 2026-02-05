
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getChatResponse(userPrompt: string, history: { role: string, parts: { text: string }[] }[]) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: "You are HOLLMOVIES4U AI, a sophisticated, helpful, and friendly general-purpose assistant. You can help users with movie trivia, general knowledge, tech support, and entertainment advice. Keep responses concise but high-value." }] },
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  }
}

export const geminiService = new GeminiService();

// src/services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AIService {
  private systemPrompt = `You are a compassionate mental health companion for MindMates, 
  a mental wellness application. Your role is to:
  - Provide empathetic, supportive and short responses like some one who cares deeply as a friend
  - Offer mental health tips and coping strategies
  - Encourage users to seek professional help when needed
  - Never diagnose or provide medical advice
  - Be warm, understanding, and non-judgmental
  - Keep responses concise and actionable`;

  async generateResponse(userMessage: string, conversationHistory: ChatMessage[] = [] ): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      // Build conversation context
      const context = conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${this.systemPrompt}\n\n${context}\n\nUser: ${userMessage}\n\nAssistant:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text || "I'm here to listen. Could you tell me more about what you're experiencing?";
    } catch (error) {
      logger.error('Gemini AI error', { error });
      return "I apologize, but I'm having trouble processing your message right now. Please try again in a moment.";
    }
  }

  async generateStreamResponse(
    userMessage: string,
    conversationHistory: ChatMessage[] = [],
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      // Build conversation context
      const context = conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${this.systemPrompt}\n\n${context}\n\nUser: ${userMessage}\n\nAssistant:`;

      const result = await model.generateContentStream(prompt);

      // Stream the response
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          onChunk(chunkText);
        }
      }
    } catch (error) {
      logger.error('Gemini streaming error', { error });
      onChunk("I apologize, but I'm experiencing technical difficulties.");
    }
  }
}

export const aiService = new AIService();

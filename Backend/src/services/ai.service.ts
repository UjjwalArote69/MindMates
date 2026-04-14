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

  async generateResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

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
  ): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

      const context = conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${this.systemPrompt}\n\n${context}\n\nUser: ${userMessage}\n\nAssistant:`;

      const result = await model.generateContentStream(prompt);

      let fullResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullResponse += chunkText;
          onChunk(chunkText);
        }
      }
      return fullResponse;
    } catch (error: any) {
      logger.error('Gemini streaming error', { error });
      // Properly detect and propagate rate limit/AI errors!
      if (error?.status === 429 || error?.errorDetails) {
        const retryInfo = error?.errorDetails?.find(
          (detail: any) => detail["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
        );
        const retryDelay = retryInfo?.retryDelay || "30s";
        throw new Error(`RATE_LIMIT:${retryDelay}`);
      }
      throw new Error("AI_ERROR");
    }
  }

  async generateWithRetry(
    userMessage: string,
    conversationHistory: ChatMessage[] = [],
    onChunk: (chunk: string) => void,
    maxRetries = 3
  ): Promise<string> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await this.generateStreamResponse(userMessage, conversationHistory, onChunk);
      } catch (error: any) {
        if (error.message?.startsWith('RATE_LIMIT') && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          logger.warn(`Rate limit hit, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw error; // Re-throw if not rate limit or last attempt
        }
      }
    }
    throw new Error('Max retries exceeded');
  }


}

export const aiService = new AIService();

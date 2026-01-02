import { GoogleGenerativeAI } from "@google/generative-ai";

// Chat message interface
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'model';
  content: string;
}

// Gemini AI Chat Service
export class GeminiChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      console.warn("⚠️ GEMINI_API_KEY not configured. Using fallback responses.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key, use fallback responses
    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      return this.getFallbackResponse(messages);
    }

    try {
      // Convert messages to Gemini format
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      // Get the last message
      const lastMessage = messages[messages.length - 1];

      // Start a chat session
      const chat = this.model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      });

      // Send message and get response
      const result = await chat.sendMessage(lastMessage.content);
      const response = await result.response;
      const text = response.text();

      return text || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error: any) {
      console.error("Gemini API Error:", error.message);
      
      // Handle specific errors
      if (error.message?.includes('API_KEY')) {
        return "⚠️ API key error. Please check your Gemini API key configuration.";
      }
      if (error.message?.includes('quota')) {
        return "⚠️ API quota exceeded. Please try again later or check your API limits.";
      }
      
      return this.getFallbackResponse(messages);
    }
  }

  private getFallbackResponse(messages: ChatMessage[]): string {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    // Basic fallback responses
    if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
      return "Hello! I'm your AI assistant. To enable full AI capabilities, please configure your Gemini API key in the server/.env file. You can get a free API key from https://makersuite.google.com/app/apikey";
    }
    if (lastMessage.includes('help')) {
      return "I can help you with various tasks once configured with a Gemini API key. Get your free key from https://makersuite.google.com/app/apikey and add it to server/.env as GEMINI_API_KEY=your-key";
    }
    
    return "🤖 AI features require a Gemini API key. Get your free key from https://makersuite.google.com/app/apikey and add it to server/.env file.";
  }
}

export const configureChatService = () => {
  return new GeminiChatService();
};
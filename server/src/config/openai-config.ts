// Custom chat service configuration
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class CustomChatService {
  private responses = [
    "That's an interesting question! Let me think about that.",
    "I understand what you're asking. Here's my perspective:",
    "Great question! Based on what you've told me, I would suggest:",
    "That's a thoughtful inquiry. Here are some ideas:",
    "I see what you mean. Let me provide some insights:",
    "Excellent point! Here's how I would approach this:",
    "Thanks for sharing that with me. My response would be:",
    "I appreciate your question. Here's what I think:"
  ];

  private getRandomResponse(): string {
    const randomIndex = Math.floor(Math.random() * this.responses.length);
    return this.responses[randomIndex];
  }

  private generateContextualResponse(message: string, _chatHistory: ChatMessage[]): string {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    }
    if (lowerMessage.includes('how are you')) {
      return "I'm doing well, thank you for asking! How are you?";
    }
    if (lowerMessage.includes('what') && lowerMessage.includes('name')) {
      return "I'm your AI assistant! You can call me ChatBot.";
    }
    if (lowerMessage.includes('help')) {
      return "I'm here to help! Feel free to ask me any questions you have.";
    }
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! It was nice chatting with you. Have a great day!";
    }
    
    // For programming-related questions
    if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
      return "That's a great programming question! While I'm a simple chatbot, I'd recommend checking official documentation or coding communities for detailed technical help.";
    }
    
    // Generate a contextual response based on message length and content
    if (message.length > 100) {
      return `${this.getRandomResponse()} You've shared quite a detailed message. While I'm a simple AI, I appreciate you taking the time to explain your thoughts thoroughly.`;
    }
    
    return `${this.getRandomResponse()} ${message.split(' ').length > 10 ? 'That seems like a complex topic.' : 'That\'s a good question.'} While I'm a basic chatbot, I hope this response is helpful!`;
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    if (messages.length === 0) {
      return "Hello! How can I help you today?";
    }

    const lastMessage = messages[messages.length - 1];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    return this.generateContextualResponse(lastMessage.content, messages);
  }
}

export const configureChatService = () => {
  return new CustomChatService();
};
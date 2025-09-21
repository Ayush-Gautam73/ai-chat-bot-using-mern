import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureChatService, ChatMessage } from "../config/openai-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    
    // grab chats of user
    const chats: ChatMessage[] = user.chats.map(({ role, content }) => ({
      role: role as 'user' | 'assistant' | 'system',
      content,
    }));
    
    // Add new user message
    const newUserMessage: ChatMessage = { content: message, role: "user" };
    chats.push(newUserMessage);
    user.chats.push({ content: message, role: "user" });

    // Generate response using custom chat service
    const chatService = configureChatService();
    const responseContent = await chatService.generateResponse(chats);
    
    // Add assistant response
    const assistantMessage = { content: responseContent, role: "assistant" };
    user.chats.push(assistantMessage);
    
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("Error in generateChatCompletion", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const sendChatsToUser = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error?.message || "Unknown error" });
  }
};

export const deleteChats = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // Clear all chats
    user.chats.splice(0, user.chats.length);
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error?.message || "Unknown error" });
  }
};
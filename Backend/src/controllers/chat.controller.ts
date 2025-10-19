import { Server, Socket } from "socket.io";
import { Chat } from "../model/chat.model";
import { aiService } from "../services/ai.service";
import logger from "../utils/logger";

export const setupChatHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId;

    // Send message to AI
    socket.on(
      "chat:send-message",
      async (data: { chatId?: string; message: string }) => {
        try {
          const { chatId, message } = data;
          
          logger.socket("Processing chat message", { 
            userId, 
            chatId, 
            messagePreview: message.substring(0, 50) 
          });

          // Find or create chat
          let chat = chatId ? await Chat.findById(chatId) : null;
          let isNewChat = false;

          if (!chat) {
            isNewChat = true;
            chat = await Chat.create({
              userId,
              title: message.substring(0, 50),
              messages: [],
            });
            logger.success(`New chat created: ${chat._id}`);
          }

          // Add user message
          chat.messages.push({
            role: "user",
            content: message,
            timestamp: new Date(),
          });
          await chat.save();

          socket.emit("chat:message-received", {
            chatId: chat._id,
            message: {
              role: "user",
              content: message,
              timestamp: new Date(),
            },
          });

          // Generate AI response with streaming
          let aiResponse = "";
          socket.emit("chat:ai-typing", { chatId: chat._id });

          logger.api("Generating AI response...");
          const startTime = Date.now();

          await aiService.generateStreamResponse(
            message,
            chat.messages
              .slice(-10)
              .map((m) => ({ role: m.role, content: m.content })),
            (chunk) => {
              aiResponse += chunk;
              socket.emit("chat:ai-chunk", { chatId: chat._id, chunk });
            }
          );

          const duration = Date.now() - startTime;
          logger.success(`AI response generated in ${duration}ms`);

          // Save AI response
          chat.messages.push({
            role: "assistant",
            content: aiResponse,
            timestamp: new Date(),
          });
          await chat.save();

          socket.emit("chat:ai-complete", {
            chatId: chat._id,
            message: {
              role: "assistant",
              content: aiResponse,
              timestamp: new Date(),
            },
          });

          logger.socket("Chat message processed", { 
            chatId: chat._id, 
            isNewChat,
            messageCount: chat.messages.length,
            duration: `${duration}ms`
          });

        } catch (error) {
          logger.error("Chat handler error", { error, userId });
          socket.emit("chat:error", { message: "Failed to process message" });
        }
      }
    );

    // Get chat history
    socket.on("chat:get-history", async (data: { chatId: string }) => {
      try {
        logger.socket(`Fetching chat history: ${data.chatId}`);
        
        const chat = await Chat.findOne({ _id: data.chatId, userId });
        
        if (!chat) {
          logger.warn(`Chat not found: ${data.chatId}`);
          socket.emit("chat:error", { message: "Chat not found" });
          return;
        }
        
        socket.emit("chat:history", { chat });
        logger.success(`Chat history sent`, { 
          chatId: data.chatId, 
          messageCount: chat.messages.length 
        });
      } catch (error) {
        logger.error("Get history error", { error, userId, chatId: data.chatId });
        socket.emit("chat:error", { message: "Failed to load chat history" });
      }
    });

    // Get all chats
    socket.on("chat:get-all", async () => {
      try {
        logger.socket("Fetching all chats for user", { userId });
        
        const chats = await Chat.find({ userId })
          .select("_id title createdAt updatedAt")
          .sort({ updatedAt: -1 });
          
        socket.emit("chat:all-chats", { chats });
        logger.success(`Sent ${chats.length} chats to user ${userId}`);
      } catch (error) {
        logger.error("Get all chats error", { error, userId });
        socket.emit("chat:error", { message: "Failed to load chats" });
      }
    });

    // Delete chat
    socket.on("chat:delete", async (data: { chatId: string }) => {
      try {
        await Chat.findOneAndDelete({ _id: data.chatId, userId });
        socket.emit("chat:deleted", { chatId: data.chatId });
        logger.success(`Chat deleted: ${data.chatId}`);
      } catch (error) {
        logger.error("Delete chat error", { error, userId, chatId: data.chatId });
        socket.emit("chat:error", { message: "Failed to delete chat" });
      }
    });
  });
};

// src/controllers/chat.controller.ts
import {
  Server,
  Socket,
} from "socket.io";
import { Chat } from "../model/chat.model";
import { aiService } from "../services/ai.service";
import logger from "../utils/logger";

export const setupChatHandlers = (
  io: Server
) => {
  io.on(
    "connection",
    (socket: Socket) => {
      const userId = socket.data.userId;

      socket.on(
        "chat:send-message",
        async (data: {
          chatId?: string;
          message: string;
        }) => {
          try {
            const { chatId, message } =
              data;

            // 🎯 REQUEST LOG
            logger.request(
              "CHAT",
              `/chat/${chatId || "new"
              }`,
              {
                userId,
                messagePreview:
                  message.substring(
                    0,
                    50
                  ),
              }
            );

            let chat = chatId
              ? await Chat.findById(
                chatId
              )
              : null;
            let isNewChat = false;

            if (!chat) {
              isNewChat = true;
              chat = await Chat.create({
                userId,
                title:
                  message.substring(
                    0,
                    50
                  ),
                messages: [],
              });
              logger.success(
                `New chat created: ${chat._id}`
              );
            }

            chat.messages.push({
              role: "user",
              content: message,
              timestamp: new Date(),
            });
            await chat.save();

            socket.emit(
              "chat:message-received",
              {
                chatId: chat._id,
                message: {
                  role: "user",
                  content: message,
                  timestamp: new Date(),
                },
              }
            );

            // 🎯 AI LOADING INDICATOR
            socket.emit(
              "chat:ai-typing",
              { chatId: chat._id }
            );
            logger.loading(
              "Generating AI response..."
            );

            const startTime =
              Date.now();
            let aiResponse = "";

            await aiService.generateStreamResponse(
              message,
              chat.messages
                .slice(-10)
                .map((m) => ({
                  role: m.role,
                  content: m.content,
                })),
              (chunk) => {
                aiResponse += chunk;
                socket.emit(
                  "chat:ai-chunk",
                  {
                    chatId: chat._id,
                    chunk,
                  }
                );
              }
            );

            const duration =
              Date.now() - startTime;
            logger.loadingDone(true);

            // Save AI response
            chat.messages.push({
              role: "assistant",
              content: aiResponse,
              timestamp: new Date(),
            });
            await chat.save();

            socket.emit(
              "chat:ai-complete",
              {
                chatId: chat._id,
                message: {
                  role: "assistant",
                  content: aiResponse,
                  timestamp: new Date(),
                },
              }
            );

            // 🎯 RESPONSE LOG
            logger.response(
              200,
              {
                chatId: chat._id,
                isNewChat,
                messageCount:
                  chat.messages.length,
              },
              duration
            );
          } catch (error) {
            logger.error(
              "Chat message processing failed",
              { error, userId }
            );
            socket.emit("chat:error", {
              message:
                "Failed to process message",
            });
          }
        }
      );

      socket.on(
        "chat:get-history",
        async (data: {
          chatId: string;
        }) => {
          try {
            logger.socket(
              `Fetching chat history: ${data.chatId}`
            );

            const chat =
              await Chat.findOne({
                _id: data.chatId,
                userId,
              });

            if (!chat) {
              logger.warn(
                `Chat not found: ${data.chatId}`
              );
              socket.emit(
                "chat:error",
                {
                  message:
                    "Chat not found",
                }
              );
              return;
            }

            socket.emit(
              "chat:history",
              { chat }
            );
            logger.success(
              `Chat history sent (${chat.messages.length} messages)`
            );
          } catch (error) {
            logger.error(
              "Get history error",
              {
                error,
                userId,
                chatId: data.chatId,
              }
            );
            socket.emit("chat:error", {
              message:
                "Failed to load chat history",
            });
          }
        }
      );

      socket.on(
        "chat:get-all",
        async () => {
          try {
            logger.socket(
              "Fetching all chats",
              { userId }
            );

            const chats =
              await Chat.find({
                userId,
              })
                .select(
                  "_id title createdAt updatedAt"
                )
                .sort({
                  updatedAt: -1,
                });

            socket.emit(
              "chat:all-chats",
              { chats }
            );
            logger.success(
              `Sent ${chats.length} chats to user`
            );
          } catch (error) {
            logger.error(
              "Get all chats error",
              { error, userId }
            );
            socket.emit("chat:error", {
              message:
                "Failed to load chats",
            });
          }
        }
      );
    }
  );
};

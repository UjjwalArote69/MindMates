// src/server.ts
import http from "http";
import app from "./app";
import connectDB from "./config/db";
import { initializeSocket } from "./config/socket";
import { setupChatHandlers } from "./controllers/chat.controller";
import logger from "./utils/logger";

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Setup chat handlers
setupChatHandlers(io);

// Start server
const startServer = async () => {
  try {
    logger.divider('SERVER STARTUP');
    
    await connectDB();
    
    server.listen(PORT, () => {
      logger.success(`Server running on port ${PORT}`);
      logger.socket(`Socket.IO initialized and ready`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.divider();
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

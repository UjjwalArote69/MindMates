import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

export const initializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://mindmates-beta.vercel.app"
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io",
    allowEIO3: false,
    connectTimeout: 45000,
    pingTimeout: 20000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e6,
  });

  // Middleware for authentication
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      logger.warn("Socket connection attempt without token", { 
        socketId: socket.id 
      });
      socket.data.userId = null;
      socket.data.authenticated = false;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      socket.data.userId = decoded.id;
      socket.data.authenticated = true;
      logger.socket(`User authenticated: ${decoded.id}`);
      next();
    } catch (error) {
      logger.error("Socket authentication failed", { 
        error,
        socketId: socket.id 
      });
      socket.data.userId = null;
      socket.data.authenticated = false;
      next();
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId;
    
    logger.socket(`Client connected`, { 
      userId, 
      socketId: socket.id,
      authenticated: socket.data.authenticated
    });

    if (userId) {
      socket.join(`user:${userId}`);
    }

    // Send welcome message
    socket.emit("connection-success", {
      socketId: socket.id,
      authenticated: socket.data.authenticated,
      userId: userId || null,
    });

    socket.on("disconnect", (reason) => {
      logger.socket(`Client disconnected: ${reason}`, { 
        userId, 
        socketId: socket.id
      });
    });

    socket.on("error", (error) => {
      logger.error("Socket error", { 
        userId, 
        socketId: socket.id, 
        error 
      });
    });
  });

  logger.success("Socket.IO server initialized with default namespace '/'");

  return io;
};

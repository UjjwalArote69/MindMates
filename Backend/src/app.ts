import express, { Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/passport";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import journalRoutes from "./routes/journal.route";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// ✅ IMPORTANT: cookieParser MUST come before routes
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.session())
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Security headers - but don't block Socket.IO
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for Socket.IO
  })
);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ✅ CRITICAL: Proper CORS setup
app.use(
  cors({
    origin: ["https://mindmates-beta.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/journal", journalRoutes);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    status: "ok",
    message: "MindMates API Server",
    timestamp: new Date().toISOString()
  });
});

// Socket.IO health check
app.get("/socket.io/health", (req: Request, res: Response) => {
  res.json({ status: "Socket.IO ready" });
});

export default app;

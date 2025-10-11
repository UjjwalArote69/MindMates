// Backend: app.ts - CRITICAL CORS FIX
import express, { Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import "./config/passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import journalRoutes from "./routes/journal.route";

const app = express();

// ✅ IMPORTANT: cookieParser MUST come before routes
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// ✅ CRITICAL: Proper CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

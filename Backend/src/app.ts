import express, { Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import "./config/passport";
import session from "express-session";
import userRoutes from "./routes/user.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_ID || "http:localhost:5173", "https://mindmates-beta.vercel.app", "https://mindmates-git-main-ujjwalarote69s-projects.vercel.app", "https://mindmates-rehmj7dmt-ujjwalarote69s-projects.vercel.app"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

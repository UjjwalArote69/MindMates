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
app.use(cookieParser()); 
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1); 
app.use(cors({
  origin: ["https://mindmates-beta.vercel.app", "http://localhost:5173"],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
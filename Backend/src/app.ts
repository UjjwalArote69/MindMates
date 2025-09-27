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
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "https://mindmates-beta.vercel.app",
  credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
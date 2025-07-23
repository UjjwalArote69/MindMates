import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import "./config/passport";
import authRoutes from "./routes/auth.route";
import passport from "passport";
import connetDB from "./config/db.config";
import userRoutes from "./routes/user.route";
import cookieParser from "cookie-parser";

const app: Application = express();
connetDB();

app.use(cookieParser());

// ✅ Session middleware
app.use(
  session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true only in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

export default app;

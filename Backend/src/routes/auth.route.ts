import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/generateToken";
import { loginUser, registerUser } from "../controllers/auth.controller";
import jwt from "jsonwebtoken";

const router = Router();

// ✅ Start Google OAuth flow
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
  session: false, // 🚀 important: no session
}),
);

// ✅ Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth/login`,
  }),
  (req, res) => {
    const user = req.user as any;
    if (!user) return res.redirect(`${process.env.CLIENT_URL}/auth/login`);

    const token = generateToken({ id: user._id.toString() });

    


    if (user.isNewUser) {
      res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}`);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  }
);


// Email/password routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

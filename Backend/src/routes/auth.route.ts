import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/generateToken";
import { loginUser, registerUser } from "../controllers/auth.controller";
import jwt from "jsonwebtoken";

const router = Router();

// ✅ Start Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false, // 🚀 important: no session
  })
);

// ✅ Google OAuth callback
// auth.route.ts (Google callback)
// Google OAuth callback
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

    // 1. Set cookie for backend requests
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 2. Redirect with token for frontend to store in localStorage
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

        // ✅ Set cookie for backend requests
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // ✅ Redirect based on whether the user is new
        if (user.isNewUser) {
          res.redirect(`${process.env.CLIENT_URL}/onboarding`);
        } else {
          res.redirect(`${process.env.CLIENT_URL}/home`);
        }
      }
    );
  }
);

// Email/password routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

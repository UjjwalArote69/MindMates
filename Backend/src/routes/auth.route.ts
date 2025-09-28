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
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false, // 🚀 important: no session
    failureRedirect: `${process.env.CLIENT_URL}/auth/login`,
  }),
  (req, res) => {
    const user = req.user as any;

    if (!user) {
      console.error("❌ No user returned from Google OAuth");
      return res.redirect(`${process.env.CLIENT_URL}/auth/login`);
    }

    // ✅ Generate JWT
    const token = generateToken({ id: user._id.toString() });

    const isProduction = process.env.NODE_ENV === "production";

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // HTTPS only in prod
      sameSite: isProduction ? "none" : "lax", // cross-origin cookies only in prod
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    console.log("✅ Token generated for OAuth:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("✅ Decoded token after generation:", decoded);

    // ✅ Redirect user
    if (user.isNewUser) {
  const clientUrl = process.env.CLIENT_URL ?? "https://mindmates-beta.vercel.app";
  res.redirect(`${clientUrl.replace(/\/$/, "")}/onboarding`);
} else {
  const clientUrl = process.env.CLIENT_URL ?? "https://mindmates-beta.vercel.app";
  res.redirect(`${clientUrl.replace(/\/$/, "")}/home`);
}

  }
);

// Email/password routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

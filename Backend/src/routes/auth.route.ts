import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/generateToken";
import { loginUser, registerUser } from "../controllers/auth.controller";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth/login`,
  }),
  (req, res) => {
    const user = req.user as any;

    // ✅ Correct: make sure to use _id as string
    const token = generateToken({ id: user._id.toString() });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true only in production
      sameSite: isProduction ? "none" : "lax", // cross-origin only in production
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    console.log("Token generated for OAuth:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log("Decoded token after generation:", decoded); // should show { id: "...", iat: ..., exp: ... }

    if (user.isNewUser) {
      res.redirect(`${process.env.CLIENT_URL}/onboarding`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/home`);
    }
  }
);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

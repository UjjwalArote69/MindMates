import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/generateToken";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
  (req, res) => {
    console.log("Initiating Google OAuth2 login", req.user);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth/login`, // Fix redirect path
  }),
  (req, res) => {
    const user = req.user as any;
    const token = generateToken({ id: user._id.toString() });
    
    // Fixed cookie configuration
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Fix this
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(`🔑 User logged in: ${user.name} at ${new Date().toISOString()}`);
    

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
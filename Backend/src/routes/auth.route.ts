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
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const user = req.user as any;
    const token = generateToken({ id: user._id.toString() });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      sameSite: "none", // required for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

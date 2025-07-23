import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../middleware/auth.middleware";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

// 1. Trigger Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Google OAuth Callback
router.get("/google/callback",passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard", // your frontend
    failureRedirect: "/login/failed",
  }),   
);

// 3. Logged in user info
router.get("/me", isAuthenticated, (req, res) => {
  res.json(req.user);
});

// 4. Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;

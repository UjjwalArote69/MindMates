import {Router} from 'express';
import passport from 'passport';
import { generateToken } from '../utils/generateToken';
import { loginUser, registerUser } from '../controllers/auth.controller';

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account"}));

router.get(
    "/google/callback",
    passport.authenticate("google", {session: false, failureRedirect: "/"}),
    (req, res) => {
        const user = req.user as any;
        const token = generateToken(user);
        res.redirect(`http://localhost:5173?token=${token}`);
    }
);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

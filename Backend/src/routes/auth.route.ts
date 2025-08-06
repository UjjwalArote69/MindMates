import {Router} from 'express';
import passport from 'passport';
import generateJwt from '../utils/generateJwt';

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {session: false, failureRedirect: "/"}),
    (req, res) => {
        const user = req.user as any;
        const token = generateJwt(user);
        res.redirect(`http://localhost:5173?token=${token}`);
    }
);

export default router;

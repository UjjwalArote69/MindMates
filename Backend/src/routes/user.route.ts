import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

// Optional: User profile page (if different from /auth/me)
router.get("/profile", isAuthenticated, (req, res) => {
  res.json(req.user);
});

router.put("/update", isAuthenticated, updateUser);

router.delete("/delete", isAuthenticated, deleteUser);

export default router;

import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { deleteUser, getMe, updateUser } from "../controllers/user.controller";
// import { getMe, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

// console.log("authMiddleware type:", typeof authMiddleware);
// console.log("getUser type:", typeof getMe);
router.get("/me", protect, getMe);
router.put("/me", protect, updateUser);
router.delete("/me", protect, deleteUser);

export default router;

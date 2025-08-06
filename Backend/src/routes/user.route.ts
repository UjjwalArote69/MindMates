import express, { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { getMe, updateUser, deleteUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/me", authenticateUser, getMe);
router.put("/me", authenticateUser, updateUser);
router.delete("/me", authenticateUser, deleteUser);

export default router;

import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { deleteUser, getMe, updateUser } from "../controllers/user.controller";
// import { getMe, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get("/me", authenticateUser, getMe); 
router.put("/me", authenticateUser, updateUser);
router.delete("/me", authenticateUser, deleteUser);

export default router;

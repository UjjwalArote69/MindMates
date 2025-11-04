import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  deleteUser,
  getMe,
  getTodayStatus,
  logoutUser,
  saveDailyLog,
  submitFeedback,
  updateOnboardingData,
  updateTodayMood,
  updateTodaySleep,
  updateTodayStress,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

console.log("authMiddleware type:", typeof protect);

router.use(protect);

router.get("/me", getMe);
router.put("/me", updateUser);
router.delete("/me", deleteUser);
router.post("/logout", logoutUser);
router.put("/onboarding", updateOnboardingData);
router.post("/feedback", submitFeedback);
router.post("/daily-log", saveDailyLog);
router.get("/daily-status", getTodayStatus);
router.put("/mood", updateTodayMood);
router.put("/stress", updateTodayStress);
router.put("/sleep", updateTodaySleep);

export default router;

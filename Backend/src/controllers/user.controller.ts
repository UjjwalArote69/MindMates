import { Response, Request } from "express";
import { User } from "../model/user.model";
import { calculateMetrics } from "../utils/calculateMetrics";
import bcrypt from "bcryptjs";
import { Feedback } from "../model/feedback.model";
import { sendFeedbackToGoogleForm } from "../utils/sendFeedbackToGoogleForm";
import logger from "../utils/logger";

// Get user or me
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(`👤 getMe: ${user.name} at ${new Date().toISOString()}`);

    res.status(200).json(user);
  } catch (error) {
    logger.error("User Controller : getMe, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user profile
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      updatedName,
      updatedPassword,
      updatedWeight,
      updatedHeight,
      updatedGender,
      updatedBirthDate,
    } = req.body;

    // Only update fields that exist
    const updateFields: any = {};
    if (updatedName !== undefined) updateFields.name = updatedName;
    if (updatedPassword !== undefined) updateFields.password = updatedPassword;
    if (updatedWeight !== undefined) updateFields.weight = updatedWeight;
    if (updatedHeight !== undefined) updateFields.height = updatedHeight;
    if (updatedGender !== undefined) updateFields.gender = updatedGender;
    if (updatedBirthDate !== undefined)
      updateFields.birthDate = updatedBirthDate;

    const updated = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(`✏️ User updated: ${updated.name} at ${new Date().toISOString()}`);

    res
      .status(200)
      .json({ message: "Profile updated succesfully", user: updated });
  } catch (error) {
    logger.error("User Controller : updateUser, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user with conditional password check
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { password } = req.body || {}; // <- fallback to empty object

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If user has no googleId → validate password
    if (!user.googleId) {
      if (!password) {
        return res
          .status(400)
          .json({ message: "Password is required to delete account" });
      }

      const isMatch = await bcrypt.compare(password, user.password || "");
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }

    await User.findByIdAndDelete(userId);

    logger.info(`🗑️ User deleted: ${user.name} at ${new Date().toISOString()}`);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("User Controller : deleteUser", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout User
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    logger.info(`🚪 User logged out at ${new Date().toISOString()}`);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("User Controller : logoutUser", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOnboardingData = async (req: any, res: Response) => {
  try {
    const { gender, age, currentMood, sleepQuality, currentStress, height, weight } = req.body;
    
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ FIX: Check if already onboarded and return early
    if (user.isOnboarded) {
      return res.status(400).json({ message: "User has already completed onboarding" });
    }

    logger.info("📝 Onboarding data received:", { userId: req.user?._id, gender, age, currentMood });

    // ✅ FIX: Set isOnboarded to true
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        gender,
        age,
        currentMood,
        sleepQuality,
        currentStress,
        height,
        weight,
        isOnboarded: true, // ✅ CRITICAL: Mark as onboarded
      },
      { new: true, runValidators: true }
    ).select("-password");

    logger.info("✅ Onboarding updated successfully, user marked as onboarded");

    return res.status(200).json({ updatedUser });
  } catch (error: any) {
    logger.error("❌ Onboarding Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const saveDailyLog = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      mood,
      sleepQuality,
      sleepHours,
      stressLevel,
      hydrationLiters,
      activitySteps,
      activityMinutes,
      meditationMinutes,
    } = req.body;

    // Validation
    if (!mood || sleepQuality === undefined || !sleepHours || !stressLevel) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already logged today
    const lastLogged = user.lastLoggedDate
      ? new Date(user.lastLoggedDate)
      : null;
    
    if (lastLogged) {
      lastLogged.setHours(0, 0, 0, 0);
      if (lastLogged.getTime() === today.getTime()) {
        return res.status(400).json({ 
          message: "You've already logged your data today!",
          alreadyLogged: true 
        });
      }
    }

    // Update current mood/stress
    user.currentMood = mood;
    user.currentStress = stressLevel;
    user.sleepQuality = sleepQuality.toString();

    // Add to logs
    if (!user.moodTracker) user.moodTracker = [];
    user.moodTracker.push({ date: new Date(), mood });

    if (!user.sleepLogs) user.sleepLogs = [];
    user.sleepLogs.push({
      date: new Date(),
      quality: sleepQuality,
      hours: sleepHours,
    });

    if (!user.stressLogs) user.stressLogs = [];
    user.stressLogs.push({ date: new Date(), level: stressLevel });

    if (hydrationLiters !== undefined) {
      if (!user.hydrationLogs) user.hydrationLogs = [];
      user.hydrationLogs.push({
        date: new Date(),
        liters: hydrationLiters,
      });
    }

    if (activitySteps !== undefined && activityMinutes !== undefined) {
      if (!user.activityLogs) user.activityLogs = [];
      user.activityLogs.push({
        date: new Date(),
        steps: activitySteps,
        minutes: activityMinutes,
      });
    }

    if (meditationMinutes !== undefined) {
      if (!user.meditationLogs) user.meditationLogs = [];
      user.meditationLogs.push({
        date: new Date(),
        minutes: meditationMinutes,
      });
    }

    // Mark as logged today
    user.todayLogged = true;
    user.lastLoggedDate = new Date();

    await user.save();

    logger.info(`📊 Daily log saved for user: ${user.name} at ${new Date().toISOString()}`);

    res.status(200).json({
      message: "Daily log saved successfully! 🎉",
      user: {
        todayLogged: user.todayLogged,
        lastLoggedDate: user.lastLoggedDate,
        currentMood: user.currentMood,
        currentStress: user.currentStress,
      },
    });
  } catch (error) {
    logger.error("Error saving daily log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodayStatus = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select(
      "todayLogged lastLoggedDate currentMood currentStress sleepQuality"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let alreadyLogged = false;
    if (user.lastLoggedDate) {
      const lastLogged = new Date(user.lastLoggedDate);
      lastLogged.setHours(0, 0, 0, 0);
      alreadyLogged = lastLogged.getTime() === today.getTime();
    }

    res.status(200).json({
      alreadyLogged,
      lastLoggedDate: user.lastLoggedDate,
      currentMood: user.currentMood,
      currentStress: user.currentStress,
      sleepQuality: user.sleepQuality,
    });
  } catch (error) {
    logger.error("Error getting today status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { selectedAreas, feedback } = req.body || {};

    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ message: "Feedback text is required" });
    }

    // Fetch the user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save feedback with username
    const newFeedback = await Feedback.create({
      user: userId,
      name: user.name ?? "", 
      selectedAreas,
      feedback,
    });

    // Send to Google Form (pass name too)
    await sendFeedbackToGoogleForm({
      selectedAreas,
      feedback,
      userId,
      name: user.name ?? "",
    });

    logger.info(`💬 Feedback submitted by: ${user.name} at ${new Date().toISOString()}`);

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    logger.error("User Controller : submitFeedback", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodayMood = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update current mood
    user.currentMood = mood;

    // Check if already logged today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.moodTracker) user.moodTracker = [];

    const lastMood = user.moodTracker[user.moodTracker.length - 1];
    if (lastMood) {
      const lastDate = new Date(lastMood.date);
      lastDate.setHours(0, 0, 0, 0);

      if (lastDate.getTime() === today.getTime()) {
        // Update today's mood
        const lastMoodEntry = user.moodTracker[user.moodTracker.length - 1];
        if (lastMoodEntry) {
          lastMoodEntry.mood = mood;
        }
      } else {
        // Add new entry
        user.moodTracker.push({ date: new Date(), mood });
      }
    } else {
      // First mood entry
      user.moodTracker.push({ date: new Date(), mood });
    }

    await user.save();

    logger.info(`😊 Mood updated to "${mood}" for user: ${user.name}`);

    res.status(200).json({
      message: "Mood updated successfully!",
      currentMood: user.currentMood,
      moodTracker: user.moodTracker,
    });
  } catch (error) {
    logger.error("Error updating mood:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodayStress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { stressLevel } = req.body;

    if (stressLevel === undefined || stressLevel < 1 || stressLevel > 5) {
      return res.status(400).json({ message: "Stress level must be between 1 and 5" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update current stress
    user.currentStress = stressLevel;

    // Check if already logged today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.stressLogs) user.stressLogs = [];

    const lastStress = user.stressLogs[user.stressLogs.length - 1];
    if (lastStress) {
      const lastDate = new Date(lastStress.date);
      lastDate.setHours(0, 0, 0, 0);

      if (lastDate.getTime() === today.getTime()) {
        // Update today's stress
        const lastStressEntry = user.stressLogs[user.stressLogs.length - 1];
        if (lastStressEntry) {
          lastStressEntry.level = stressLevel;
        }
      } else {
        // Add new entry
        user.stressLogs.push({ date: new Date(), level: stressLevel });
      }
    } else {
      // First stress entry
      user.stressLogs.push({ date: new Date(), level: stressLevel });
    }

    await user.save();

    logger.info(`😰 Stress updated to ${stressLevel} for user: ${user.name}`);

    res.status(200).json({
      message: "Stress level updated successfully!",
      currentStress: user.currentStress,
      stressLogs: user.stressLogs,
    });
  } catch (error) {
    logger.error("Error updating stress:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { Response, Request } from "express";
import { User } from "../model/user.model";
import { calculateMetrics } from "../utils/calculateMetrics";
import bcrypt from "bcryptjs";
import { Feedback } from "../model/feedback.model";
import { sendFeedbackToGoogleForm } from "../utils/sendFeedbackToGoogleForm";

// Get user or me
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`👤 getMe: ${user.name} at ${new Date().toISOString()}`);

    res.status(200).json(user);
  } catch (error) {
    console.error("User Controller : getMe, ", error);
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

    console.log(`✏️ User updated: ${updated.name} at ${new Date().toISOString()}`);

    res
      .status(200)
      .json({ message: "Profile updated succesfully", user: updated });
  } catch (error) {
    console.error("User Controller : updateUser, ", error);
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

    console.log(`🗑️ User deleted: ${user.name} at ${new Date().toISOString()}`);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User Controller : deleteUser", error);
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
    });

    console.log(`🚪 User logged out at ${new Date().toISOString()}`);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("User Controller : logoutUser", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user data on first time login or onboarding data

export const updateOnboardingData = async (req: Request, res: Response) => {
  try {
    const { age, gender, weight, sleepQuality, currentMood, currentStress } =
      req.body;

    // Calculate score
    const { mentalHealthScore } = calculateMetrics({
      age,
      weight,
      sleepQuality,
      currentMood,
      currentStress,
    });

    const userId = (req as any).user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User information is missing in request." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        age,
        gender,
        weight,
        sleepQuality,
        currentMood,
        currentStress,
        mentalHealthScore, // save calculated value
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`📝 Onboarding data updated: ${updatedUser.name} at ${new Date().toISOString()}`);
    

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating onboarding data", error });
  }
};

// Get daily user data e.g. mood, stress, weight
export const getDailyData = (req: Request, res: Response) => {};

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

    console.log(`💬 Feedback submitted by: ${user.name} at ${new Date().toISOString()}`);

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("User Controller : submitFeedback", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

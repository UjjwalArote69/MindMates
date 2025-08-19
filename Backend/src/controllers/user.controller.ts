import { Response, Request } from "express";
import { User } from "../model/user.model";

// Get user or me
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
    const { newName, photo } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      { name: newName, avatar: photo },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated succesfully", user: updated });
  } catch (error) {
    console.error("User Controller : updateUser, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("User Controller : deleteUser, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout User
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("User Controller : logoutUser", error);
    res.status(500).json({message: "Internal Server Error" });
  }
}

// Get user data on first time login or onboarding data
export const updateOnboardingData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { age, gender, weight, mentalHealthScore, sleepQuality, currentMood , stressQuality } = req.body;

    if (!age || !gender) return res.status(400).json({ message: "Age and gender are required" });
    if (!userId) return res.status(404).json({ message: "Unauthorized" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { age, gender, weight, mentalHealthScore, sleepQuality, currentMood , stressQuality },
      { runValidators: true, new: true }
    ).select("-password");

    res.status(200).json({ message: "Onboarding data updated", updatedUser });
  } catch (error) {
    console.error("User Controller : updateOnboardingData", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get daily user data e.g. mood, stress, weight
export const getDailyData = (req: Request, res: Response) => {

}
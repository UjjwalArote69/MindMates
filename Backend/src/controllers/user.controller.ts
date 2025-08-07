import { User } from "../model/user.model";
import { Response, Request } from "express";
// import { Request } from "../types/custom";

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
    const { displayName, photo } = req.body;

    const user = await User.findById(userId).select("-__v").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { displayName, photo },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("User Controller : updateUser, ", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

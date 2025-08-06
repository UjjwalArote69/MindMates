import User from "../model/user.model";
import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await User.findById(userId).select("-__v");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

// Update user profile
export const updateUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { displayName, photo } = req.body;

  const updated = await User.findByIdAndUpdate(
    userId,
    { displayName, photo },
    { new: true }
  );

  res.status(200).json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: "User deleted" });
};

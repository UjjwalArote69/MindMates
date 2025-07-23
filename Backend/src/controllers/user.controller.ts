import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })?._id;
    const { displayName, avatar } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { displayName, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: `Error updating user: ${error.message}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })?._id;
    const user = await UserModel.findById(userId);
    await UserModel.findByIdAndDelete(userId);
    req.logOut(() => {
      res
        .status(200)
        .json({
          message: `User deleted successfully. Username: ${
            user?.displayName || "Unknown"
          }`,
        });
    });
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting user: ${error.message}` });
  }
};

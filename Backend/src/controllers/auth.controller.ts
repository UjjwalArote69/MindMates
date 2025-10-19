// Backend: auth.controller.ts - COMPLETE FIX
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model";
import { generateToken } from "../utils/generateToken";
import logger from "../utils/logger";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    let isNewUser = false;
    let user;

    if (existingUser) {
      user = existingUser;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, name, password: hashedPassword });
      isNewUser = true;
    }

    const token = generateToken({ id: user._id as string });

    // ✅ FIXED: Proper cookie settings for localhost
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ⚠️ Must be false in development (localhost)
      sameSite: "lax", // ⚠️ Must be "lax" for localhost
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    logger.info("✅ Register: Cookie set successfully");

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
      isNewUser,
    });
  } catch (error: any) {
    logger.error("❌ Register Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id as string });

    // ✅ FIXED: Same settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Must be false in development
      sameSite: "lax", // Must be "lax" for localhost
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logger.info("✅ Login: Cookie set successfully");

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error: any) {
    logger.error("❌ Login Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

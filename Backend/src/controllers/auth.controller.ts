import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
import { generateToken } from "../utils/generateToken";

// const JWT_SECRET = process.env.JWT_SECRET as string;

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

    const token = generateToken({ id: user._id as string});

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, token, isNewUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });

    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id as string });

    const { password: _, ...userWithoutPassword } = user.toObject();

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "none", // allow cross-domain
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(
      `🔑 User logged in: ${user.name} at ${new Date().toISOString()}`
    );

    res.status(200).json({
      message: `Logged in User - ${user.name} at ${new Date().toISOString()}`,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Auth Controller : loginUser, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

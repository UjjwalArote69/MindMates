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
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = generateToken({ id: newUser._id as string });

    res.status(201).json({
      newUser,
      token,
      message: `User created - ${newUser.name} at ${newUser.createdAt} && Token - ${token}`,
    });
  } catch (error) {
    console.error("Auth Controller : registerUser, ", error);
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

    res.cookie("token", token)

    res.status(200).json({
      user: userWithoutPassword,
      token,
      message: `Logged in User - ${user.name} at ${new Date().toISOString()}`,
    });
  } catch (error) {
    console.error("Auth Controller : loginUser, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

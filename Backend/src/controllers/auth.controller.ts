import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

// Register a new user manually
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { displayName, email, password } = req.body;

    console.log("Registering user:", { displayName, email });
    

    if (!displayName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      displayName,
      email,
      password: hashedPassword,
      googleId: "", // Keep empty since it's not OAuth
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error registering user: ${error.message}` });
  }
};

// Login user manually
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("Login user:", { email });

    const user = await UserModel.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};

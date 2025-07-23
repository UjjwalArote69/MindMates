import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };

    const user = await UserModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
};

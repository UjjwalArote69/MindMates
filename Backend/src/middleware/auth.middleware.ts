import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { CustomRequest } from "../types/custom"; // adjust the path accordingly

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Unauthorized - No token"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    (req as any).user = { id: decoded.id }; // ensures type consistency
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};

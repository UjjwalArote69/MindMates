// Backend: auth.middleware.ts - ENSURE COOKIE IS CHECKED
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
import logger from "../utils/logger";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token;

    // ✅ Check cookie first, then Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      logger.info("🍪 Token from cookie:", token.substring(0, 20) + "...");
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      logger.info("🔑 Token from header:", token.substring(0, 20) + "...");
    }

    if (!token) {
      logger.info("❌ No token found");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      logger.info("❌ User not found for token");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    logger.info("✅ User authenticated:", user.email);
    next();
  } catch (error: any) {
    logger.error("❌ Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

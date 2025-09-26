// auth.middleware.ts - Enhanced debugging
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // console.log("🔍 Auth Debug:");
    // console.log("Headers:", req.headers.authorization);
    // console.log("Cookies:", req.cookies);
    // console.log("All cookies:", Object.keys(req.cookies || {}));

    // 1️⃣ Try reading from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("✅ Token from header:", token?.substring(0, 20) + "...");
    }

    // 2️⃣ If not in header, check cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
      // console.log("✅ Token from cookie:", token?.substring(0, 20) + "...");
    }

    // 3️⃣ No token → Unauthorized
    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({
        message: "Unauthorized - No token",
        debug: {
          hasAuthHeader: !!req.headers.authorization,
          hasCookies: !!req.cookies,
          cookieKeys: Object.keys(req.cookies || {}),
        },
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    if (!decoded) {
      console.log("❌ Token decode failed");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // console.log("✅ Token decoded, user ID:", decoded.id);

    // 5️⃣ Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ User not found for ID:", decoded.id);
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // console.log("✅ User found:", user.name || user.email);
    (req as any).user = user;
    next();
  } catch (err) {
    console.error("❌ Auth Middleware Error:", err);
    res.status(401).json({
      message: "Unauthorized - Token verification failed",
      error: process.env.NODE_ENV === "development" ? err : undefined,
    });
  }
};

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

    // 1️⃣ From Authorization header
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ From cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    console.log("Token used for auth:", token);

    // 3️⃣ No token → Unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log("Decoded token:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // 5️⃣ Attach user to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware:", error);
    res
      .status(401)
      .json({ message: "Unauthorized - Token verification failed" });
  }
};

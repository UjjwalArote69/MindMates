import jwt from "jsonwebtoken";

interface Payload {
  id: string;
}

export const generateToken = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d", // You can change this to "1h", "30d", etc.
  });
};

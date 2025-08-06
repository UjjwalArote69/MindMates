// src/models/user.model.ts
import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password?: string;
  name?: string;
  googleId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Optional for Google users
    name: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);

import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email: string;
  avatar?: string;
  password?: string;
  role: "seeker" | "admin" | "listener";
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["seeker", "admin", "listener"],
      default: "seeker",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);

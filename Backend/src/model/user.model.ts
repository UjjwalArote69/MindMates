// src/models/user.model.ts

import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  // Basic Info
  email: string;
  password?: string;
  name?: string;
  googleId?: string;
  avatar?: string;

  //Personal Info
  age?: number;
  weight?: number;
  height?: number;
  gender?: "male" | "female" | "other";

  //Mental Health & Wellness
  sleepQuality?: number;
  averageSleepTime?: number;
  stressLevel: number;
  moodTracker?: {
    date: Date;
    mood: string;
  }[];
  mentalHealthScore?: number;

  //Activity Goals
  hydrationLevel?: number;
  meditationMinutes?: number;
  dailySteps?: number;
  exerciseMinutes?: number;
  goals?: [];

  //Meta

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google users
    name: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    sleepQuality: { type: Number, min: 1, max: 10 },
    averageSleepTime: { type: Number, min: 0, max: 24 },
    stressLevel: { type: Number },
    hydrationLevel: {type: Number, min: 0, },
    meditationMinutes: { type: Number, min: 0 },
    moodTracker: [
      {
        date: { type: Date, default: Date.now },
        moof: { type: String },
      },
    ],
    mentalHealthScore: { type: Number, min: 0, max: 100 },
    dailySteps: { type: Number, min: 0 },
    exerciseMinutes: { type: Number },
    goals: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);

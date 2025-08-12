import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password?: string;
  name?: string;
  googleId?: string;
  avatar?: string;

  // Personal Info
  age?: number;
  weight?: number;
  height?: number;
  gender?: "male" | "female" | "other";

  // Logs
  moodTracker?: { date: Date; mood: string }[];
  sleepLogs?: { date: Date; quality: number; hours: number }[];
  stressLogs?: { date: Date; level: number }[];
  hydrationLogs?: { date: Date; liters: number }[];
  activityLogs?: { date: Date; steps: number; minutes: number }[];
  meditationLogs?: { date: Date; minutes: number }[];

  // Calculated/Latest Metrics
  mentalHealthScore?: number;
  goals?: string[];

  createdAt: Date;
  updatedAt: Date;
}

const logSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    value: mongoose.Schema.Types.Mixed
  },
  { _id: false }
);

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },

    moodTracker: [
      { date: { type: Date, default: Date.now }, mood: { type: String } }
    ],
    sleepLogs: [
      {
        date: { type: Date, default: Date.now },
        quality: { type: Number, min: 1, max: 10 },
        hours: { type: Number, min: 0, max: 24 }
      }
    ],
    stressLogs: [
      { date: { type: Date, default: Date.now }, level: { type: Number, min: 0, max: 10 } }
    ],
    hydrationLogs: [
      { date: { type: Date, default: Date.now }, liters: { type: Number, min: 0 } }
    ],
    activityLogs: [
      {
        date: { type: Date, default: Date.now },
        steps: { type: Number, min: 0 },
        minutes: { type: Number, min: 0 }
      }
    ],
    meditationLogs: [
      { date: { type: Date, default: Date.now }, minutes: { type: Number, min: 0 } }
    ],

    mentalHealthScore: { type: Number, min: 0, max: 100 },
    goals: [{ type: String }]
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);

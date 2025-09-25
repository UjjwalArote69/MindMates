import mongoose, { Document } from "mongoose";

export interface FeedbackDocument extends Document {
  user: mongoose.Types.ObjectId;
  name: string; 
  selectedAreas: string[];
  feedback: string;
  createdAt: Date;
}

const feedbackSchema = new mongoose.Schema<FeedbackDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, 
    selectedAreas: [{ type: String }],
    feedback: { type: String },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model<FeedbackDocument>("Feedback", feedbackSchema);

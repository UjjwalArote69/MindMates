import mongoose, { Schema, Document } from "mongoose";

export interface IJournalEntry extends Document {
  userId: mongoose.Types.ObjectId;
  title?: string;
  content: string;
  mood: "happy" | "neutral" | "sad" | "anxious" | "angry" | "excited" | "grateful";
  tags: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const journalEntrySchema = new Schema<IJournalEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: 10000,
    },
    mood: {
      type: String,
      enum: ["happy", "neutral", "sad", "anxious", "angry", "excited", "grateful"],
      required: [true, "Mood is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
journalEntrySchema.index({ userId: 1, createdAt: -1 });
journalEntrySchema.index({ userId: 1, isPinned: -1 });

export default mongoose.model<IJournalEntry>("JournalEntry", journalEntrySchema);

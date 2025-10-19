import { Request, Response } from "express";
import JournalEntry from "../model/journal.model";
import logger from "../utils/logger";

// Create a new journal entry
export const createJournalEntry = async (req: Request, res: Response) => {
  try {
    const { title, content, mood, tags } = req.body;
    const userId =  (req as any).user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!content || !mood) {
      return res.status(400).json({ message: "Content and mood are required" });
    }

    const journalEntry = await JournalEntry.create({
      userId,
      title,
      content,
      mood,
      tags: tags || [],
    });

    res.status(201).json({
      message: "Journal entry created successfully",
      entry: journalEntry,
    });
  } catch (error: any) {
    logger.error("Error creating journal entry:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get all journal entries for logged-in user
export const getJournalEntries = async (req: Request, res: Response) => {
  try {
    const userId =  (req as any).user.id;
    const { page = 1, limit = 10, mood, search } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query: any = { userId };

    // Filter by mood if provided
    if (mood) {
      query.mood = mood;
    }

    // Search in title and content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const entries = await JournalEntry.find(query)
      .sort({ isPinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await JournalEntry.countDocuments(query);

    res.status(200).json({
      entries,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error("Error fetching journal entries:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get a single journal entry by ID
export const getJournalEntryById = async (req: Request, res: Response) => {
  try {
    const userId =  (req as any).user.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const entry = await JournalEntry.findOne({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json({ entry });
  } catch (error: any) {
    logger.error("Error fetching journal entry:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Update a journal entry
export const updateJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId =  (req as any).user.id;
    const { id } = req.params;
    const { title, content, mood, tags, isPinned } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const entry = await JournalEntry.findOne({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    // Update fields
    if (title !== undefined) entry.title = title;
    if (content !== undefined) entry.content = content;
    if (mood !== undefined) entry.mood = mood;
    if (tags !== undefined) entry.tags = tags;
    if (isPinned !== undefined) entry.isPinned = isPinned;

    await entry.save();

    res.status(200).json({
      message: "Journal entry updated successfully",
      entry,
    });
  } catch (error: any) {
    logger.error("Error updating journal entry:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Delete a journal entry
export const deleteJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId =  (req as any).user.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const entry = await JournalEntry.findOneAndDelete({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (error: any) {
    logger.error("Error deleting journal entry:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get journal statistics
export const getJournalStats = async (req: Request, res: Response) => {
  try {
    const userId =  (req as any).user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const totalEntries = await JournalEntry.countDocuments({ userId });

    // Count by mood
    const moodCounts = await JournalEntry.aggregate([
      { $match: { userId } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
    ]);

    // Get current streak (consecutive days with entries)
    const entries = await JournalEntry.find({ userId })
      .sort({ createdAt: -1 })
      .select("createdAt");

    let currentStreak = 0;
    let lastDate: Date | null = null;

    for (const entry of entries) {
      const entryDate = new Date(entry.createdAt);
      entryDate.setHours(0, 0, 0, 0);

      if (!lastDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (entryDate.getTime() === today.getTime() || entryDate.getTime() === yesterday.getTime()) {
          currentStreak = 1;
          lastDate = entryDate;
        } else {
          break;
        }
      } else {
        const expectedDate = new Date(lastDate);
        expectedDate.setDate(expectedDate.getDate() - 1);

        if (entryDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
          lastDate = entryDate;
        } else {
          break;
        }
      }
    }

    res.status(200).json({
      totalEntries,
      moodCounts,
      currentStreak,
    });
  } catch (error: any) {
    logger.error("Error fetching journal stats:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

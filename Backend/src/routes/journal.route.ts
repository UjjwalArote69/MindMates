import express from "express";
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
  getJournalStats,
} from "../controllers/journal.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create a new journal entry
router.post("/", createJournalEntry);

// Get all journal entries
router.get("/", getJournalEntries);

// Get journal statistics
router.get("/stats", getJournalStats);

// Get a single journal entry
router.get("/:id", getJournalEntryById);

// Update a journal entry
router.put("/:id", updateJournalEntry);

// Delete a journal entry
router.delete("/:id", deleteJournalEntry);

export default router;

// src/services/journal.service.ts
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export interface JournalEntry {
  _id: string;
  userId: string;
  title?: string;
  content: string;
  mood: "happy" | "neutral" | "sad" | "anxious" | "angry" | "excited" | "grateful";
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JournalStats {
  totalEntries: number;
  moodCounts: { _id: string; count: number }[];
  currentStreak: number;
}

// Create a new journal entry
export const createJournalEntry = async (data: {
  title?: string;
  content: string;
  mood: string;
  tags?: string[];
}) => {
  try {
    console.log("📝 Creating journal entry...", data);
    const res = await axios.post(`${API}/journal`, data, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Journal entry created:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ createJournalEntry error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

// Get all journal entries with pagination and filters
export const getJournalEntries = async (params?: {
  page?: number;
  limit?: number;
  mood?: string;
  search?: string;
}) => {
  try {
    console.log("📚 Fetching journal entries...", params);
    const res = await axios.get(`${API}/journal`, {
      headers: getAuthHeaders(),
      withCredentials: true,
      params,
    });
    console.log("✅ Journal entries fetched:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ getJournalEntries error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

// Get a single journal entry by ID
export const getJournalEntryById = async (id: string) => {
  try {
    console.log("📖 Fetching journal entry:", id);
    const res = await axios.get(`${API}/journal/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Journal entry fetched:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ getJournalEntryById error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

// Update a journal entry
export const updateJournalEntry = async (
  id: string,
  data: {
    title?: string;
    content?: string;
    mood?: string;
    tags?: string[];
    isPinned?: boolean;
  }
) => {
  try {
    console.log("✏️ Updating journal entry:", id, data);
    const res = await axios.put(`${API}/journal/${id}`, data, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Journal entry updated:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ updateJournalEntry error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

// Delete a journal entry
export const deleteJournalEntry = async (id: string) => {
  try {
    console.log("🗑️ Deleting journal entry:", id);
    const res = await axios.delete(`${API}/journal/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Journal entry deleted:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ deleteJournalEntry error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

// Get journal statistics
export const getJournalStats = async () => {
  try {
    console.log("📊 Fetching journal stats...");
    const res = await axios.get(`${API}/journal/stats`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Journal stats fetched:", res.data);
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ getJournalStats error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

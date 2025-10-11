// user.service.ts - SIMPLIFIED (NO TOKEN INTERCEPTOR)
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ This automatically sends cookies
});

interface DailyLogData {
  mood: string;
  sleepQuality: number;
  sleepHours: number;
  stressLevel: number;
  hydrationLiters?: number;
  activitySteps?: number;
  activityMinutes?: number;
  meditationMinutes?: number;
}

export const getMe = async () => {
  try {
    // In getMe function
    console.log("🔍 Making request to /users/me");
    console.log("🍪 Document.cookie:", document.cookie);

    const res = await instance.get("/users/me");
    console.log("✅ User data received:", res.data);
    return { data: res.data || null };
  } catch (error: any) {
    console.error(
      "❌ getMe error:",
      error.response?.status,
      error.response?.data
    );
    return { data: null };
  }
};

export const onboardingData = async (data: {
  gender: string;
  age: number;
  currentMood: string;
  sleepQuality: number;
  currentStress: number;
  height: number;
  weight: number;
}) => {
  try {
    console.log("📤 Sending onboarding data to backend...");
    const res = await instance.put("/users/onboarding", data);
    console.log("✅ Onboarding response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error(
      "❌ Onboarding error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const saveDailyLog = async (data: DailyLogData) => {
  try {
    // ✅ FIX: Add /users prefix
    const res = await instance.post("/users/daily-log", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : saveDailyLog ", error);
    throw error;
  }
}

export const getTodayStatus = async () => {
  try {
    // ✅ FIX: Add /users prefix
    const res = await instance.get("/users/daily-status", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("User service : getTodayStatus ", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await instance.post(
      `${API}/users/logout`,
      {},
      { withCredentials: true }
    );

    // Clear localStorage + cookie
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    return { data: res.data || null };
  } catch (error) {
    console.error("User service : logoutUser ", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const res = await instance.delete(`${API}/users/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : deleteUser ", error);
    throw error;
  }
};

export const updateUser = async (data: {
  updatedName?: string;
  updatedPassword?: string;
  updatedWeight?: number;
  updatedHeight?: number;
  updatedGender?: string;
  updatedBirthDate?: Date;
}) => {
  try {
    const res = await instance.put(`${API}/users/me`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : updateUser ", error);
    throw error;
  }
};

export const submitFeedback = async (data: {
  selectedAreas: string[];
  feedback: string;
}) => {
  try {
    const res = await instance.post(`${API}/users/feedback`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    console.error("User service : submitFeedback", error);
    throw error.response?.data || error;
  }
};

export const updateTodayMood = async (mood: string) => {
  try {
    console.log("😊 Updating mood to:", mood);
    const res = await instance.put("/users/mood", { mood });
    console.log("✅ Mood updated:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ updateTodayMood error:", error.response?.data || error);
    throw error;
  }
};

export const updateTodayStress = async (stressLevel: number) => {
  try {
    console.log("😰 Updating stress to:", stressLevel);
    const res = await instance.put("/users/stress", { stressLevel });
    console.log("✅ Stress updated:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ updateTodayStress error:", error.response?.data || error);
    throw error;
  }
};

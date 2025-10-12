import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ✅ Helper function to get headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

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
    console.log("🔍 Making request to /users/me");
    const token = localStorage.getItem("token");
    console.log("🔑 Token:", token?.substring(0, 20) + "...");

    const res = await axios.get(`${API}/users/me`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
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
    const res = await axios.put(`${API}/users/onboarding`, data, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
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
    const res = await axios.post(`${API}/users/daily-log`, data, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : saveDailyLog ", error);
    throw error;
  }
};

export const getTodayStatus = async () => {
  try {
    const res = await axios.get(`${API}/users/daily-status`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : getTodayStatus ", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API}/users/logout`,
      {},
      {
        headers: getAuthHeaders(),
        withCredentials: true,
      }
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
    const res = await axios.delete(`${API}/users/me`, {
      headers: getAuthHeaders(),
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
    const res = await axios.put(`${API}/users/me`, data, {
      headers: getAuthHeaders(),
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
    const res = await axios.post(`${API}/users/feedback`, data, {
      headers: getAuthHeaders(),
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
    const res = await axios.put(`${API}/users/mood`, { mood }, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
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
    const res = await axios.put(`${API}/users/stress`, { stressLevel }, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log("✅ Stress updated:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ updateTodayStress error:", error.response?.data || error);
    throw error;
  }
};

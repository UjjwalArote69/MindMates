// user.service.ts
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getMe = async () => {
  try {
    const res = await axios.get(`${API}/users/me`, {
      withCredentials: true, // VERY IMPORTANT for cookies
    });
    return res.data;
  } catch (error) {
    console.error("User service : getMe ", error);
    throw error;
  }
};

export const onboardingData = async (data: {
  age: number;
  gender: string;
  weight?: number;
  subscriptionType?: string;
  sleepQuality?: number;
  currentMood?: string;
  currentStress?: number;
  mentalHealthScore?: number;
}) => {
  try {
    const res = await axios.put(`${API}/users/onboarding`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : onboardingData ", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API}/users/logout`,
      {}, // empty body
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // ensures cookie (token) is sent
      }
    );
    return res.data;
  } catch (error) {
    console.error("User service : logoutUser ", error);
    throw error;
  }
};

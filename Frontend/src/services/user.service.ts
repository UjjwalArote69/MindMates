// user.service.ts
import axios from "axios";
axios.defaults.withCredentials = true; // ensures cookies are sent with requests

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${API}/users/logout`, {
      
      withCredentials: true, // ensures cookie (token) is sent
    });
    return res.data;
  } catch (error) {
    console.error("User service : logoutUser ", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const res = await axios.delete(`${API}/users/me`, {
      
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("User service : deleteUser ", error);
    throw error;
  }
};

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
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // ensures auth cookie/token is sent
    });
    return res.data;
  } catch (error: any) {
    console.error("User service : submitFeedback", error);
    throw error.response?.data || error;
  }
};

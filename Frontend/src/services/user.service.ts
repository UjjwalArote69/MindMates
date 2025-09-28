import axios from "axios";

// Use VITE_API_BASE_URL, fallback only to localhost
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API,
  withCredentials: true, // ensures cookies are sent
});

export const getMe = async () => {
  try {
    const res = await instance.get("/users/me");
    return { data: res.data || null };
  } catch (error) {
    console.error("User service : getMe ", error);
    return { data: null };
  }
};

export const logoutUser = async () => {
  try {
    const res = await instance.post(
      `${API}/users/logout`,
      {}, // empty body
      { withCredentials: true } // config goes here
    );
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
    const res = await instance.put(`${API}/users/onboarding`, data, {
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
    const res = await instance.put(`${API}/users/me`, data, {
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

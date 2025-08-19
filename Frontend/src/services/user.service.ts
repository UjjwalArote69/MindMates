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

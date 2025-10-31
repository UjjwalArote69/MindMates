import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const registerUserService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ registerUserService error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

export const loginUserService = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${API}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("✅ RES.DATA from login():", res.data); // 👈 LOG THIS
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number, data?: unknown } };
      console.error("❌ loginUserService error:", axiosError.response?.status, axiosError.response?.data);
    } else {
      console.error("Unknown error in onboardingData", error);
    }
  }
};

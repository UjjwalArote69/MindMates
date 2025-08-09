import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    throw error;
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
  } catch (error: any) {
    console.error("❌ LOGIN ERROR:", error.response?.data || error.message);
    throw error;
  }
};

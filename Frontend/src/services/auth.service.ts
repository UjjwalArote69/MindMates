import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const register = async (data: {
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
    return res;
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    throw error;
  }
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    try {
        const res = await axios.post(`${API}/auth/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("❌ LOGIN ERROR:", error);
        throw error;
    }
}
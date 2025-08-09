// user.service.ts
import axios from "axios";

export const getMe = async () => {
  const res = await axios.get("http://localhost:5000/api/users/me", {
    withCredentials: true, // VERY IMPORTANT for cookies
  });
  return res.data;
};

// pages/Authentication/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // ✅ Save token both places
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; SameSite=None; Secure`;
    }

    // Fetch latest user with token
    fetchUser().then(() => {
      navigate("/home");
    });
  }, [navigate, fetchUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Finalizing login...</p>
    </div>
  );
};

export default GoogleCallback;

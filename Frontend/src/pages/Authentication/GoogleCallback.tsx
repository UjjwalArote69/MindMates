import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useUserStore} from "../../store/userStore";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token locally and as cookie for persistence
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; SameSite=None; Secure`;

      // Fetch latest user details based on token
      fetchUser().then(() => {
        navigate("/home");
      }).catch(() => {
        // Handle fetch failure (redirect to login or error)
        navigate("/login");
      });
    } else {
      // If no token, redirect to login
      navigate("/login");
    }
  }, [navigate, fetchUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Finalizing login...</p>
    </div>
  );
};

export default GoogleCallback;

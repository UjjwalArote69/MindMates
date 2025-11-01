import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const fetchUser = useUserStore(
    (state) => state.fetchUser
  );

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );
    const token = params.get("token");

    if (token) {
      console.log(
        "Google login token:",
        token
      );

      localStorage.setItem(
        "token",
        token
      );
      document.cookie = `token=${token}; path=/; SameSite=None; Secure`;

      fetchUser()
        .then(() => {
          navigate("/home");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate, fetchUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">
        Finalizing login...
      </p>
    </div>
  );
};

export default GoogleCallback;

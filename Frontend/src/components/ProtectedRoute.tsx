// frontend/src/components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;

// src/components/ProtectedRoute.tsx
import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return isAuth ? children : <Navigate to="/auth/login" replace />;
}
export default ProtectedRoute;
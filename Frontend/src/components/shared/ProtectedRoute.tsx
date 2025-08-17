// src/components/ProtectedRoute.tsx
import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const token = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith("token="));

  // // If no token → redirect to login
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // return children;

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    API.get("/users/me")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
}

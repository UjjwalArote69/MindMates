// src/components/shared/ProtectedRoute.tsx - WORKING VERSION
import { JSX } from "react";
import { useUserStore } from "../../store/userStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading, initialized } = useUserStore();

  // ✅ Still checking session
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F5F2]">
        <div className="w-16 h-16 border-4 border-[#4E342E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ No user = No cookie = Redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ User exists = Cookie is valid = Show protected page
  return children;
};

export default ProtectedRoute;

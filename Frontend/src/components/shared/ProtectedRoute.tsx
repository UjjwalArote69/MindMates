// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading, fetchUser } = useUserStore();

  // 🔄 Always try to fetch user on mount
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  // Still loading → show spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // No user after loading → redirect
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Authenticated → show page
  return children;
};

export default ProtectedRoute;

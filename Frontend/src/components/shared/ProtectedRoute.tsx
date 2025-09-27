import { JSX } from "react";
import { useUserStore } from "../../store/userStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useUserStore();

  // Still fetching user → show loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading your session...</p>
      </div>
    );
  }

  // ✅ Only redirect if fetch is done and user is definitely null
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Authenticated → render page
  return children;
};

export default ProtectedRoute;

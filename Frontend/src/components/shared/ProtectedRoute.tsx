import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useUserStore();

  // 🔄 If still checking session, show loader instead of redirecting
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // 🚫 If done loading and no user → redirect
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Authenticated → render child page
  return children;
};

export default ProtectedRoute;

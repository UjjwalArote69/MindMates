import React from "react";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.removeItem("token");
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/auth/login");
  };

  return (
    <div>
      {/* Logout trigger */}
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
      >
        Log Out
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/auth/login");
  };

  return (
    <div>
      {/* Logout trigger button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="group flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-98 transition-all"
      >
        <span className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <LogOut size={20} />
          </div>
          Log Out
        </span>
        <span className="text-white/80">→</span>
      </button>

      {/* Enhanced Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center relative">
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <LogOut size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Logging Out?
              </h2>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <p className="text-gray-700 mb-2 font-medium">
                Are you sure you want to log out?
              </p>
              <p className="text-sm text-gray-500 mb-8">
                You can always log back in anytime to continue your wellness journey.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmLogout}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 active:scale-98 transition-all"
                >
                  Yes, Log Out
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 rounded-2xl bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 active:scale-98 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;

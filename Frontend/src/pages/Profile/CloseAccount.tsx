import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import {
  AlertTriangle,
  Shield,
  Trash2,
  ArrowLeft,
  X,
} from "lucide-react";

const CloseAccount = () => {
  const [loading, setLoading] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const deleteUserAccount = useUserStore((state) => state.deleteUserAccount);

  useEffect(() => {
    if (user) {
      setIsGoogleUser(!!user.googleId);
    } else {
      setIsGoogleUser(null);
    }
  }, [user]);

  const handleDeleteRequest = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== "delete") {
      alert("Please type DELETE to confirm");
      return;
    }

    if (!isGoogleUser && password.trim() === "") {
      alert("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      await deleteUserAccount({password});
      alert("Account deleted successfully. We're sad to see you go! 💔");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner if user info not yet loaded
  if (isGoogleUser === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] px-4 md:px-8 md:pl-[100px] overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:left-[120px] w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all z-10"
      >
        <ArrowLeft size={20} className="text-gray-700" />
      </button>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Red Warning Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Close Your Account</h1>
          <p className="text-white/90 text-sm">
            This action is permanent and cannot be undone
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* What You'll Lose Section */}
          <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
              <Trash2 size={20} />
              What you'll lose forever:
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>All your journal entries and mood tracking history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Personalized AI recommendations and insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Mental wellness statistics and progress charts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>All saved preferences and emergency contacts</span>
              </li>
              {isGoogleUser && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">❌</span>
                  <span>Your Google account will be unlinked from MindMates</span>
                </li>
              )}
            </ul>
            {/* Show password input only if NOT Google user */}
            {!isGoogleUser && (
              <div className="mt-6">
                <label className="block mb-1 font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password to confirm"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition"
                />
              </div>
            )}
          </div>

          {/* Alternative Options */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Shield size={20} />
              Consider these alternatives:
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Take a break - your data will remain safe</p>
              <p>• Adjust privacy settings instead</p>
              <p>• Contact support if something is wrong</p>
            </div>
          </div>

          {/* User Message */}
          <div className="text-center py-4">
            <p className="text-gray-700 font-medium mb-2">
              We're sad to see you go, {user?.name} 💔
            </p>
            <p className="text-sm text-gray-600">
              If there's anything we can do to improve, please let us know
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-bold hover:from-gray-200 hover:to-gray-300 active:scale-98 transition-all shadow-md"
              onClick={() => navigate(-1)}
            >
              Keep My Account
            </button>
            <button
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 active:scale-98 transition-all shadow-lg disabled:opacity-50"
              onClick={handleDeleteRequest}
              disabled={loading}
            >
              Continue to Delete
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-1">
                  Final Confirmation
                </h2>
                <p className="text-sm text-gray-600">This action is irreversible</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setConfirmText("");
                }}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="bg-red-50 rounded-2xl p-4 mb-6 border border-red-200">
              <p className="text-sm text-red-800 font-medium text-center">
                ⚠️ All your data will be permanently deleted
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Type{" "}
                  <span className="text-red-600">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors font-medium"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setConfirmText("");
                  }}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 active:scale-98 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading || confirmText.toLowerCase() !== "delete"}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </span>
                  ) : (
                    "Delete Forever"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseAccount;

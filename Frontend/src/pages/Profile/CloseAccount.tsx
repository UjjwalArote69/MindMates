import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
// import WarningIcon from "../../assets/Icons/Warning.svg"; // optional

const CloseAccount = () => {
  const [loading, setLoading] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const deleteUserAccount = useUserStore((state) => state.deleteUserAccount);

  useEffect(() => {
    if (user) setIsGoogleUser(!!user.googleId);
    else setIsGoogleUser(null);
  }, [user]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account?"
      )
    )
      return;

    try {
      setLoading(true);
      await deleteUserAccount();
      alert("Account deleted successfully!");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  if (isGoogleUser === null)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9F5F2] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center gap-6">
        {/* Warning Icon */}
        {/* <img src={WarningIcon} alt="Warning" className="w-16 h-16 mb-2" /> */}

        <h1 className="text-2xl font-bold text-red-600 text-center">
          Close Your Account
        </h1>
        <p className="text-sm text-gray-600 text-center">
          {isGoogleUser
            ? "Since you signed up with Google, deleting your account will unlink your Google login and remove all your personal data."
            : "Deleting your account is permanent and will erase all your data including journals, stats, and preferences."}
        </p>

        <div className="flex gap-4 w-full mt-6">
          <button
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition transform hover:scale-105"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition transform hover:scale-105 disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default CloseAccount;

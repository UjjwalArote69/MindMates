import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../services/user.service";
import { deleteUser } from "../../services/user.service"; // your backend delete route

const CloseAccount = () => {
  const [loading, setLoading] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setIsGoogleUser(!!user.googleId); // ✅ detect if Google user
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account?")) return;

    try {
      setLoading(true);

      if (isGoogleUser) {
        // 👉 Google users: maybe just deactivate or call special endpoint
        await deleteUser(); 
      } else {
        // 👉 Normal users: full delete
        await deleteUser();
      }

      alert("Account deleted successfully!");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  if (isGoogleUser === null) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center px-6 py-12">
      <h1 className="text-xl font-bold text-red-600 mb-4">Close Your Account</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        {isGoogleUser
          ? "Since you signed up with Google, deleting your account will unlink your Google login."
          : "Deleting your account is permanent and will erase all your data."}
      </p>

      <div className="flex gap-4 w-full max-w-md">
        <button
          className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default CloseAccount;

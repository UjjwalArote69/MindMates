import StarIcon from "../../assets/Icons/Star Icon.svg";
import FourCirclesIcon from "../../assets/Icons/Four Circles Icon.svg";
import HappyIcon from "../../assets/Icons/Happy Icon.svg";
import SearchIcon from "../../assets/Icons/Search Icon.svg";
import Navbar from "../../components/shared/Navbar";
import AiReccomendation from "./components/AiReccomendation";
import SwipableCards from "./components/SwipableCards";
import MindfullTracker from "./components/MindfullTracker";
import NotificationsIcon from "../../assets/Icons/Notifications.svg";
import DefaultAvatar from "../../assets/Icons/User Pfp Avatar.png";
import { useUserStore } from "../../store/userStore";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user, fetchUser, loading } = useUserStore();
  // const navigate = useNavigate();
  const getProfileImage = () => (user?.avatar ? user.avatar : DefaultAvatar);

  // console.log("🔍 Home Render:", { user, loading, initialized });

  useEffect(() => {
    fetchUser();
  }, [user]);

  // console.log("🔍 Home Render:", { user, loading, initialized });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9F5F2]">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-[#4E342E] border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-[#4E342E] font-semibold text-lg">
            Loading your MindMates...
          </p>
          {/* Subtext */}
          <p className="text-gray-500 text-sm text-center max-w-xs">
            Fetching your profile and personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="main" className="min-h-screen pb-20 w-full font-Lato bg-[#f6f5f2]">
      {/* Header */}
      <div className="p-4 pb-5 bg-white w-full flex flex-col gap-3 shadow-xl rounded-b-4xl">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <p className=" text-gray-500 font-medium">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black">
              <img src={NotificationsIcon} alt="" />
            </div>
          </div>
        </div>

        {/* Profile + Greeting */}
        <div className="flex items-center gap-4">
          <img
            src={getProfileImage()}
            className="h-14 w-14 rounded-full border-2 border-gray-200 object-cover"
            alt="profile"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-[#3f2c22]">
              {`Hi, ${user?.name}!`}
            </h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#e5f8e5] text-[#2f7a32] rounded-lg font-semibold text-xs">
                <img src={StarIcon} alt="star" className="w-4 h-4" />
                {user?.isPro ? "Pro Member" : "Free Member"}
              </div>
              <div className="flex items-center gap-1">
                <img src={FourCirclesIcon} alt="progress" className="w-4 h-4" />
                {user?.mentalHealthScore !== undefined
                  ? `${user.mentalHealthScore}%`
                  : "N/A"}
              </div>
              <div className="flex items-center gap-1">
                <img src={HappyIcon} alt="happy" className="w-4 h-4" />
                <span>
                  {user?.moodTracker && user.moodTracker.length > 0
                    ? user.moodTracker[user.moodTracker.length - 1].mood
                    : "Good"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2 flex items-center gap-2 w-full h-12 px-4 rounded-full bg-[#f6f5f2] shadow-sm">
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          />
          <img src={SearchIcon} alt="search" className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col items-center bg-amber-20 px-3">
        <AiReccomendation />
        <SwipableCards />
        <MindfullTracker />
      </div>

      <Navbar />
    </div>
  );
};

export default Home;

import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
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
import MindMatesScore from "./components/MindMatesScore";
import StressLevelChart from "./components/StressLevelChart";
import {
  Moon,
  BookOpen,
  MessageCircle,
  Crown,
  ArrowRight,
  BarChart3,
  Calendar,
  Bell,
  X,
  Plus,
} from "lucide-react";

const Home = () => {
  const { user, loading } = useUserStore();
  const navigate = useNavigate();
  
  // ✅ State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  
  // ✅ Mock Notifications (Replace with real data later)
  const [notifications] = useState([
    { id: 1, message: "Your mental health score improved by 5%!", time: "2h ago", read: false },
    { id: 2, message: "Time for your daily breathing exercise 🧘‍♂️", time: "5h ago", read: true },
    { id: 3, message: "You've completed 7 days streak! 🎉", time: "1d ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // ✅ Helper Functions
  const getProfileImage = () => (user?.avatar ? user.avatar : DefaultAvatar);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Navigate to search results or filter content
      console.log("Searching for:", searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9F5F2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#4E342E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4E342E] font-semibold text-lg">
            Loading your MindMates...
          </p>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            Fetching your profile and personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full font-Lato bg-[#f6f5f2] md:flex md:pl-[100px] overflow-hidden">
      {/* ✅ Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#A3B763]/40 via-[#7CB47C]/35 to-[#8AA84E]/30 rounded-full blur-3xl animate-blob shadow-2xl" />
        <div className="absolute top-20 -right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#8676E2]/38 via-[#6F5DD3]/33 to-[#9D8EE8]/28 rounded-full blur-3xl animate-blob-slow animation-delay-2s shadow-2xl" />
        <div className="absolute -bottom-10 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-[#FCE38A]/42 via-[#F5D665]/36 to-[#F0C857]/30 rounded-full blur-3xl animate-blob animation-delay-6s shadow-2xl" />
        <div className="absolute bottom-20 -right-10 w-[480px] h-[480px] bg-gradient-to-br from-[#B8956A]/35 via-[#7D5C47]/30 to-[#624A35]/25 rounded-full blur-3xl animate-blob-slow animation-delay-4s shadow-2xl" />
        <div className="absolute top-1/2 left-1/2 w-[750px] h-[750px] bg-gradient-to-br from-[#B5CC99]/30 via-[#A3B763]/25 to-[#9CB87D]/20 rounded-full blur-3xl animate-breathe animation-delay-8s" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-[#A3B763]/28 to-[#8AA84E]/22 rounded-full blur-2xl animate-blob animation-delay-3s" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FCE38A]/32 to-[#F0C857]/26 rounded-full blur-2xl animate-blob-slow animation-delay-5s" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-[#8676E2]/25 to-[#6F5DD3]/20 rounded-full blur-2xl animate-blob animation-delay-7s" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full md:max-w-[1300px] mx-auto pb-20 md:px-6">
        {/* ✅ IMPROVED Mobile Header */}
        <div className="md:hidden bg-white/95 backdrop-blur-xl rounded-b-3xl shadow-xl px-5 py-6 border-b border-gray-100">
          {/* Top Row - Profile & Notification */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={getProfileImage()}
                className="h-12 w-12 rounded-full border-2 border-[#A3B763]/30 object-cover shadow-md cursor-pointer hover:scale-105 transition-transform"
                alt="profile"
                onClick={() => navigate("/profile")}
              />
              <div>
                <h1 className="text-lg font-bold text-[#493726] flex items-center gap-1">
                  Hello, {user?.name || "User"}!{" "}
                  <span className="text-base">👋</span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Welcome back!
                </p>
              </div>
            </div>

            {/* Notification Button */}
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#F8F6F3] to-gray-100 flex items-center justify-center shadow-md active:scale-95 transition-transform hover:bg-gray-100"
            >
              <Bell size={20} className="text-[#624A35]" />
              {unreadCount > 0 && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></div>
              )}
            </button>
          </div>

          {/* Stats Badges Row */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => navigate("/upgrade")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#e5f8e5] to-[#d4f0d4] text-[#2f7a32] rounded-full shadow-sm text-xs font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <img src={StarIcon} alt="star" className="w-3.5 h-3.5" />
              {user?.isPro ? "Pro Member" : "Free Member"}
            </button>
            <button 
              onClick={() => navigate("/stats")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#F8F6F3] to-[#F0EBE6] text-[#624A35] rounded-full shadow-sm text-xs font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <img
                src={FourCirclesIcon}
                alt="progress"
                className="w-3.5 h-3.5"
              />
              {user?.mentalHealthScore !== undefined
                ? `${user.mentalHealthScore}%`
                : "N/A"}
            </button>
            <button 
              onClick={() => navigate("/stats/mood")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FFFAEA] to-[#FFF9E5] text-[#B8A16A] rounded-full shadow-sm text-xs font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <img src={HappyIcon} alt="happy" className="w-3.5 h-3.5" />
              {user?.moodTracker && user.moodTracker.length > 0
                ? user.moodTracker[user.moodTracker.length - 1].mood
                : "Happy"}
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center bg-gradient-to-r from-[#F8F6F3] to-gray-100 rounded-full shadow-inner h-11 px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 font-medium"
            />
            <button type="submit">
              <img src={SearchIcon} alt="search" className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* ✅ Desktop Header */}
        <div className="hidden md:block bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl md:mt-8 px-6 py-7 gap-6 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={getProfileImage()}
                className="h-12 w-12 md:h-16 md:w-16 rounded-full border-2 border-gray-200 object-cover shadow-lg cursor-pointer hover:scale-105 transition-transform"
                alt="profile"
                onClick={() => navigate("/profile")}
              />
              <div>
                <h1 className="text-2xl font-extrabold text-[#493726] flex items-center gap-1">
                  Hello, {user?.name || "User"}! <span>👋</span>
                </h1>
                <div className="flex flex-wrap gap-2 mt-2 text-xs md:text-sm text-gray-700 font-medium">
                  <button 
                    onClick={() => navigate("/upgrade")}
                    className="flex items-center gap-1 px-2 py-0.5 bg-[#e5f8e5] text-[#2f7a32] rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <img src={StarIcon} alt="star" className="w-4 h-4" />
                    {user?.isPro ? "Pro Member" : "Free Member"}
                  </button>
                  <button 
                    onClick={() => navigate("/stats")}
                    className="flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F9] text-[#624A35] rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <img
                      src={FourCirclesIcon}
                      alt="progress"
                      className="w-4 h-4"
                    />
                    {user?.mentalHealthScore !== undefined
                      ? `${user.mentalHealthScore}%`
                      : "N/A"}
                  </button>
                  <button 
                    onClick={() => navigate("/stats/mood")}
                    className="flex items-center gap-1 px-2 py-0.5 bg-[#FFFAEA] text-[#B8A16A] rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <img src={HappyIcon} alt="happy" className="w-4 h-4" />
                    {user?.moodTracker && user.moodTracker.length > 0
                      ? user.moodTracker[user.moodTracker.length - 1].mood
                      : "Happy"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
                <form onSubmit={handleSearch} className="flex items-center w-full md:w-80 bg-white/80 backdrop-blur-sm rounded-full shadow-sm h-12 px-4 border border-gray-200/50">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anything..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                  />
                  <button type="submit">
                    <img src={SearchIcon} alt="search" className="w-5 h-5" />
                  </button>
                </form>
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="relative w-10 h-10 hidden md:flex md:items-center md:justify-center rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all active:scale-95"
                >
                  <img src={NotificationsIcon} alt="notifications" />
                  {unreadCount > 0 && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Cards/Charts */}
        <div className="hidden md:grid md:grid-cols-12 gap-7 mt-10">
          <MindMatesScore
            mentalHealthScore={user?.mentalHealthScore}
            mentalHealthScoreLogs={user?.mentalHealthScoreLogs}
          />
          <StressLevelChart
            currentStress={user?.currentStress}
            stressLogs={user?.stressLogs}
          />

          <div className="md:col-span-12 grid grid-cols-4 gap-6">
            {/* Sleep Level Card */}
            <div
              className="group relative bg-gradient-to-br from-[#B5CC99] to-[#9CB87D] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate("/stats/sleep")}
            >
              <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BarChart3 size={20} className="text-[#324A2A]" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <Moon size={32} className="text-[#324A2A] mb-3" />
                  <h3 className="text-white text-lg font-bold mb-1">
                    Sleep Quality
                  </h3>
                  <p className="text-[#324A2A]/70 text-xs font-medium">
                    Last night's rest
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="text-4xl font-extrabold text-white">
                    {user?.sleepLogs && user.sleepLogs.length > 0
                      ? `${user.sleepLogs[user.sleepLogs.length - 1].hours.toFixed(1)}h`
                      : "N/A"}
                  </div>
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Health Journal Card */}
            <div
              className="group relative bg-gradient-to-br from-[#FCE38A] to-[#F5D665] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate("/journal")}
            >
              <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Calendar size={20} className="text-[#B28653]" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <BookOpen size={32} className="text-[#B28653] mb-3" />
                  <h3 className="text-[#B28653] text-lg font-bold mb-1">
                    Health Journal
                  </h3>
                  <p className="text-[#B28653]/70 text-xs font-medium">
                    Daily entries
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="text-4xl font-extrabold text-[#B28653]">
                    {user?.meditationLogs?.length || 0}d
                  </div>
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
                    <ArrowRight size={20} className="text-[#B28653]" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Chatbot Card */}
            <div
              className="group relative bg-gradient-to-br from-[#8676E2] to-[#6F5DD3] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate("/chat")}
            >
              <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-sm">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-1">
                    AI Chatbot
                  </h3>
                  <p className="text-white/70 text-xs font-medium">
                    24/7 support
                  </p>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="text-4xl font-extrabold text-white">Chat</div>
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade to Pro Card */}
            <div
              className="group relative bg-gradient-to-br from-[#7D5C47] to-[#624A35] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate("/upgrade")}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="relative flex flex-col justify-between h-full">
                <div>
                  <Crown size={32} className="text-[#F5D665] mb-3" />
                  <h3 className="text-white text-lg font-bold mb-1">
                    Lets Go Pro
                    <br />
                    Today!
                  </h3>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="w-1.5 h-1.5 bg-[#F5D665] rounded-full"></div>
                      Advanced AI
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="w-1.5 h-1.5 bg-[#F5D665] rounded-full"></div>
                      Unlimited Access
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <div className="w-10 h-10 bg-[#F5D665] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                    <ArrowRight size={20} className="text-[#7D5C47]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile components */}
        <div className="md:hidden flex flex-col items-center px-3 mt-6">
          <AiReccomendation />
          <SwipableCards />
          <MindfullTracker />
        </div>

        <Navbar />

        {/* ✅ Floating Action Button */}
        <button
          onClick={() => navigate("/daily-tracker")}
          className="fixed bottom-24 md:bottom-8 right-6 w-16 h-16 bg-gradient-to-br from-[#A3B763] to-[#8AA84E] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
        >
          <Plus size={32} className="text-white" />
        </button>
      </div>

      {/* ✅ Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center px-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#493726]">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-2xl transition-all cursor-pointer hover:scale-105 ${
                    notification.read ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"
                  }`}
                >
                  <p className={`text-sm ${notification.read ? "text-gray-700" : "text-gray-900 font-semibold"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell size={48} className="mx-auto mb-2 opacity-30" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

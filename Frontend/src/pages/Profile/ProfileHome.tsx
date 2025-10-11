import Navbar from "../../components/shared/Navbar";
import BgImage from "../../assets/Images/Profile/Profile Background Image.png";
import PersonalInfo from "../../assets/Icons/Profile Page Personal Info Icon.svg";
import EmergencyIcon from "../../assets/Icons/Emergency Contact Icon.svg";
import MoonIcon from "../../assets/Icons/Moon Icon.svg";
import InviteIcon from "../../assets/Icons/Share Invite Friends.svg";
import FeedbackIcon from "../../assets/Icons/Submit Feedback Icon.svg";
import Help from "../../assets/Icons/Help Center Icon.svg";
import GarbageIcon from "../../assets/Icons/Close Account Garbage Icon.svg";
// import ForwardIcon from "../../assets/Icons/Forward Icon.svg";
import DefaultAvatar from "../../assets/Icons/User Pfp Avatar.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import LogoutButton from "./LogoutButton";
import { ChevronRight, Crown, Shield } from "lucide-react";

const ProfileHome = () => {
  const { user, loading, initialized } = useUserStore();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  console.log("🔍 ProfileHome Render:", { user, loading, initialized });

  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, initialized, navigate]);

  if (!initialized || loading) {
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

  const getProfileImage = () => user?.avatar || DefaultAvatar;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] text-[#4B2E2B] flex flex-col items-center md:pl-[100px] overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3B763]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8676E2]/10 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10 w-full max-w-4xl pb-24">
        {/* Enhanced Header Section */}
        <div className="relative w-full h-56 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-[#A3B763] to-[#8fa054] rounded-b-[60px] overflow-hidden">
            <img
              src={BgImage}
              alt="Profile Background"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          
          {/* Profile Picture */}
          <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#A3B763] to-[#8fa054] rounded-full opacity-30 blur-xl"></div>
              
              {/* Avatar container */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={getProfileImage()}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Edit button */}
              <button className="absolute bottom-0 right-0 w-9 h-9 bg-gradient-to-br from-[#A3B763] to-[#8fa054] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-white text-lg">✏️</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full px-5 md:px-8 mt-16">
          {/* User Info Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] mb-2">
                {user?.name}
              </h1>
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#e4f0e2] to-[#d4e5d0] text-[#3c5136] rounded-full px-4 py-2 shadow-md">
                {user?.isPro ? (
                  <>
                    <Crown size={16} className="text-[#F5D665]" />
                    <span className="text-sm font-semibold">PRO MEMBER</span>
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    <span className="text-sm font-semibold">BASIC MEMBER</span>
                  </>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-[#F8F6F3] to-white rounded-2xl shadow-sm">
                <span className="font-bold text-2xl text-[#4B2E2B]">
                  {user?.age || "--"}
                </span>
                <span className="text-sm text-gray-600 mt-1">Age</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-[#F8F6F3] to-white rounded-2xl shadow-sm">
                <span className="font-bold text-2xl text-[#4B2E2B]">
                  {user?.weight || "--"}
                </span>
                <span className="text-sm text-gray-600 mt-1">Weight</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-[#F8F6F3] to-white rounded-2xl shadow-sm">
                <span className="font-bold text-2xl text-[#4B2E2B]">
                  {user?.height || "--"}
                </span>
                <span className="text-sm text-gray-600 mt-1">Height</span>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="mt-8 space-y-6">
            <SettingsSection title="General Settings">
              <SettingItem
                icon={PersonalInfo}
                label="Personal Information"
                route="/profile/personal-info"
              />
              <SettingItem
                icon={EmergencyIcon}
                label="Emergency Contact"
                value="3+"
                route="/profile/emergency"
              />
              <SettingItem
                icon={FeedbackIcon}
                label="Submit Feedback"
                route="/profile/feedback"
              />
              <SettingItem
                icon={MoonIcon}
                label="Dark Mode"
                toggle
                toggleValue={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
              />
              <SettingItem
                icon={InviteIcon}
                label="Invite Friends"
                route="/profile/invite"
              />
            </SettingsSection>

            <SettingsSection title="Service & Privacy">
              <SettingItem
                icon={Help}
                label="Help Center"
                route="/profile/help"
              />
              
              {/* Danger Zone */}
              <div
                className="group relative flex justify-between items-center px-5 py-4 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 text-red-600 font-semibold cursor-pointer shadow-md hover:shadow-lg transition-all overflow-hidden"
                onClick={() => navigate("/profile/delete")}
              >
                <div className="absolute inset-0 bg-red-200 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <img src={GarbageIcon} alt="Close Account" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold">Close Account</span>
                    <span className="text-xs text-red-500">Permanently delete your account</span>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-red-600 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </SettingsSection>

            <SettingsSection title="Session">
              <LogoutButton />
            </SettingsSection>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

// Enhanced SettingsSection component
const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="w-full">
    <h2 className="text-sm font-bold text-[#4B2E2B] mb-3 px-2 uppercase tracking-wide">
      {title}
    </h2>
    <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-white/20">
      {children}
    </div>
  </div>
);

// Enhanced SettingItem component
const SettingItem = ({
  icon,
  label,
  value,
  toggle,
  toggleValue,
  onToggle,
  route,
}: {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
  route?: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!toggle && route) navigate(route);
  };

  return (
    <div
      className={`group flex justify-between items-center px-4 py-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all ${
        !toggle && "cursor-pointer active:scale-98"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#F8F6F3] to-[#F0EBE6] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <img src={icon} alt={label} className="w-6 h-6" />
        </div>
        <span className="font-semibold text-[#4B2E2B]">{label}</span>
      </div>

      <div className="flex items-center gap-3">
        {value && (
          <span className="px-3 py-1 bg-[#A3B763]/20 text-[#4B2E2B] rounded-full text-sm font-semibold">
            {value}
          </span>
        )}
        {toggle && (
          <label
            className="relative inline-flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
          >
            <input type="checkbox" className="sr-only peer" checked={toggleValue} readOnly />
            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-[#A3B763] peer-checked:to-[#8fa054] rounded-full peer transition-all shadow-inner"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5 shadow-md"></div>
          </label>
        )}
        {!toggle && !value && (
          <ChevronRight
            size={20}
            className="text-gray-400 group-hover:text-[#A3B763] group-hover:translate-x-1 transition-all"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileHome;

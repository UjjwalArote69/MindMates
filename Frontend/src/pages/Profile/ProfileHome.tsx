import Navbar from "../../components/shared/Navbar";
import BgImage from "../../assets/Images/Profile/Profile Background Image.png";
import PersonalInfo from "../../assets/Icons/Profile Page Personal Info Icon.svg";
import EmergencyIcon from "../../assets/Icons/Emergency Contact Icon.svg";
import MoonIcon from "../../assets/Icons/Moon Icon.svg";
import InviteIcon from "../../assets/Icons/Share Invite Friends.svg";
import FeedbackIcon from "../../assets/Icons/Submit Feedback Icon.svg";
import Help from "../../assets/Icons/Help Center Icon.svg";
import GarbageIcon from "../../assets/Icons/Close Account Garbage Icon.svg";
// import LogoutIcon from "../../assets/Icons/Log Out Icon.svg";
import ForwardIcon from "../../assets/Icons/Forward Icon.svg";
import DefaultAvatar from "../../assets/Icons/User Pfp Avatar.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import LogoutButton from "./LogoutButton";
// import { logoutUser } from "../../services/user.service";

const ProfileHome = () => {
  const { user, loading, initialized } = useUserStore();
  const navigate = useNavigate();
  // const setUser = useUserStore((state) => state.setUser);

  console.log("🔍 ProfileHome Render:", { user, loading, initialized });

  // Redirect if user is not logged in
  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, initialized, navigate]);

  if (!initialized || loading) {
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

  const getProfileImage = () => user?.avatar || DefaultAvatar;

  // const logoutButton = async () => {
  //   await logout();
  //   setUser(null);
  //   navigate("/auth/login");
  // };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full h-48">
        <img
          src={BgImage}
          alt="Profile Background"
          className="w-full h-full object-cover rounded-b-[80px]"
        />
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img
              src={getProfileImage()}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-5">
        {/* User Info */}
        <div className="mt-12 flex flex-col items-center">
          <h1 className="pb-3 text-xl font-bold">{user?.name}</h1>
          <span className="text-sm bg-[#e4f0e2] text-[#3c5136] rounded-full px-3 py-1 mt-1">
            {user?.subscriptionType || "BASIC MEMBERSHIP"}
          </span>
        </div>

        {/* Age / Weight / Height */}
        <div className="mt-6 flex justify-around w-full max-w-md border-t border-b py-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">{user?.age || "N/A"}</span>
            <span className="text-sm">Age</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {user?.weight || "N/A"}
            </span>
            <span className="text-sm">Weight</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {user?.height || "N/A"}
            </span>
            <span className="text-sm">Height</span>
          </div>
        </div>
        <div className="flex flex-col w-full px-1 pb-24">
          {/* Settings Sections */}
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
            <SettingItem icon={MoonIcon} label="Dark Mode" toggle />
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
            <div
              className="flex justify-between items-center px-4 py-3 rounded-xl bg-red-100 text-red-600 font-semibold cursor-pointer"
              onClick={() => navigate("/profile/delete")}
            >
              <div className="flex items-center gap-3">
                <img
                  src={GarbageIcon}
                  alt="Close Account"
                  className="w-13 p-3 bg-red-400 rounded-xl"
                />
                <span>Close Account</span>
              </div>
              <img src={ForwardIcon} alt="Forward" className="w-6 h-6" />
            </div>
          </SettingsSection>{" "}
          {/* 👈 add pb-24 */}
          {/* ... your settings sections ... */}
          <SettingsSection title="Log Out">
            <LogoutButton/>
          </SettingsSection>
          <Navbar />
        </div>

        <Navbar />
      </div>
    </div>
  );
};

// SettingsSection component
const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="w-full max-w-md mt-6">
    <h2 className="text-sm font-bold text-[#4B2E2B] mb-2 px-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

// SettingItem component
const SettingItem = ({
  icon,
  label,
  value,
  toggle,
  route,
}: {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  route?: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!toggle && route) navigate(route);
  };
  return (
    <div
      className={`flex justify-between items-center px-4 py-3 rounded-xl bg-white shadow-sm ${
        !toggle && "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt={label}
          className="w-13 p-3 bg-gray-100 rounded-xl"
        />
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-gray-500">{value}</span>}
        {toggle && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-10 h-5 bg-gray-200 peer-checked:bg-green-500 rounded-full peer transition"></div>
            <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        )}
        {!toggle && !value && (
          <img src={ForwardIcon} alt="Forward" className="w-6 h-6" />
        )}
      </div>
    </div>
  );
};

export default ProfileHome;

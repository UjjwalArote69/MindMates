// import React from "react";
import Navbar from "../../components/shared/Navbar";
import BgImage from "../../assets/Images/Profile/Profile Background Image.png";
import Notifications from "../../assets/Icons/Notifications.svg";
import PersonalInfo from "../../assets/Icons/Profile Page Personal Info Icon.svg";
import EmergencyIcon from "../../assets/Icons/Emergency Contact Icon.svg";
import LanguageIcon from "../../assets/Icons/Language Flag Icon.svg";
import MoonIcon from "../../assets/Icons/Moon Icon.svg";
import InviteIcon from "../../assets/Icons/Share Invite Friends.svg";
import FeedbackIcon from "../../assets/Icons/Submit Feedback Icon.svg";
import SecurityIcon from "../../assets/Icons/Security Lock Icon.svg";
import Help from "../../assets/Icons/Help Center Icon.svg";
import GarbageIcon from "../../assets/Icons/Close Account Garbage Icon.svg";
import LogoutIcon from "../../assets/Icons/Log Out Icon.svg";
import ForwardIcon from "../../assets/Icons/Forward Icon.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col items-center">
      {/* Header with background image */}
      <div className="relative w-full h-48">
        <img
          src={BgImage}
          alt="Profile Background"
          className="w-full h-full object-cover rounded-b-[80px]"
        />
        {/* Profile Picture */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img
              src="/your-profile.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-[#4B2E2B] text-white p-1 rounded-full">
              ✏️
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-5">
        {/* User Info */}
        <div className="mt-16 flex flex-col items-center">
          <h1 className="text-xl font-bold">Shinomiya Kaguya</h1>
          <span className="text-sm bg-[#e4f0e2] text-[#3c5136] rounded-full px-3 py-1 mt-1">
            BASIC MEMBER
          </span>
        </div>

        {/* Age / Weight / Height */}
        <div className="mt-6 flex justify-around w-full max-w-md border-t border-b py-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">17y</span>
            <span className="text-sm">Age</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">48kg</span>
            <span className="text-sm">Weight</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">162cm</span>
            <span className="text-sm">Height</span>
          </div>
        </div>

        {/* General Settings */}
        <div className="w-full max-w-md mt-6">
          <h2 className="text-sm font-bold text-[#4B2E2B] mb-2 px-4">
            General Settings
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={PersonalInfo}
              label="Personal Information"
              route="/profile/personal-info"
            />
            <SettingItem
              icon={EmergencyIcon}
              label="Emergency Contact"
              value="15+"
              route="/profile/emergency"
            />
            <SettingItem
              icon={FeedbackIcon}
              label="Submit Feedback"
              route="/profile/feedback"
            />

            <SettingItem icon={MoonIcon} label="Dark Mode" toggle />
            <SettingItem icon={InviteIcon} label="Invite Friends" />
            {/* <SettingItem icon={FeedbackIcon} label="Submit Feedback" /> */}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="w-full max-w-md mt-6">
          <h2 className="text-sm font-bold text-[#4B2E2B] mb-2 px-4">
            Service & Privacy
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={Help}
              route="/profile/help"
              label="Help Center"
            />
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-red-100 text-red-600 font-semibold">
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
          </div>
        </div>

        

        {/* Logout */}
        <div className="w-full max-w-md mt-6 mb-20">
          <h2 className="text-sm font-bold text-[#4B2E2B] mb-2 px-4">
            Log Out
          </h2>
          <div className="space-y-3">
            <SettingItem icon={LogoutIcon} label="Log Out" />
          </div>
        </div>

        <Navbar />
      </div>
    </div>
  );
};

// Reusable setting row
const SettingItem = ({
  icon,
  label,
  value,
  toggle,
  route, // 👈 add route prop
}: {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  route?: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!toggle && route) {
      navigate(route); // 👈 redirect user
    }
  };

  return (
    <div
      className={`flex justify-between items-center px-4 py-3 rounded-xl bg-white shadow-sm ${
        !toggle && "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {/* Left side: icon + label */}
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt={label}
          className="w-13 p-3 bg-gray-100 rounded-xl"
        />
        <span className="font-medium">{label}</span>
      </div>

      {/* Right side: value / toggle / forward icon */}
      <div className="flex items-center gap-2">
        {value && <span className="text-gray-500">{value}</span>}
        {toggle && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-10 h-5 bg-gray-200 peer-checked:bg-green-500 rounded-full peer transition"></div>
            <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        )}
        {!toggle && <img src={ForwardIcon} alt="Forward" className="w-6 h-6" />}
      </div>
    </div>
  );
};

export default Profile;

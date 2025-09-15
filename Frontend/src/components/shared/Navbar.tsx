import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import HomeNotActiveIcon from "../../assets/Icons/Home Icon Not Active.svg";
import HomeActiveIcon from "../../assets/Icons/Home Icon Active.svg";
import MessageNotActiveIcon from "../../assets/Icons/Message Icon Not Active.svg";
import MessageActiveIcon from "../../assets/Icons/Message Icon Active.svg";
import ProfileNotActiveIcon from "../../assets/Icons/Profile Icon Not Active.svg";
import ProfileActiveIcon from "../../assets/Icons/Profile Icon Active.svg";
import MetricsNotActiveIcon from "../../assets/Icons/Metrics Icon Not Active.svg";
import MetricsActiveIcon from "../../assets/Icons/Metrics Icon Active.svg";
import PlusIcon from "../../assets/Icons/Plus Icon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active tab from current route
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 py-3">
      <div className="relative flex justify-between items-center py-2 bg-white rounded-full shadow-lg px-6">
        
        {/* Left Icons */}
        <div className="flex space-x-8">
          {/* Home */}
          <button onClick={() => navigate("/home")} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPath === "/home" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={currentPath === "/home" ? HomeActiveIcon : HomeNotActiveIcon}
                alt="Home"
                className="w-6 h-6"
              />
            </div>
          </button>

          {/* Chat */}
          <button onClick={() => navigate("/chat")} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPath.startsWith("/chat") ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={currentPath.startsWith("/chat") ? MessageActiveIcon : MessageNotActiveIcon}
                alt="Chat"
                className="w-6 h-6"
              />
            </div>
          </button>
        </div>

        {/* Floating Add Button */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-10">
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#9AAA6D] shadow-lg transition-transform hover:scale-105">
            <img src={PlusIcon} alt="Add" className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-8">
          {/* Stats */}
          <button onClick={() => navigate("/stats")} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPath === "/stats" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={currentPath === "/stats" ? MetricsActiveIcon : MetricsNotActiveIcon}
                alt="Stats"
                className="w-6 h-6"
              />
            </div>
          </button>

          {/* Profile */}
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPath.startsWith("/profile") ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={currentPath.startsWith("/profile") ? ProfileActiveIcon : ProfileNotActiveIcon}
                alt="Profile"
                className="w-6 h-6"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

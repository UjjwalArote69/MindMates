import React, { useState } from "react";
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
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-2 py-3 bg-amber-30">
      {/* SVG Background Curve */}
      {/* <svg
        className="absolute bottom-0 w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L0,100 L100,100 L100,0 Q75,40 50,0 Q25,40 0,0 Z"
          fill="white"
        />
      </svg> */}

      {/* Main Navbar Container */}
      <div className="relative flex justify-between items-center py-2 bg-white rounded-full shadow-lg px-6">
        {/* Left Icons */}
        <div className="flex space-x-8">
          {/* Home */}
          <button
            onClick={() => setActive("home")}
            className="flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                active === "home" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={active === "home" ? HomeActiveIcon : HomeNotActiveIcon}
                alt="Home"
                className="w-6 h-6"
              />
            </div>
          </button>

          {/* Chat */}
          <button
            onClick={() => setActive("chat")}
            className="flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                active === "chat" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={active === "chat" ? MessageActiveIcon : MessageNotActiveIcon}
                alt="Chat"
                className="w-6 h-6"
              />
            </div>
          </button>
        </div>

        {/* Floating Add Button */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-10 ">
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#9AAA6D] shadow-lg transition-transform hover:scale-105">
            <img src={PlusIcon} alt="Add" className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-8">
          {/* Stats */}
          <button
            onClick={() => setActive("stats")}
            className="flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                active === "stats" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={active === "stats" ? MetricsActiveIcon : MetricsNotActiveIcon}
                alt="Stats"
                className="w-6 h-6"
              />
            </div>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActive("profile")}
            className="flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                active === "profile" ? "bg-gray-200" : "text-gray-500"
              }`}
            >
              <img
                src={active === "profile" ? ProfileActiveIcon : ProfileNotActiveIcon}
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
// Home.tsx
// import React from "react";
import StarIcon from "../assets/Icons/Star Icon.svg";
import FourCirclesIcon from "../assets/Icons/Four Circles Icon.svg";
import HappyIcon from "../assets/Icons/Happy Icon.svg";
import SearchIcon from "../assets/Icons/Search Icon.svg";
import Navbar from "../components/shared/Navbar";
import AiReccomendation from "../components/shared/AiReccomendation";
import SwipableCards from "../components/shared/SwipableCards";
import MindfullTracker from "../components/shared/MindfullTracker";
import NotificationsIcon from "../assets/Icons/Notifications.svg";

const Home = () => {
  return (
    <div id="main" className="min-h-screen pb-20 w-full font-Lato bg-[#f6f5f2]">
      {/* Header */}
      <div className="p-4 pb-5 bg-white w-full flex flex-col gap-3 shadow-xl rounded-b-4xl">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 font-medium">{`${new Date()}`}</p>
          <div className="relative">
            {/* Notification Icon Circle */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black">
              <img src={NotificationsIcon} alt="" />
            </div>
            {/* Small dot indicator */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </div>
        </div>

        {/* Profile + Greeting */}
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/50"
            className="h-14 w-14 rounded-full border-2 border-gray-200 object-cover"
            alt="profile"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-[#3f2c22]">
              Hi, Shinomiya!
            </h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
              {/* Pro Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#e5f8e5] text-[#2f7a32] rounded-lg font-semibold text-xs">
                <img src={StarIcon} alt="star" className="w-4 h-4" />
                Pro Member
              </div>

              {/* Percentage */}
              <div className="flex items-center gap-1">
                <img src={FourCirclesIcon} alt="progress" className="w-4 h-4" />
                <span>80%</span>
              </div>

              {/* Mood */}
              <div className="flex items-center gap-1">
                <img src={HappyIcon} alt="happy" className="w-4 h-4" />
                <span>Happy</span>
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
        <SwipableCards/>
        <MindfullTracker/>
      </div>

      <Navbar />
    </div>
  );
};

export default Home;

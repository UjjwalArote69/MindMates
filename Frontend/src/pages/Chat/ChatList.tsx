// import React from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg"; // replace with your own back icon
import ChatIcon from "../../assets/Icons/Message Icon Active.svg"; // replace with your own message icon
import HappyIcon from "../../assets/Icons/Happy Icon.svg"; // replace with emoji svgs
import SadIcon from "../../assets/Icons/Sad Icon.svg";
import OverjoyedIcon from "../../assets/Icons/Very Good Sleep Icon.svg";
// import type ChatList from "./ChatList";

const chat = {
  recent: [
    {
      id: 1,
      title: "Recent Breakup, felt so...",
      total: 478,
      mood: "Sad",
      moodIcon: SadIcon,
    },
    {
      id: 2,
      title: "Shitty Teacher at Uni...",
      total: 478,
      mood: "Happy",
      moodIcon: HappyIcon,
    },
    {
      id: 3,
      title: "Just wanna stop exist...",
      total: 478,
      mood: "Overjoyed",
      moodIcon: OverjoyedIcon,
    },
  ],
  past: [
    {
      id: 4,
      title: "More Xans this Xmas...",
      total: 478,
      mood: "Sad",
      moodIcon: SadIcon,
    },
    {
      id: 5,
      title: "More Xans this Xmas...",
      total: 478,
      mood: "Sad",
      moodIcon: SadIcon,
    },
  ],
};

const ChatList = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdfaf6] flex flex-col">
      {/* Header */}
      <div className="bg-[#f97360] text-white rounded-b-3xl p-6 pb-8">
        <button className="bg-amber-0 flex items-center gap-6 ">
          <img src={BackIcon} alt="Back" className="w-6 h-6" />
          <h1 className="text-2xl font-bold ">My chat</h1>
        </button>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <img src={ChatIcon} alt="Total" className="w-5 h-5" />
            <span>1571 Total</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={ChatIcon} alt="Left" className="w-5 h-5" />
            <span>32 Left this Month</span>
          </div>
        </div>
      </div>

      {/* Recent */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            Recent ({chat.recent.length})
          </h2>
          <button className="flex items-center gap-1 text-sm border rounded-full px-3 py-1 shadow-sm">
            <span>Newest</span>
            <span>▼</span>
          </button>
        </div>
        <div className="space-y-3">
          {chat.recent.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d7e7c3] flex items-center justify-center">
                  <img src={c.moodIcon} alt={c.mood} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {c.title}
                  </h3>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{c.total} Total</span>
                    <span className="flex items-center gap-1">
                      <img src={c.moodIcon} alt="mood" className="w-4 h-4" />
                      {c.mood}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <button className="text-gray-400 text-xl">⋮</button>
            </div>
          ))}
        </div>
      </div>

      {/* Past */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Past ({chat.past.length})</h2>
          <button className="text-gray-400">⚙</button>
        </div>
        <div className="space-y-3">
          {chat.past.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d7e7c3] flex items-center justify-center">
                  <img src={c.moodIcon} alt={c.mood} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {c.title}
                  </h3>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{c.total} Total</span>
                    <span className="flex items-center gap-1">
                      <img src={c.moodIcon} alt="mood" className="w-4 h-4" />
                      {c.mood}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <button className="text-gray-400 text-xl">⋮</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;

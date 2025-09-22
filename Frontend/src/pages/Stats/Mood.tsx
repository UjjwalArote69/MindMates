import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import LeftArrow from "../../assets/Icons/Back Arrow.svg";
import RightArrow from "../../assets/Icons/Forward Icon.svg";
import HappyIcon from "../../assets/Icons/Solid Mood Happy.svg";
import NeutralIcon from "../../assets/Icons/Solid Mood Neutral.svg";
import SadIcon from "../../assets/Icons/Solid Mood Sad.svg";
import VeryHappyIcon from "../../assets/Icons/Solid Mood Overjoyed.svg";
import VerySadIcon from "../../assets/Icons/Solid Mood Very Sad.svg";

const Mood: React.FC = () => {
  const navigate = useNavigate();

  const moods = [
    { label: "Very Happy", icon: VeryHappyIcon, color: "#8BC34A" },
    { label: "Happy", icon: HappyIcon, color: "#FFD54F" },
    { label: "Neutral", icon: NeutralIcon, color: "#BCAAA4" },
    { label: "Sad", icon: SadIcon, color: "#FF8A65" },
    { label: "Very Sad", icon: VerySadIcon, color: "#E57373" },
  ];

  const [currentMood, setCurrentMood] = useState(2); // Neutral default

  const handlePrev = () => {
    setCurrentMood((prev) => (prev - 1 + moods.length) % moods.length);
  };

  const handleNext = () => {
    setCurrentMood((prev) => (prev + 1) % moods.length);
  };

  // Mood stats (Mon–Sun)
  const moodStats = [
    { day: "Mon", mood: 2, value: 40 },
    { day: "Tue", mood: 2, value: 30 },
    { day: "Wed", mood: 1, value: 60 },
    { day: "Thu", mood: 0, value: 80 },
    { day: "Fri", mood: 3, value: 50 },
    { day: "Sat", mood: 4, value: 25 },
    { day: "Sun", mood: 2, value: 35 },
  ];

  return (
    <div className="w-full h-screen bg-[#f8f5f2] flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header (same style as StatsHome) */}
        <div className="relative w-full h-72 bg-[#A5BE7C] rounded-b-3xl flex flex-col items-center justify-center text-white">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 bg-white/20 rounded-full p-2"
          >
            <img src={BackIcon} alt="Back" className="w-5 h-5" />
          </button>

          <p className="text-lg font-semibold text-white mb-2">Your Mood</p>
          <span className="absolute top-6 right-6 px-3 py-1 text-xs rounded-full bg-white/30">
            {moods[currentMood].label}
          </span>

          <div className="flex items-center mt-6 gap-6">
            <button onClick={handlePrev} className="p-2">
              <img src={LeftArrow} alt="Previous" className="w-6 h-6" />
            </button>

            <img
              src={moods[currentMood].icon}
              alt={moods[currentMood].label}
              className="w-20 h-20"
            />

            <button onClick={handleNext} className="p-2">
              <img src={RightArrow} alt="Next" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mood Statistics */}
        <div className="w-full px-8 mt-8">
          <h2 className="text-lg font-semibold text-[#4B2E2B] mb-4">
            Mood Statistics
          </h2>

          <div className="flex items-end justify-between h-48">
            {moodStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-end gap-2"
              >
                <img
                  src={moods[stat.mood].icon}
                  alt={moods[stat.mood].label}
                  className="w-6 h-6 mb-1"
                />

                <div
                  className="w-6 rounded-t-lg"
                  style={{
                    height: `${stat.value}%`,
                    backgroundColor: moods[stat.mood].color,
                  }}
                ></div>

                <p className="text-xs text-gray-600">{stat.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;

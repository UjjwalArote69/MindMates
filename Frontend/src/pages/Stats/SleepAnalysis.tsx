import React from "react";
import BackArrow from "../../assets/Icons/Back Arrow.svg"
import { useNavigate } from "react-router-dom";


const SleepAnalysis: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#EFECE8] flex flex-col items-center">
      {/* Header Section */}
      <div className="relative w-full bg-[#A98DFF] rounded-b-[50px] text-white flex flex-col items-center py-12">
        {/* Back Button */}
        <button 
        onClick={() => navigate("/stats")}
        className="absolute top-6 left-6 bg-white/20 p-3 rounded-full">
          <img src={BackArrow} alt="back" className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-medium opacity-80">Sleep Quality</h2>

        {/* Level */}
        <h1 className="text-5xl font-bold mt-4">Level 1</h1>
        <p className="mt-2 text-lg font-medium">You are Insomniac.</p>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-10 h-1 rounded-full ${
                i === 1 ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Floating + Button */}
        <button className="absolute -bottom-8 bg-[#3C2C1D] w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-3xl text-white">+</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="mt-16 w-full px-6">
        {/* Yesterday’s Sleep */}
        <h3 className="text-[#3C2C1D] font-semibold text-lg">
          Yesterday’s Sleep
        </h3>
        <div className="flex gap-4 mt-4">
          {/* Start Sleeping */}
          <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <img src="/icons/moon.svg" alt="sleep" className="w-6 h-6 mb-2" />
            <p className="text-sm text-[#3C2C1D]/70">Start Sleeping</p>
            <h4 className="font-bold text-[#3C2C1D] mt-1">23:55 PM</h4>
          </div>
          {/* Wake Up */}
          <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <img src="/icons/sun.svg" alt="wake" className="w-6 h-6 mb-2" />
            <p className="text-sm text-[#3C2C1D]/70">Wake Up</p>
            <h4 className="font-bold text-[#3C2C1D] mt-1">19:55 PM</h4>
          </div>
        </div>

        {/* Sleep Stats */}
        <h3 className="text-[#3C2C1D] font-semibold text-lg mt-8">
          Sleep Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
            >
              <p className="text-sm text-[#3C2C1D]/70">SEP 11</p>
              <h4 className="font-bold text-[#3C2C1D] mt-1">Last Sleep</h4>
              <p className="text-sm text-[#3C2C1D]/70 mt-1">19:55 PM</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SleepAnalysis;

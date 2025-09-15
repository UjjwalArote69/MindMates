import React from "react";
import { useNavigate } from "react-router-dom";
import OutOfLimitImage from "../../assets/Images/Chat/Female Sitting Crying.svg"; // replace with your actual path
import BackIcon from "../../assets/Icons/Back Arrow.svg"; // replace with your icon

const ChatLimit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between bg-[#FFEDE6]">
      {/* Top Nav */}
      <div className="w-full flex items-center justify-start p-4">
        <button onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" className="h-6 w-6" />
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={OutOfLimitImage}
          alt="Out of Tokens"
          className="max-h-[300px] object-contain"
        />
      </div>

      {/* Content */}
      <div className="w-full bg-white rounded-t-3xl p-6 text-center shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Oops, Out of Token!
        </h2>
        <p className="text-gray-600 mb-6">
          Upgrade to Premium Version for unlimited AI Therapy.
        </p>
        <button
          onClick={() => navigate("/chat/upgrade")}
          className="w-full bg-[#4A2C2A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          Go Pro, Now!
          <span>⭐</span>
        </button>
      </div>
    </div>
  );
};

export default ChatLimit;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpgradeImage from "../../assets/Images/Chat/Female Happy Sky Diving.svg"; // replace with your illustration
import BackIcon from "../../assets/Icons/Back Arrow.svg"; // replace with your back icon

const ChatUpgrade: React.FC = () => {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="h-screen w-full flex flex-col bg-[#F4F9F2]">
      {/* Top Nav */}
      <div className="w-full flex items-center justify-start p-4">
        <button onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" className="h-6 w-6" />
        </button>
      </div>

      {/* Illustration */}
      <div className="flex justify-center items-center flex-1">
        <img
          src={UpgradeImage}
          alt="Upgrade Plan"
          className="max-h-[280px] object-contain"
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl p-6 shadow-lg">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-4">
          Unlimited Chat. Go Pro.
        </h2>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className={!isMonthly ? "font-semibold text-gray-800" : "text-gray-500"}>
            Yearly
          </span>
          <button
            onClick={() => setIsMonthly(!isMonthly)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              isMonthly ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                isMonthly ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={isMonthly ? "font-semibold text-gray-800" : "text-gray-500"}>
            Monthly
          </span>
        </div>

        {/* Pricing Options */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex flex-col items-center border rounded-xl p-4 w-32 bg-gray-50">
            <span className="text-gray-800 font-semibold">Pro</span>
            <span className="text-[#6B3A2E] text-lg font-bold">$5.99/mo</span>
          </div>

          <div className="flex flex-col items-center border-2 border-green-600 rounded-xl p-4 w-36 bg-green-100">
            <span className="text-gray-800 font-semibold">Enterprise</span>
            <span className="text-green-700 text-lg font-bold">$6.99/mo</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => alert("Redirect to payment flow")}
          className="w-full bg-[#4A2C2A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          Go Pro, Now! <span>⭐</span>
        </button>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-4">
          <button>Privacy Policy</button>
          <span>•</span>
          <button>Terms & Conditions</button>
        </div>
      </div>
    </div>
  );
};

export default ChatUpgrade;

import React, { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const options = [
    { label: "PERFORMANCE", color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]" },
    { label: "BUG", color: "bg-[#f97360] text-white" },
    { label: "USER EXPERIENCE", color: "bg-[#a8c56a] text-white" },
    { label: "CRASHES", color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]" },
    { label: "LOADING", color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]" },
    { label: "SUPPORT", color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]" },
    { label: "NAVIGATION", color: "bg-[#fcd34d] text-[#4B2E2B]" },
  ];

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      {/* Header */}
      <div className="bg-[#A8C56A] rounded-b-3xl p-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")}>
            <img src={BackIcon} alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Send Feedback</h1>
        </div>
      </div>

      {/* Emoji + Question */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-16 h-16 rounded-full bg-[#f0edea] flex items-center justify-center mb-4">
          <span className="text-2xl">😐</span>
        </div>
        <h2 className="text-lg font-bold text-center px-6">
          Which of the area needs improvement?
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-5">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleOption(option.label)}
            className={`px-4 py-2 rounded-full font-semibold text-sm shadow 
              ${option.color} 
              ${selected.includes(option.label) ? "ring-2 ring-[#4B2E2B]" : ""}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-auto px-6 pb-10">
        <button className="w-full bg-[#4B2E2B] text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2">
          Submit Feedback →
        </button>
      </div>
    </div>
  );
};

export default Feedback;

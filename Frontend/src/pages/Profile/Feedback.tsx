import React, { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { submitFeedback } from "../../services/user.service";

const Feedback = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const options = [
    {
      label: "PERFORMANCE",
      color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]",
    },
    { label: "BUG", color: "bg-[#f97360] text-white" },
    { label: "USER EXPERIENCE", color: "bg-[#a8c56a] text-white" },
    {
      label: "CRASHES",
      color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]",
    },
    {
      label: "LOADING",
      color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]",
    },
    {
      label: "SUPPORT",
      color: "bg-white text-[#4B2E2B] border border-[#4B2E2B]",
    },
    { label: "NAVIGATION", color: "bg-[#fcd34d] text-[#4B2E2B]" },
  ];

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Inside handleSubmit
  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      setErrorMsg("Please enter your feedback before submitting.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await submitFeedback({
        selectedAreas: selected,
        feedback: feedbackText,
      });
      setSuccessMsg("Thank you for your feedback!");
      setSelected([]);
      setFeedbackText("");
      setTimeout(() => setSuccessMsg(""), 3000);
      console.log("Feedback response:", res);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      {/* Header */}
      <div className="bg-[#A8C56A] rounded-b-3xl p-5 shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="hover:opacity-80 transition"
          >
            <img src={BackIcon} alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Send Feedback</h1>
        </div>
      </div>

      {/* Emoji + Question */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-16 h-16 rounded-full bg-[#f0edea] flex items-center justify-center mb-4 shadow-sm">
          <span className="text-2xl">🙂</span>
        </div>
        <h2 className="text-lg font-bold text-center px-6">
          Which of the areas need improvement?
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-5">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => toggleOption(option.label)}
            className={`px-4 py-2 rounded-full font-semibold text-sm shadow-sm transition 
              ${option.color} 
              ${
                selected.includes(option.label)
                  ? "ring-2 ring-offset-1 ring-[#4B2E2B] scale-105"
                  : "hover:scale-105"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Feedback Textarea */}
      <div className="mt-8 px-6">
        <label
          htmlFor="feedback"
          className="block text-sm font-semibold mb-2 text-[#4B2E2B]"
        >
          Share your feedback in detail
        </label>
        <textarea
          id="feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={4}
          className="w-full p-4 rounded-2xl border border-[#d6d3d1] focus:ring-2 focus:ring-[#A8C56A] outline-none shadow-sm resize-none"
        />
      </div>

      {/* Error / Success Messages */}
      <div className="mt-3 px-6">
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-5 px-6 pb-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#4B2E2B] text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2 hover:bg-[#3b2320] transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Feedback →"}
        </button>
      </div>
    </div>
  );
};

export default Feedback;

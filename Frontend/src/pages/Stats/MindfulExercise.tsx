import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Icons/Back Arrow.svg"; // replace with your back arrow svg

const MindfulExercise = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  console.log(setMinutes, setSeconds);
  

  const handleStart = () => {
    alert(`Starting exercise for ${minutes} minutes ${seconds} seconds`);
    // later navigate("/exercise/start") or trigger timer logic
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f5f2] text-[#4B2E2B] flex flex-col items-center px-5 py-6">
      {/* Header */}
      <div className="w-full flex items-center gap-3 mb-10">
        <button onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Add Mindful Exercise</h1>
      </div>

      {/* Title */}
      <h2 className="text-center text-xl font-bold max-w-xs leading-snug mb-10">
        How long do you want to do breathing exercise?
      </h2>

      {/* Timer Select */}
      <div className="flex items-center gap-6 mb-12">
        {/* Minutes */}
        <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-[#A5BE7C] text-white text-3xl font-bold shadow-md">
          {minutes.toString().padStart(2, "0")}
        </div>
        {/* Seconds */}
        <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-white text-[#4B2E2B] text-3xl font-bold shadow-md">
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full max-w-xs bg-[#4B2E2B] text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg"
      >
        Start Exercise ⏱️
      </button>
    </div>
  );
};

export default MindfulExercise;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  ChevronUp,
  ChevronDown,
  Wind,
  Heart,
  Sparkles,
} from "lucide-react";

const MindfulExercise = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  // Preset durations
  const presets = [
    { label: "Quick", duration: 2, emoji: "⚡" },
    { label: "Short", duration: 5, emoji: "🌱" },
    { label: "Medium", duration: 10, emoji: "🌿" },
    { label: "Long", duration: 15, emoji: "🌳" },
  ];
  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds === 0) {
      alert("Please set a duration!");
      return;
    }
    // Navigate to active timer with duration as state
    navigate("/stats/exercise/active", { state: { duration: totalSeconds } });
  };

  const incrementMinutes = () => setMinutes((prev) => Math.min(prev + 1, 60));
  const decrementMinutes = () => setMinutes((prev) => Math.max(prev - 1, 0));
  const incrementSeconds = () => setSeconds((prev) => (prev + 5) % 60);
  const decrementSeconds = () => setSeconds((prev) => (prev - 5 + 60) % 60);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f8f5f2] via-[#e8f5e9] to-[#e3f2fd] overflow-hidden">
      {/* Decorative Floating Elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed top-40 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
      <div className="fixed bottom-20 left-1/2 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 px-6 pt-8 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white active:scale-95 transition-all"
        >
          <ChevronLeft size={24} className="text-[#4B2E2B]" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#4B2E2B]">
            Breathing Exercise
          </h1>
          <p className="text-sm text-gray-600">Find your calm</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24">
        {/* Title with Icon */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wind size={32} className="text-green-600" />
            <Heart size={28} className="text-pink-500 animate-pulse" />
            <Sparkles size={28} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#4B2E2B] max-w-xs mx-auto leading-snug">
            How long would you like to breathe mindfully?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Set your duration and let's begin
          </p>
        </div>

        {/* Time Picker */}
        <div className="relative mb-10">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/40 to-blue-200/40 rounded-3xl blur-2xl"></div>

          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="flex items-center justify-center gap-8">
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <button
                  onClick={incrementMinutes}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all mb-4"
                >
                  <ChevronUp size={24} className="text-white" />
                </button>

                <div className="w-28 h-28 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-2xl">
                  <span className="text-5xl font-bold">
                    {minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold mt-1 opacity-90">
                    Minutes
                  </span>
                </div>

                <button
                  onClick={decrementMinutes}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all mt-4"
                >
                  <ChevronDown size={24} className="text-white" />
                </button>
              </div>

              {/* Separator */}
              <div className="text-4xl font-bold text-[#4B2E2B]">:</div>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <button
                  onClick={incrementSeconds}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all mb-4"
                >
                  <ChevronUp size={24} className="text-white" />
                </button>

                <div className="w-28 h-28 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-2xl">
                  <span className="text-5xl font-bold">
                    {seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold mt-1 opacity-90">
                    Seconds
                  </span>
                </div>

                <button
                  onClick={decrementSeconds}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all mt-4"
                >
                  <ChevronDown size={24} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="w-full max-w-md mb-10">
          <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">
            Quick Select
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.duration}
                onClick={() => {
                  setMinutes(preset.duration);
                  setSeconds(0);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  minutes === preset.duration && seconds === 0
                    ? "bg-gradient-to-br from-green-400 to-blue-500 shadow-xl scale-105 ring-4 ring-white"
                    : "bg-white/80 hover:bg-white shadow-md hover:shadow-lg hover:scale-105"
                }`}
              >
                <span className="text-2xl">{preset.emoji}</span>
                <span
                  className={`text-xs font-bold ${
                    minutes === preset.duration && seconds === 0
                      ? "text-white"
                      : "text-[#4B2E2B]"
                  }`}
                >
                  {preset.label}
                </span>
                <span
                  className={`text-xs ${
                    minutes === preset.duration && seconds === 0
                      ? "text-white/90"
                      : "text-gray-600"
                  }`}
                >
                  {preset.duration}m
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={minutes === 0 && seconds === 0}
          className="w-full max-w-md bg-gradient-to-r from-[#4B2E2B] to-[#6a4a3b] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
        >
          <Play size={24} fill="white" />
          <span className="text-lg">Start Exercise</span>
        </button>

        {/* Benefits Card */}
        <div className="mt-10 w-full max-w-md bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[#4B2E2B] mb-3 flex items-center gap-2">
            <Sparkles size={20} className="text-purple-600" />
            Benefits of Breathing
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Reduces stress and anxiety</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Improves focus and clarity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Enhances emotional balance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Promotes better sleep quality</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MindfulExercise;

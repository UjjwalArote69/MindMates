import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Pause, Play, RotateCcw } from "lucide-react";

const BreathingTimer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDuration = location.state?.duration || 300; // Default 5 minutes

  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(true);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Breathing cycle (4s inhale, 4s hold, 6s exhale)
  useEffect(() => {
    if (!isRunning) return;

    const breathCycle = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === "inhale") return "hold";
        if (prev === "hold") return "exhale";
        return "inhale";
      });
    }, 4000); // Change phase every 4 seconds

    return () => clearInterval(breathCycle);
  }, [isRunning]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress
  const progress = ((initialDuration - timeLeft) / initialDuration) * 100;

  // Handle completion
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeout(() => {
        alert("🎉 Exercise completed! Well done!");
        navigate("/stats");
      }, 1000);
    }
  }, [timeLeft, navigate]);

  const handleTogglePause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTimeLeft(initialDuration);
    setIsRunning(true);
  };
  const handleClose = () => {
    if (confirm("Are you sure you want to exit?")) {
      navigate("/stats");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-4000 ${
            breathPhase === "inhale"
              ? "w-96 h-96 bg-blue-400/30"
              : breathPhase === "hold"
              ? "w-96 h-96 bg-purple-400/30"
              : "w-64 h-64 bg-pink-400/30"
          } blur-3xl`}
        ></div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all z-10"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Breathing Circle */}
        <div className="relative mb-12">
          {/* Outer Progress Ring */}
          <svg className="w-80 h-80 -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="150"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="160"
              cy="160"
              r="150"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 150}`}
              strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>

          {/* Breathing Animation Circle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl transition-all ${
              breathPhase === "inhale"
                ? "w-64 h-64 duration-4000"
                : breathPhase === "hold"
                ? "w-64 h-64 duration-4000"
                : "w-48 h-48 duration-6000"
            }`}
          >
            <span className="text-6xl font-bold text-white mb-2">{formatTime(timeLeft)}</span>
            <span className="text-lg text-white/80 capitalize">{breathPhase}</span>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-white mb-2 capitalize animate-pulse">
            {breathPhase === "inhale" && "Breathe In..."}
            {breathPhase === "hold" && "Hold..."}
            {breathPhase === "exhale" && "Breathe Out..."}
          </p>
          <p className="text-white/70">Follow the circle's rhythm</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={handleTogglePause}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-xl"
          >
            {isRunning ? (
              <Pause size={28} className="text-white" fill="white" />
            ) : (
              <Play size={28} className="text-white" fill="white" />
            )}
          </button>

          <button
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-xl"
          >
            <RotateCcw size={28} className="text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-8">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-white/70 text-sm mt-2">{Math.round(progress)}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default BreathingTimer;

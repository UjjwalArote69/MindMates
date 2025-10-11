import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Save,
  CheckCircle2,
  Droplet,
  Activity,
  Brain,
  TrendingUp,
} from "lucide-react";
import { saveDailyLog, getTodayStatus } from "../services/user.service";
import HappyIcon from "../assets/Icons/Happy.svg";
import SadIcon from "../assets/Icons/Sad Icon.svg";
import VerySadIcon from "../assets/Icons/Very Sad Icon.svg";
import NeutralIcon from "../assets/Icons/Neutral Icon.svg";
import ExcellentSleepIcon from "../assets/Icons/Very Good Sleep Icon.svg";
import GoodSleepIcon from "../assets/Icons/Good Sleep Icon.svg";
import NeutralSleepIcon from "../assets/Icons/Neutral Sleep Icon.svg";
import BadSleepIcon from "../assets/Icons/Bad Sleep Icon.svg";
import VeryBadSleepIcon from "../assets/Icons/Very Bad Sleep Icon.svg";

const DailyTracker = () => {
  const navigate = useNavigate();
  
  // Form State
  const [currentMood, setCurrentMood] = useState<string>("");
  const [sleepQuality, setSleepQuality] = useState<number>(0);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [hydration, setHydration] = useState<number>(2);
  const [activitySteps, setActivitySteps] = useState<number>(5000);
  const [activityMinutes, setActivityMinutes] = useState<number>(30);
  const [meditation, setMeditation] = useState<number>(0);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sleepOptions = [
    { value: 5, label: "Excellent", hours: "7–9h", icon: ExcellentSleepIcon, gradient: "from-green-400 to-green-600" },
    { value: 4, label: "Good", hours: "6–7h", icon: GoodSleepIcon, gradient: "from-yellow-400 to-yellow-600" },
    { value: 3, label: "Fair", hours: "5–6h", icon: NeutralSleepIcon, gradient: "from-gray-400 to-gray-600" },
    { value: 2, label: "Poor", hours: "4–5h", icon: BadSleepIcon, gradient: "from-orange-400 to-orange-600" },
    { value: 1, label: "Worst", hours: "<4h", icon: VeryBadSleepIcon, gradient: "from-red-400 to-red-600" },
  ];

  const moodOptions = [
    { label: "Happy", icon: HappyIcon, gradient: "from-green-400 to-green-600" },
    { label: "Neutral", icon: NeutralIcon, gradient: "from-yellow-400 to-yellow-600" },
    { label: "Sad", icon: SadIcon, gradient: "from-orange-400 to-orange-600" },
    { label: "Very Sad", icon: VerySadIcon, gradient: "from-red-400 to-red-600" },
  ];

  // Check if already logged today
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getTodayStatus();
        setAlreadyLogged(status.alreadyLogged);
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };
    checkStatus();
  }, []);

  const handleSave = async () => {
    if (!currentMood || !sleepQuality || !stressLevel) {
      alert("Please fill all required fields (Mood, Sleep, Stress)");
      return;
    }

    setLoading(true);
    try {
      await saveDailyLog({
        mood: currentMood,
        sleepQuality,
        sleepHours,
        stressLevel,
        hydrationLiters: hydration,
        activitySteps,
        activityMinutes,
        meditationMinutes: meditation,
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving daily log:", error);
      if (error.response?.data?.alreadyLogged) {
        setAlreadyLogged(true);
      } else {
        alert(error.response?.data?.message || "Failed to save. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (alreadyLogged) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center max-w-md">
          <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-[#493726] mb-2">
            Already Logged Today! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You've already recorded your daily wellness data. Come back tomorrow!
          </p>
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 bg-gradient-to-r from-[#A3B763] to-[#8AA84E] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center max-w-md animate-scale-in">
          <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-[#493726] mb-2">
            Saved Successfully! 🎉
          </h2>
          <p className="text-gray-600">
            Your daily wellness data has been recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] overflow-hidden pb-32">
      {/* Decorative Shapes */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] rounded-b-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={28} />
              Daily Wellness Tracker
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Log your daily wellness data
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-8 space-y-6 max-w-2xl mx-auto">
        {/* Mood */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-[#694a39] mb-4 flex items-center gap-2">
            😊 How are you feeling? *
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {moodOptions.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setCurrentMood(mood.label)}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl transition-all ${
                  currentMood === mood.label
                    ? `bg-gradient-to-br ${mood.gradient} shadow-xl scale-105 ring-4 ring-white`
                    : "bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"
                }`}
              >
                <img src={mood.icon} className="h-14" alt={mood.label} />
                <span
                  className={`font-bold ${
                    currentMood === mood.label ? "text-white" : "text-[#694a39]"
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-[#694a39] mb-4 flex items-center gap-2">
            😴 Sleep Quality *
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sleepOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSleepQuality(opt.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  sleepQuality === opt.value
                    ? `bg-gradient-to-br ${opt.gradient} shadow-xl scale-105 ring-4 ring-white`
                    : "bg-gray-50 shadow-md hover:shadow-lg hover:scale-105"
                }`}
              >
                <img src={opt.icon} alt={opt.label} className="w-12 h-12" />
                <span
                  className={`font-bold text-sm ${
                    sleepQuality === opt.value ? "text-white" : "text-[#694a39]"
                  }`}
                >
                  {opt.label}
                </span>
                <span
                  className={`text-xs ${
                    sleepQuality === opt.value ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {opt.hours}
                </span>
              </button>
            ))}
          </div>

          {/* Sleep Hours Slider */}
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-700">
              Hours Slept: {sleepHours}h
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-2"
            />
          </div>
        </div>

        {/* Stress Level */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-[#694a39] mb-4 flex items-center gap-2">
            😰 Stress Level (1-5) *
          </h2>
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradients = [
                "from-green-400 to-green-600",
                "from-yellow-400 to-yellow-600",
                "from-orange-400 to-orange-600",
                "from-red-400 to-red-600",
                "from-purple-400 to-purple-600",
              ];
              return (
                <button
                  key={num}
                  onClick={() => setStressLevel(num)}
                  className={`w-14 h-14 rounded-full font-bold text-xl transition-all shadow-lg ${
                    stressLevel === num
                      ? `bg-gradient-to-br ${gradients[num - 1]} text-white scale-110 ring-4 ring-white`
                      : "bg-gray-50 text-[#694a39] hover:scale-105"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
          {stressLevel > 0 && (
            <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              {stressLevel === 1 && "Very calm and relaxed 😌"}
              {stressLevel === 2 && "Slightly stressed 😐"}
              {stressLevel === 3 && "Moderate stress 😕"}
              {stressLevel === 4 && "High stress 😟"}
              {stressLevel === 5 && "Very high stress 😫"}
            </div>
          )}
        </div>

        {/* Optional Fields */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 space-y-4">
          <h2 className="text-xl font-bold text-[#694a39] mb-4">
            📊 Additional Metrics (Optional)
          </h2>

          {/* Hydration */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Droplet size={18} className="text-blue-500" />
              Hydration: {hydration}L
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={hydration}
              onChange={(e) => setHydration(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>

          {/* Activity */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Activity size={18} className="text-orange-500" />
              Steps: {activitySteps}
            </label>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={activitySteps}
              onChange={(e) => setActivitySteps(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Exercise: {activityMinutes} minutes
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={activityMinutes}
              onChange={(e) => setActivityMinutes(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 mt-2"
            />
          </div>

          {/* Meditation */}
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Brain size={18} className="text-purple-500" />
              Meditation: {meditation} minutes
            </label>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={meditation}
              onChange={(e) => setMeditation(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F3EF] to-transparent pointer-events-none z-20">
        <button
          onClick={handleSave}
          disabled={loading || !currentMood || !sleepQuality || !stressLevel}
          className="w-full max-w-2xl mx-auto flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all pointer-events-auto"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={24} />
              Save Today's Wellness Data
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DailyTracker;

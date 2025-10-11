import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import HappyIcon from "../../assets/Icons/Happy Icon.svg";
import StressIcon from "../../assets/Icons/Stress Level Head Icon.svg";
import SleepIcon from "../../assets/Icons/Sleep Analysis Bed Icon.svg";
import ExerciseIcon from "../../assets/Icons/Mindfull Exercise Stopwatch Icon.svg";
import Navbar from "../../components/shared/Navbar";
import { 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  Award,
  Brain,
  // Activity,
  ChevronRight,
  Calendar
} from "lucide-react";

const StatsHome = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  
  // ✅ Real Data Calculations
  const mentalHealthScore = user?.mentalHealthScore || 0;
  const currentMood = user?.currentMood || "Neutral";
  const currentStress = user?.currentStress || 3;
  const lastSleep = user?.sleepLogs && user.sleepLogs.length > 0 
    ? user.sleepLogs[user.sleepLogs.length - 1] 
    : null;
  const meditationCount = user?.meditationLogs?.length || 0;
  
  // Calculate weekly average stress
  const weeklyStress = user?.stressLogs && user.stressLogs.length > 0
    ? (user.stressLogs.slice(-7).reduce((acc, log) => acc + log.level, 0) / Math.min(7, user.stressLogs.length)).toFixed(1)
    : "N/A";

  // Calculate trend
  const calculateTrend = () => {
    if (!user?.mentalHealthScoreLogs || user.mentalHealthScoreLogs.length < 2) {
      return { value: 0, direction: "neutral" };
    }
    const recent = user.mentalHealthScoreLogs.slice(-7);
    const current = recent[recent.length - 1]?.score || 0;
    const previous = recent[recent.length - 2]?.score || 0;
    const diff = current - previous;
    return {
      value: Math.abs(diff),
      direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral"
    };
  };

  const trend = calculateTrend();
  
  // Get status based on score
  const getStatus = () => {
    if (mentalHealthScore >= 80) return { 
      text: "EXCELLENT", 
      color: "bg-green-500/20 text-green-700", 
      emoji: "🎉",
      description: "Congratulations! You are mentally healthy and on the right track."
    };
    if (mentalHealthScore >= 60) return { 
      text: "GOOD", 
      color: "bg-yellow-500/20 text-yellow-700", 
      emoji: "😊",
      description: "You're doing well! Keep maintaining your mental wellness."
    };
    if (mentalHealthScore >= 40) return { 
      text: "FAIR", 
      color: "bg-orange-500/20 text-orange-700", 
      emoji: "😐",
      description: "There's room for improvement. Consider daily mindfulness exercises."
    };
    return { 
      text: "NEEDS ATTENTION", 
      color: "bg-red-500/20 text-red-700", 
      emoji: "😰",
      description: "Please prioritize your mental health. Consider professional support."
    };
  };

  const status = getStatus();

  // Get mood recommendation
  const getMoodRecommendation = () => {
    const mood = currentMood.toLowerCase();
    if (mood.includes("happy") || mood.includes("excellent")) {
      return "Keep spreading positivity! 🌟";
    }
    if (mood.includes("sad") || mood.includes("down")) {
      return "Try meditation or talking to someone you trust.";
    }
    if (mood.includes("anxious") || mood.includes("stressed")) {
      return "Practice deep breathing exercises today.";
    }
    return "Monitor your mood regularly.";
  };

  // Get stress recommendation
  const getStressRecommendation = () => {
    if (currentStress <= 2) return "Great job managing stress! 👏";
    if (currentStress <= 3) return "Moderate stress. Take regular breaks.";
    if (currentStress <= 4) return "High stress detected. Try relaxation techniques.";
    return "Very high stress. Prioritize self-care today.";
  };

  // Get sleep recommendation
  const getSleepRecommendation = () => {
    if (!lastSleep) return "Start tracking your sleep tonight.";
    if (lastSleep.hours >= 7) return "Excellent sleep duration! Keep it up.";
    if (lastSleep.hours >= 6) return "Decent sleep. Try to get 7-8 hours.";
    return "Insufficient sleep. Aim for 7-9 hours tonight.";
  };

  // Get meditation recommendation
  const getMeditationRecommendation = () => {
    if (meditationCount === 0) return "Start your meditation journey today!";
    if (meditationCount < 7) return "Great start! Try to meditate daily.";
    if (meditationCount < 30) return "Building a good habit! Keep going.";
    return "Amazing consistency! You're a meditation pro! 🧘";
  };

  const statsCards = [
    {
      title: currentMood || "Not Tracked",
      subtitle: "Current Mood",
      description: getMoodRecommendation(),
      value: currentMood,
      icon: HappyIcon,
      route: "/stats/mood",
      color: "from-[#FCE38A]/20 to-[#F5D665]/10",
      iconBg: "bg-[#FCE38A]/30",
      borderColor: "border-[#FCE38A]/40",
    },
    {
      title: `Level ${currentStress}/5`,
      subtitle: "Stress Level",
      description: getStressRecommendation(),
      value: `Week Avg: ${weeklyStress}`,
      icon: StressIcon,
      route: "/stats/stress",
      color: "from-[#E57373]/20 to-[#EF5350]/10",
      iconBg: "bg-[#E57373]/30",
      borderColor: "border-[#E57373]/40",
    },
    {
      title: lastSleep ? `${lastSleep.hours.toFixed(1)} Hours` : "No Data",
      subtitle: "Sleep Quality",
      description: getSleepRecommendation(),
      value: lastSleep ? `Quality: ${lastSleep.quality}/5` : "",
      icon: SleepIcon,
      route: "/stats/sleep",
      color: "from-[#8676E2]/20 to-[#6F5DD3]/10",
      iconBg: "bg-[#8676E2]/30",
      borderColor: "border-[#8676E2]/40",
    },
    {
      title: `${meditationCount} Sessions`,
      subtitle: "Mindful Exercises",
      description: getMeditationRecommendation(),
      value: meditationCount > 0 ? "Keep practicing!" : "Start today",
      icon: ExerciseIcon,
      route: "/stats/meditation",
      color: "from-[#A3B763]/20 to-[#7CB47C]/10",
      iconBg: "bg-[#A3B763]/30",
      borderColor: "border-[#A3B763]/40",
    },
  ];

  // Get last update date
  const getLastUpdate = () => {
    if (user?.lastLoggedDate) {
      const date = new Date(user.lastLoggedDate);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      
      if (isToday) return "Today";
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();
      
      if (isYesterday) return "Yesterday";
      
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return "Never";
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f6f5f2] md:flex md:pl-[100px] overflow-hidden">
      {/* ✅ Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#A3B763]/15 to-[#7CB47C]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#8676E2]/12 to-[#6F5DD3]/8 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full md:max-w-[1300px] mx-auto pb-20">
        {/* ✅ IMPROVED Mobile Header */}
        <div className="md:hidden relative w-full bg-gradient-to-br from-[#A5BE7C] via-[#8AA84E] to-[#7CB47C] rounded-b-3xl shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
          
          <div className="relative z-10 px-6 pt-8 pb-12">
            {/* Back Button */}
            <button
              onClick={() => navigate("/home")}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 mb-6 hover:bg-white/30 transition-all active:scale-95"
            >
              <img src={BackIcon} alt="Back" className="w-5 h-5" />
            </button>

            {/* Score Circle */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                {/* Outer ring */}
                <div className="w-44 h-44 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {/* Inner circle */}
                  <div className="w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex flex-col items-center justify-center shadow-xl">
                    <h1 className="text-7xl font-extrabold text-white leading-none">
                      {mentalHealthScore}
                    </h1>
                    <p className="text-white/80 text-xs font-medium mt-1">out of 100</p>
                  </div>
                </div>
                {/* Spinning dashed ring */}
                <div className="absolute -inset-1 rounded-full border-4 border-white/20 border-dashed animate-spin-slow"></div>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-2">
                <Brain size={24} className="text-white" />
                <h2 className="text-2xl font-bold text-white">Mind Score</h2>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-full text-xs font-bold ${status.color} backdrop-blur-sm flex items-center gap-2 mb-3 shadow-lg`}>
                <span>{status.emoji}</span>
                <span>{status.text}</span>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm text-center max-w-[280px] mb-3">
                {status.description}
              </p>

              {/* Last Updated & Trend */}
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>Updated: {getLastUpdate()}</span>
                </div>
                {trend.direction !== "neutral" && (
                  <div className="flex items-center gap-1">
                    {trend.direction === "up" ? (
                      <TrendingUp size={14} className="text-green-300" />
                    ) : (
                      <TrendingDown size={14} className="text-red-300" />
                    )}
                    <span>{trend.value}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Desktop Hero Section */}
        <div className="hidden md:block mt-8 px-6">
          <div className="bg-gradient-to-br from-[#A5BE7C] to-[#8AA84E] rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative p-10 flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={() => navigate("/home")}
                className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all group"
              >
                <img src={BackIcon} alt="Back" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Left Side - Score */}
              <div className="flex items-center gap-8">
                <div className="relative">
                  {/* Circular progress background */}
                  <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-md flex flex-col items-center justify-center">
                      <h1 className="text-7xl font-extrabold text-white leading-none">
                        {mentalHealthScore}
                      </h1>
                      <p className="text-white/80 text-sm font-medium mt-1">/ 100</p>
                    </div>
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-full border-4 border-white/20 border-dashed animate-spin-slow"></div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Brain size={32} className="text-white" />
                    <h2 className="text-4xl font-bold text-white">Mind Score</h2>
                  </div>
                  <p className="text-white/90 text-lg max-w-md mb-4">
                    {status.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-white/80" />
                      <span className="text-white/80 text-sm">Updated: {getLastUpdate()}</span>
                    </div>
                    {trend.direction !== "neutral" && (
                      <div className="flex items-center gap-1.5 text-white/80 text-sm">
                        {trend.direction === "up" ? (
                          <TrendingUp size={18} className="text-green-300" />
                        ) : (
                          <TrendingDown size={18} className="text-red-300" />
                        )}
                        <span>{trend.value}% change</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Status Badge */}
              <div className="flex flex-col items-end gap-4">
                <div className={`px-6 py-3 rounded-full text-sm font-bold shadow-lg ${status.color} backdrop-blur-sm flex items-center gap-2`}>
                  <Award size={20} />
                  {status.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Stats Cards Grid */}
        <div className="mt-8 px-6">
          <h3 className="hidden md:block text-2xl font-bold text-[#624A35] mb-6">
            Health Metrics Overview
          </h3>
          
          {/* ✅ IMPROVED Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-4">
            {statsCards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                className={`group relative bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer overflow-hidden border ${card.borderColor}`}
              >
                {/* Decorative blob */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 ${card.iconBg} rounded-full blur-2xl opacity-40`} />
                
                <div className="relative z-10 flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${card.iconBg} rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md group-active:scale-95 transition-transform`}>
                    <img src={card.icon} alt={card.title} className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#624A35] mb-0.5">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      {card.subtitle}
                    </p>
                    {card.value && (
                      <p className="text-xs text-gray-500 mb-1">
                        {card.value}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 font-medium">
                      {card.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight 
                    size={22} 
                    className="text-[#624A35]/40 group-active:translate-x-1 transition-transform flex-shrink-0" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.route)}
                className={`group relative bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/20`}
              >
                {/* Decorative blob */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${card.iconBg} rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <img src={card.icon} alt={card.title} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#624A35]">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                    {card.value && (
                      <p className="text-gray-700 text-sm font-semibold mb-2">
                        {card.value}
                      </p>
                    )}
                    <p className="text-gray-700 text-sm mt-4 mb-3">
                      {card.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#624A35] font-medium text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default StatsHome;

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Sparkles,
  BarChart2,
  Info,
  Save,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Coffee,
  Wind,
  Brain,
} from "lucide-react";

const Stress = () => {
  const navigate = useNavigate();
  const { user, updateTodayStress } = useUserStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stressLevels = [
    {
      level: 1,
      label: "Very Calm",
      color: "#8BC34A",
      gradient: "from-green-400 to-green-600",
      emoji: "😌",
      value: 20,
      description: "Peaceful & relaxed",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      level: 2,
      label: "Calm",
      color: "#FFD54F",
      gradient: "from-yellow-400 to-yellow-600",
      emoji: "🙂",
      value: 40,
      description: "Slightly aware",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
    {
      level: 3,
      label: "Moderate",
      color: "#FF9800",
      gradient: "from-orange-400 to-orange-600",
      emoji: "😐",
      value: 60,
      description: "Noticeable stress",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      level: 4,
      label: "High",
      color: "#FF5722",
      gradient: "from-red-400 to-red-600",
      emoji: "😰",
      value: 80,
      description: "Significantly stressed",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      level: 5,
      label: "Very High",
      color: "#D32F2F",
      gradient: "from-red-600 to-red-800",
      emoji: "😱",
      value: 100,
      description: "Overwhelmed",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
  ];

  const getCurrentStressIndex = () => {
    const current = user?.currentStress || 3;
    const idx = current - 1;
    // Clamp to valid range 0 to 4
    if (idx < 0) return 0;
    if (idx >= stressLevels.length) return stressLevels.length - 1;
    return idx;
  };

  // Initialize state safely
  const [currentStress, setCurrentStress] = useState(getCurrentStressIndex());

  const safeIndex = Math.min(Math.max(currentStress, 0), stressLevels.length - 1);
  const currentStressLevel = stressLevels[safeIndex];

  const hasChanged = currentStress !== getCurrentStressIndex();

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate last 7 days with stress stats
  const stressStats = useMemo(() => {
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return {
        day: days[date.getDay()],
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        dateObj: date,
        stress: null as number | null,
        value: 0,
      };
    });

    if (!user?.stressLogs || user.stressLogs.length === 0) {
      return last7Days;
    }

    user.stressLogs.forEach((log) => {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);

      const dayIndex = last7Days.findIndex((day) => {
        const dayDate = new Date(day.dateObj);
        dayDate.setHours(0, 0, 0, 0);
        return dayDate.getTime() === logDate.getTime();
      });

      if (dayIndex !== -1) {
        const stressIndex = log.level - 1;
        if (stressIndex >= 0 && stressIndex < stressLevels.length) {
          last7Days[dayIndex].stress = stressIndex;
          last7Days[dayIndex].value = stressLevels[stressIndex].value;
        }
      }
    });

    return last7Days;
  }, [user?.stressLogs, stressLevels]);

  const weeklyAverage = useMemo(() => {
    const dataWithValues = stressStats.filter((s) => s.stress !== null);
    if (dataWithValues.length === 0) return 0;
    return Math.round(dataWithValues.reduce((sum, stat) => sum + stat.value, 0) / dataWithValues.length);
  }, [stressStats]);

  const bestDay = useMemo(() => {
    const dataWithValues = stressStats.filter((s) => s.stress !== null);
    if (dataWithValues.length === 0) return { stress: 0, day: "N/A", value: 0 };
    return dataWithValues.reduce((min, stat) => (stat.value < min.value ? stat : min));
  }, [stressStats]);

  const worstDay = useMemo(() => {
    const dataWithValues = stressStats.filter((s) => s.stress !== null);
    if (dataWithValues.length === 0) return { stress: 4, day: "N/A", value: 0 };
    return dataWithValues.reduce((max, stat) => (stat.value > max.value ? stat : max));
  }, [stressStats]);

  const trend = useMemo(() => {
    const dataWithValues = stressStats.filter((s) => s.stress !== null);
    if (dataWithValues.length < 2) return { direction: "neutral", value: 0 };

    const recentData = dataWithValues.slice(-3);
    const earlierData = dataWithValues.slice(0, 3);

    if (recentData.length === 0 || earlierData.length === 0) {
      return { direction: "neutral", value: 0 };
    }

    const recent = recentData.reduce((sum, s) => sum + s.value, 0) / recentData.length;
    const earlier = earlierData.reduce((sum, s) => sum + s.value, 0) / earlierData.length;
    const diff = recent - earlier;

    return {
      direction: diff > 5 ? "up" : diff < -5 ? "down" : "neutral",
      value: Math.abs(Math.round(diff)),
    };
  }, [stressStats]);

  const handleSaveStress = async () => {
    if (!hasChanged) return;

    setSaving(true);
    try {
      await updateTodayStress(currentStress + 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to update stress:", error);
      alert("Failed to update stress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] overflow-hidden">
      {/* Decorative Shapes */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none animate-blob"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none animate-blob-slow animation-delay-2s"></div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <CheckCircle2 size={20} />
          <span className="font-bold">Stress level updated!</span>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div
          className={`relative w-full bg-gradient-to-br ${currentStressLevel.gradient} rounded-b-3xl shadow-2xl transition-all duration-500 overflow-hidden`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>

          <div className="relative z-10 px-6 pt-8 pb-12">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 mb-6 hover:bg-white/30 transition-all active:scale-95 shadow-lg"
              type="button"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle size={28} className="text-white" />
                <h1 className="text-3xl font-bold text-white">Stress Tracker</h1>
              </div>
              <p className="text-white/90 text-sm mb-1">How stressed are you feeling?</p>
              <p className="text-white/70 text-xs">Select your current stress level</p>
            </div>

            {/* Large Emoji Display */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                <div className="relative w-32 h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-7xl animate-bounce-slow">{currentStressLevel.emoji}</span>
                </div>
              </div>

              <div className="px-6 py-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg mb-2">
                <span className="text-white font-bold text-lg">{currentStressLevel.label}</span>
              </div>

              <p className="text-white/80 text-sm">{currentStressLevel.description}</p>
            </div>

            {/* Stress Level Selector - Horizontal Pills */}
            <div className="flex items-center justify-center gap-2 px-4">
              {stressLevels.map((stress, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStress(idx)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all ${
                    currentStress === idx
                      ? "bg-white shadow-2xl scale-105 ring-4 ring-white/50"
                      : "bg-white/20 backdrop-blur-sm hover:bg-white/30 active:scale-95"
                  }`}
                  type="button"
                >
                  <span className={`text-2xl ${currentStress === idx ? "" : "opacity-70"}`}>{stress.emoji}</span>
                  <span className={`text-lg font-bold ${currentStress === idx ? "text-[#4B2E2B]" : "text-white"}`}>
                    {stress.level}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="mx-6 -mt-8 relative z-20 grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {trend.direction === "down" && <TrendingDown size={18} className="text-green-500" />}
              {trend.direction === "up" && <TrendingUp size={18} className="text-red-500" />}
              {trend.direction === "neutral" && <Minus size={18} className="text-gray-500" />}
            </div>
            <p className="text-2xl font-bold text-[#4B2E2B]">{weeklyAverage}%</p>
            <p className="text-xs text-gray-600 mt-1">Weekly Avg</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <span className="text-2xl mb-2 block">
              {bestDay.stress !== null ? stressLevels[bestDay.stress].emoji : "—"}
            </span>
            <p className="text-xs font-bold text-green-600">{bestDay.day}</p>
            <p className="text-[10px] text-gray-600 mt-1">Calmest</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <span className="text-2xl mb-2 block">
              {worstDay.stress !== null ? stressLevels[worstDay.stress].emoji : "—"}
            </span>
            <p className="text-xs font-bold text-red-600">{worstDay.day}</p>
            <p className="text-[10px] text-gray-600 mt-1">Most Stress</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="mx-6 relative z-20">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart2 size={24} className="text-[#FF5722]" />
                <h2 className="text-xl font-bold text-[#4B2E2B]">Weekly Overview</h2>
              </div>
              {trend.direction !== "neutral" && (
                <div
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    trend.direction === "down" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {trend.direction === "down" ? (
                    <TrendingDown size={16} className="text-green-600" />
                  ) : (
                    <TrendingUp size={16} className="text-red-600" />
                  )}
                  <span
                    className={`text-xs font-bold ${
                      trend.direction === "down" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trend.value}%
                  </span>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-px bg-gray-400"></div>
                ))}
              </div>

              {/* Chart bars */}
              <div className="relative flex items-end justify-between h-56 gap-2">
                {stressStats.map((stat, idx) => {
                  const todayDate = new Date();
                  todayDate.setHours(0, 0, 0, 0);
                  const statDate = new Date(stat.dateObj);
                  statDate.setHours(0, 0, 0, 0);
                  const isToday = todayDate.getTime() === statDate.getTime();
                  const hasData = stat.stress !== null;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-3 group">
                      {hasData ? (
                        <span
                          className={`text-2xl transition-all duration-300 ${
                            isToday ? "scale-125 drop-shadow-lg" : "group-hover:scale-125"
                          }`}
                        >
                          {stressLevels[stat.stress!].emoji}
                        </span>
                      ) : (
                        <div className="h-8"></div>
                      )}

                      <div className="relative w-full">
                        {hasData ? (
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 shadow-lg relative overflow-hidden cursor-pointer ${
                              isToday ? "ring-4 ring-white" : "group-hover:ring-2 group-hover:ring-white/50"
                            }`}
                            style={{
                              height: `${(stat.value / 100) * 180}px`,
                              backgroundColor: stressLevels[stat.stress!].color,
                            }}
                            onClick={() => setCurrentStress(stat.stress!)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
                            <div className="absolute top-1 left-0 right-0 text-center">
                              <span className="text-xs font-bold text-white drop-shadow">L{stat.stress! + 1}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-5 bg-gray-200 rounded-t-xl opacity-30"></div>
                        )}
                      </div>

                      <div className={`text-center ${isToday ? "text-[#FF5722] font-bold" : "text-gray-600"}`}>
                        <p className="text-xs font-semibold">{stat.day}</p>
                        <p className="text-[10px] opacity-70">{stat.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mx-6 mt-6">
          <div
            className={`bg-gradient-to-br ${currentStressLevel.bgColor} rounded-3xl p-6 shadow-lg border-2 ${currentStressLevel.bgColor} border-opacity-30`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${currentStressLevel.gradient} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}
              >
                <Brain size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#4B2E2B] mb-2 flex items-center gap-2">
                  AI Insight
                  <Sparkles size={16} className={currentStressLevel.textColor} />
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {safeIndex <= 1 ? (
                    <>
                      You're doing <span className="font-bold text-green-600">amazing</span>! Your stress levels
                      are well managed. Keep up your healthy habits! 🌟
                    </>
                  ) : safeIndex === 2 ? (
                    <>
                      Your stress is <span className="font-bold text-yellow-600">mild</span>. Perfect time to practice
                      preventive techniques like meditation. 🧘
                    </>
                  ) : safeIndex === 3 ? (
                    <>
                      Moderate stress detected. Try <span className="font-bold text-orange-600">deep breathing exercises</span>{" "}
                      or a 10-minute walk. 🚶
                    </>
                  ) : safeIndex === 4 ? (
                    <>
                      High stress levels. Please <span className="font-bold text-red-600">take a break</span> and practice relaxation
                      techniques. 💙
                    </>
                  ) : (
                    <>
                      Very high stress detected.{" "}
                      <span className="font-bold text-red-700">Reach out for support</span> - talk to someone you trust or a
                      professional. 🆘
                    </>
                  )}
                </p>
                {trend.direction === "up" && (
                  <p className="text-xs text-red-600 mt-3 font-medium flex items-center gap-1">
                    <AlertTriangle size={14} />
                    Your stress has increased {trend.value}% this week. Please prioritize self-care.
                  </p>
                )}
                {trend.direction === "down" && (
                  <p className="text-xs text-green-600 mt-3 font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Great news! Your stress decreased {trend.value}% this week. Keep it up!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Relief Techniques */}
        <div className="mx-6 mt-6 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-[#4B2E2B] mb-4 flex items-center gap-2">
              <Zap size={20} className="text-orange-500" />
              Instant Relief
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => navigate("/chat")}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg active:scale-98 transition-all group"
                type="button"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Wind size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#4B2E2B] text-sm">Breathing Exercise</p>
                  <p className="text-xs text-gray-600">4-7-8 technique: Inhale 4s, hold 7s, exhale 8s</p>
                </div>
                <ChevronLeft size={20} className="text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/meditation")}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg active:scale-98 transition-all group"
                type="button"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Brain size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#4B2E2B] text-sm">Guided Meditation</p>
                  <p className="text-xs text-gray-600">5-minute calm down session</p>
                </div>
                <ChevronLeft size={20} className="text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/exercises")}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg active:scale-98 transition-all group"
                type="button"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Coffee size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#4B2E2B] text-sm">Take a Break</p>
                  <p className="text-xs text-gray-600">Step away for 5-10 minutes</p>
                </div>
                <ChevronLeft size={20} className="text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/chat")}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl hover:shadow-lg active:scale-98 transition-all group"
                type="button"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Heart size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#4B2E2B] text-sm">Talk to AI Companion</p>
                  <p className="text-xs text-gray-600">Get personalized support instantly</p>
                </div>
                <ChevronLeft size={20} className="text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Stress Level Legend */}
        <div className="mx-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-[#4B2E2B] mb-4 flex items-center gap-2">
              <Info size={20} />
              Stress Scale Guide
            </h3>
            <div className="space-y-2">
              {stressLevels.map((stress, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStress(idx)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                    currentStress === idx
                      ? `bg-gradient-to-r ${stress.gradient} shadow-lg scale-105`
                      : `${stress.bgColor} hover:shadow-md active:scale-98`
                  }`}
                  type="button"
                >
                  <span className="text-3xl">{stress.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className={`font-bold text-sm ${currentStress === idx ? "text-white" : "text-[#4B2E2B]"}`}>
                      Level {stress.level} - {stress.label}
                    </p>
                    <p className={`text-xs ${currentStress === idx ? "text-white/80" : "text-gray-600"}`}>
                      {stress.description}
                    </p>
                  </div>
                  {currentStress === idx && <CheckCircle2 size={20} className="text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {hasChanged && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8f5f2] via-[#f8f5f2] to-transparent pointer-events-none z-30">
          <button
            onClick={handleSaveStress}
            disabled={saving}
            className={`w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 bg-gradient-to-r ${currentStressLevel.gradient} text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 active:scale-98 transition-all pointer-events-auto`}
            type="button"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={24} />
                Update Stress Level
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Stress;

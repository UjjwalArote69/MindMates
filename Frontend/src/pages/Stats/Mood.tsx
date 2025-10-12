import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Calendar, 
  Smile,
  Sparkles,
  BarChart2,
  Info,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import HappyIcon from "../../assets/Icons/Solid Mood Happy.svg";
import NeutralIcon from "../../assets/Icons/Solid Mood Neutral.svg";
import SadIcon from "../../assets/Icons/Solid Mood Sad.svg";
import VeryHappyIcon from "../../assets/Icons/Solid Mood Overjoyed.svg";
import VerySadIcon from "../../assets/Icons/Solid Mood Very Sad.svg";

const Mood = () => {
  const navigate = useNavigate();
  const { user, updateTodayMood } = useUserStore();

  const moods = [
    { 
      label: "Very Happy", 
      icon: VeryHappyIcon, 
      color: "#8BC34A", 
      gradient: "from-green-400 to-green-600", 
      emoji: "😄",
      value: 100
    },
    { 
      label: "Happy", 
      icon: HappyIcon, 
      color: "#FFD54F", 
      gradient: "from-yellow-400 to-yellow-600", 
      emoji: "😊",
      value: 75
    },
    { 
      label: "Neutral", 
      icon: NeutralIcon, 
      color: "#BCAAA4", 
      gradient: "from-gray-400 to-gray-600", 
      emoji: "😐",
      value: 50
    },
    { 
      label: "Sad", 
      icon: SadIcon, 
      color: "#FF8A65", 
      gradient: "from-orange-400 to-orange-600", 
      emoji: "😕",
      value: 30
    },
    { 
      label: "Very Sad", 
      icon: VerySadIcon, 
      color: "#E57373", 
      gradient: "from-red-400 to-red-600", 
      emoji: "😢",
      value: 10
    },
  ];

  // Helper function to check if date is today
  // const isToday = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const today = new Date();
  //   return date.toDateString() === today.toDateString();
  // };

  // Get current mood from user data
  const getCurrentMoodIndex = () => {
    const currentMood = user?.currentMood?.toLowerCase() || "neutral";
    const index = moods.findIndex(m => currentMood.includes(m.label.toLowerCase()));
    return index !== -1 ? index : 2;
  };

  const [currentMood, setCurrentMood] = useState(getCurrentMoodIndex());
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update currentMood when user data changes
  useEffect(() => {
    setCurrentMood(getCurrentMoodIndex());
  }, [user?.currentMood]);

  // Check if mood changed
  const hasChanged = currentMood !== getCurrentMoodIndex();

  // ✅ Generate mood data from ACTUAL user moodTracker
  const moodStats = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const weekData: any[] = [];

    // Create 7 days array (last 7 days)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayName = days[date.getDay()];
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Find mood entry for this specific date
      const moodEntry = user?.moodTracker?.find(entry => {
        const entryDate = new Date(entry.date).toISOString().split('T')[0];
        return entryDate === dateStr;
      });

      let moodIndex = -1; // -1 means no data
      
      if (moodEntry) {
        const moodLabel = moodEntry.mood.toLowerCase();
        moodIndex = moods.findIndex(m => moodLabel.includes(m.label.toLowerCase()));
        if (moodIndex === -1) moodIndex = 2; // Default to neutral if not found
      } else if (i === 0 && user?.currentMood) {
        // Today's data from currentMood if not in moodTracker yet
        const moodLabel = user.currentMood.toLowerCase();
        moodIndex = moods.findIndex(m => moodLabel.includes(m.label.toLowerCase()));
        if (moodIndex === -1) moodIndex = 2;
      }
      
      weekData.push({
        day: dayName,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dateStr,
        mood: moodIndex,
        value: moodIndex >= 0 ? moods[moodIndex].value : null,
        hasData: moodIndex >= 0,
        isToday: i === 0
      });
    }

    return weekData;
  }, [user?.moodTracker, user?.currentMood]);

  // Calculate statistics (only from days with data)
  const dataPoints = moodStats.filter(s => s.hasData);
  
  const weeklyAverage = useMemo(() => {
    if (dataPoints.length === 0) return null;
    return Math.round(dataPoints.reduce((sum, stat) => sum + stat.value, 0) / dataPoints.length);
  }, [dataPoints]);

  const bestDay = useMemo(() => {
    if (dataPoints.length === 0) return null;
    return dataPoints.reduce((max, stat) => stat.value > max.value ? stat : max, dataPoints[0]);
  }, [dataPoints]);

  const worstDay = useMemo(() => {
    if (dataPoints.length === 0) return null;
    return dataPoints.reduce((min, stat) => stat.value < min.value ? stat : min, dataPoints[0]);
  }, [dataPoints]);

  const trend = useMemo(() => {
    if (dataPoints.length < 2) return { direction: "neutral", value: 0 };
    
    const recentData = dataPoints.slice(-Math.min(3, dataPoints.length));
    const earlierData = dataPoints.slice(0, Math.min(3, dataPoints.length));
    
    if (earlierData.length === 0 || recentData.length === 0) {
      return { direction: "neutral", value: 0 };
    }
    
    const recent = recentData.reduce((sum, s) => sum + s.value, 0) / recentData.length;
    const earlier = earlierData.reduce((sum, s) => sum + s.value, 0) / earlierData.length;
    const diff = recent - earlier;
    
    return {
      direction: diff > 5 ? "up" : diff < -5 ? "down" : "neutral",
      value: Math.abs(Math.round(diff))
    };
  }, [dataPoints]);

  const handlePrev = () => {
    setCurrentMood((prev) => (prev - 1 + moods.length) % moods.length);
  };

  const handleNext = () => {
    setCurrentMood((prev) => (prev + 1) % moods.length);
  };

  // Save Mood Function
  const handleSaveMood = async () => {
    if (!hasChanged) return;

    setSaving(true);
    try {
      await updateTodayMood(moods[currentMood].label);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to update mood:", error);
      alert("Failed to update mood. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Check if user has any mood data
  const hasAnyData = dataPoints.length > 0;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] overflow-hidden">
      {/* Decorative Shapes */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none animate-blob"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none animate-blob-slow animation-delay-2s"></div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <CheckCircle2 size={20} />
          <span className="font-bold">Mood updated successfully!</span>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-32">
        {/* Header with Gradient */}
        <div
          className={`relative w-full min-h-80 bg-gradient-to-br ${moods[currentMood].gradient} rounded-b-3xl shadow-2xl transition-all duration-500`}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg z-10"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Current Mood Label */}
          <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm shadow-lg">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Smile size={16} />
              {moods[currentMood].label}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="pt-24 px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={28} className="text-white" />
              <h1 className="text-3xl font-bold text-white">Mood Tracker</h1>
            </div>
            <p className="text-white/90 text-sm mb-2">How are you feeling today?</p>
            <p className="text-white/70 text-xs">Swipe to select your mood</p>
          </div>

          {/* Mood Selector */}
          <div className="flex items-center justify-center gap-8 mt-10 pb-10">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <ChevronLeft size={28} className="text-white" />
            </button>

            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl"></div>
              
              {/* Mood Icon */}
              <div className="relative w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <img
                  src={moods[currentMood].icon}
                  alt={moods[currentMood].label}
                  className="w-20 h-20 animate-bounce-slow"
                />
              </div>

              {/* Emoji Badge */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl animate-scale-in">
                {moods[currentMood].emoji}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <ChevronRight size={28} className="text-white" />
            </button>
          </div>
        </div>

        {/* Stats Overview Cards - Only show if data exists */}
        {hasAnyData && (
          <div className="mx-6 -mt-8 relative z-20 grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {trend.direction === "up" && <TrendingUp size={18} className="text-green-500" />}
                {trend.direction === "down" && <TrendingDown size={18} className="text-red-500" />}
                {trend.direction === "neutral" && <Minus size={18} className="text-gray-500" />}
              </div>
              <p className="text-2xl font-bold text-[#4B2E2B]">{weeklyAverage}%</p>
              <p className="text-xs text-gray-600 mt-1">Weekly Avg</p>
            </div>

            {bestDay && (
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
                <span className="text-2xl mb-2 block">{moods[bestDay.mood].emoji}</span>
                <p className="text-xs font-bold text-green-600">{bestDay.day}</p>
                <p className="text-[10px] text-gray-600 mt-1">Best Day</p>
              </div>
            )}

            {worstDay && (
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
                <span className="text-2xl mb-2 block">{moods[worstDay.mood].emoji}</span>
                <p className="text-xs font-bold text-orange-600">{worstDay.day}</p>
                <p className="text-[10px] text-gray-600 mt-1">Needs Care</p>
              </div>
            )}
          </div>
        )}

        {/* Weekly Stats Card */}
        <div className="mx-6 relative z-20">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart2 size={24} className="text-[#A5BE7C]" />
                <h2 className="text-xl font-bold text-[#4B2E2B]">Weekly Overview</h2>
              </div>
              {hasAnyData && trend.direction !== "neutral" && (
                <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                  trend.direction === "up" ? "bg-green-100" : "bg-orange-100"
                }`}>
                  {trend.direction === "up" ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-orange-600" />
                  )}
                  <span className={`text-xs font-bold ${
                    trend.direction === "up" ? "text-green-600" : "text-orange-600"
                  }`}>
                    {trend.value}%
                  </span>
                </div>
              )}
            </div>

            {/* Chart */}
            {!hasAnyData ? (
              <div className="text-center py-16">
                <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No mood data yet</p>
                <p className="text-gray-400 text-sm mt-2">Start tracking your mood to see insights</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-px bg-gray-400"></div>
                  ))}
                </div>

                <div className="relative flex items-end justify-between h-56 gap-2">
                  {moodStats.map((stat, idx) => {
                    if (!stat.hasData) {
                      return (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center justify-end gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">?</span>
                          </div>
                          <div className="w-full h-8 rounded-t-xl bg-gray-100"></div>
                          <div className="text-center text-gray-400">
                            <p className="text-xs">{stat.day}</p>
                            <p className="text-[10px]">{stat.date}</p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end gap-3 group cursor-pointer"
                        onClick={() => setCurrentMood(stat.mood)}
                      >
                        <img
                          src={moods[stat.mood].icon}
                          alt={moods[stat.mood].label}
                          className={`w-8 h-8 transition-all duration-300 ${
                            stat.isToday ? "scale-125 drop-shadow-lg" : "group-hover:scale-125"
                          }`}
                        />

                        <div className="relative w-full">
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 shadow-lg relative overflow-hidden ${
                              stat.isToday ? "ring-4 ring-white" : "group-hover:ring-2 group-hover:ring-white/50"
                            }`}
                            style={{
                              height: `${(stat.value / 100) * 180}px`,
                              backgroundColor: moods[stat.mood].color,
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
                            <div className="absolute top-1 left-0 right-0 text-center">
                              <span className="text-xs font-bold text-white drop-shadow">
                                {stat.value}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`text-center ${stat.isToday ? "text-[#A5BE7C] font-bold" : "text-gray-600"}`}>
                          <p className="text-xs font-semibold">{stat.day}</p>
                          <p className="text-[10px] opacity-70">{stat.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Insights Card - Only show if data exists */}
        {hasAnyData && (
          <div className="mx-6 mt-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Info size={24} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#4B2E2B] mb-2">AI Insight</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {trend.direction === "up" ? (
                      <>Your mood has been <span className="font-bold text-green-600">improving</span> this week! Keep up whatever you're doing. 🌟</>
                    ) : trend.direction === "down" ? (
                      <>Your mood shows a <span className="font-bold text-orange-600">decline</span>. Consider talking to someone or practicing mindfulness. 💙</>
                    ) : (
                      <>Your mood has been <span className="font-bold text-gray-600">stable</span> this week. Remember, it's okay to have ups and downs. 🌈</>
                    )}
                  </p>
                  {bestDay && bestDay.value > 70 && (
                    <p className="text-xs text-purple-600 mt-3 font-medium">
                      💡 Try to recall what made <span className="font-bold">{bestDay.day}</span> special - you scored {bestDay.value}%!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mood Legend */}
        <div className="mx-6 mt-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-[#4B2E2B] mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Select Your Mood
            </h3>
            <div className="space-y-3">
              {moods.map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMood(idx)}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                    currentMood === idx
                      ? `bg-gradient-to-r ${mood.gradient} shadow-lg scale-105`
                      : "bg-gray-50 hover:bg-gray-100 active:scale-98"
                  }`}
                >
                  <img src={mood.icon} alt={mood.label} className="w-10 h-10" />
                  <div className="flex-1 text-left">
                    <span
                      className={`font-bold ${
                        currentMood === idx ? "text-white" : "text-[#4B2E2B]"
                      }`}
                    >
                      {mood.label}
                    </span>
                    <p className={`text-xs ${currentMood === idx ? "text-white/80" : "text-gray-500"}`}>
                      {mood.value}% positivity
                    </p>
                  </div>
                  <span className="text-2xl">{mood.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      {hasChanged && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8f5f2] via-[#f8f5f2] to-transparent pointer-events-none z-30">
          <button
            onClick={handleSaveMood}
            disabled={saving}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#A5BE7C] to-[#8AA84E] text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 active:scale-98 transition-all pointer-events-auto"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={24} />
                Update Today's Mood
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Mood;

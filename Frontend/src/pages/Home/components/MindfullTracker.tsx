import { useNavigate } from "react-router-dom";
import SleepBedIcon from "../../../assets/Icons/Sleep bed Icon.svg";
import DocumentHealthIcon from "../../../assets/Icons/Document Health Icon.svg";
import MindfullJournalIcon from "../../../assets/Icons/Mindfull Journal Icon.svg";
import StressLevelIcon from "../../../assets/Icons/Stress Level Heart Icon.svg";
import { useUserStore } from "../../../store/userStore";

const MindfullTracker = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const getStressLabel = (stress?: number): string => {
    if (stress === undefined || stress === null) return "Not tracked";
    if (stress <= 3) return "Normal";
    if (stress <= 6) return "Moderate";
    if (stress <= 8) return "High";
    return "Very High";
  };

  const getStressBars = (stress?: number): number => {
    if (!stress) return 0;
    return Math.ceil(stress / 2);
  };

  const getSleepQualityLabel = (quality?: number): string => {
    if (!quality) return "Not tracked";
    if (quality >= 8) return "Excellent";
    if (quality >= 6) return "Good";
    if (quality >= 4) return "Fair";
    return "Poor";
  };

  const latestSleepHours = user?.sleepLogs && user.sleepLogs.length > 0
    ? user.sleepLogs[user.sleepLogs.length - 1].hours
    : null;

  return (
    <div className="w-full px-4 py-8 space-y-2 -mt-4 flex flex-col justify-start gap-2 font-Lato">
      <h2 className="font-extrabold text-[#4c3729] text-2xl">
        Mindful Tracker -
      </h2>
      <div className="space-y-3">
        {/* Sleep Quality */}
        <div 
          className="w-full h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg cursor-pointer active:scale-95 transition-transform"
          onClick={() => navigate("/stats/sleep")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <img src={SleepBedIcon} alt="sleep" />
            </div>
            <div>
              <p className="font-bold text-gray-700">
                {latestSleepHours 
                  ? `${latestSleepHours.toFixed(1)}h sleep`
                  : "Not tracked"}
              </p>
              <p className="text-sm text-gray-500">
                {latestSleepHours 
                  ? `Quality: ${getSleepQualityLabel(user?.sleepQuality)}`
                  : "Track your sleep"}
              </p>
            </div>
          </div>
          {user?.sleepQuality && (
            <div className="w-7 h-7 rounded-full border-2 border-purple-600 flex items-center justify-center text-xs text-purple-600 font-bold">
              {user.sleepQuality}
            </div>
          )}
        </div>

        {/* Mindful Journal */}
        <div 
          className="w-full h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg cursor-pointer active:scale-95 transition-transform"
          onClick={() => navigate("/journal")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <img src={DocumentHealthIcon} alt="journal" />
            </div>
            <div>
              <p className="font-bold text-gray-700">Mindful Journal</p>
              <p className="text-sm text-gray-500">
                {user?.meditationLogs?.length || 0} Day Streak
              </p>
            </div>
          </div>
          <img src={MindfullJournalIcon} className="h-10" alt="journal-icon" />
        </div>

        {/* Stress Level */}
        <div 
          className="w-full h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg cursor-pointer active:scale-95 transition-transform"
          onClick={() => navigate("/stats/stress")}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <img src={StressLevelIcon} alt="stress" />
            </div>
            <div>
              <p className="font-bold text-gray-700">
                {user?.currentStress !== undefined
                  ? `Level ${user.currentStress}`
                  : "Not tracked"}
              </p>
              <p className="text-sm text-gray-500">
                {getStressLabel(user?.currentStress)}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`w-6 h-1.5 rounded-full transition-all ${
                  n <= getStressBars(user?.currentStress)
                    ? user?.currentStress && user.currentStress > 6 
                      ? "bg-red-500" 
                      : "bg-yellow-500"
                    : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Mood Tracker */}
        <div 
          className="w-full h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg cursor-pointer active:scale-95 transition-transform"
          onClick={() => navigate("/stats/mood")}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center">
              <span className="text-2xl">
                {user?.currentMood?.includes("Happy") ? "😊" :
                 user?.currentMood?.includes("Sad") ? "😔" :
                 user?.currentMood?.includes("Neutral") ? "😐" : "😊"}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-700">Mood Tracker</p>
              <p className="text-sm text-gray-500">
                {user?.currentMood || "Not set"} • {user?.moodTracker?.length || 0} logs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfullTracker;

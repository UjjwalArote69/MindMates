// import React from "react";
import SleepBedIcon from "../../../assets/Icons/Sleep bed Icon.svg";
import DocumentHealthIcon from "../../../assets/Icons/Document Health Icon.svg";
import MindfullJournalIcon from "../../../assets/Icons/Mindfull Journal Icon.svg";
import StressLevelIcon from "../../../assets/Icons/Stress Level Heart Icon.svg";

const MindfullTracker = ({ user }: { user: any }) => {
  // if (user?.sleepQuality == )

  const getStressLabel = (stress?: number): string => {
    if (stress === undefined || stress === null) return "Not tracked";
    if (stress <= 3) return "Normal";
    if (stress <= 6) return "Moderate";
    if (stress <= 8) return "High";
    return "Very High";
  };

  return (
    <>
      <div className="w-full px-4 py-8 space-y-2 -mt-4 flex flex-col justify-start gap-2 bg-amber-80 font-Lato bg-amber-20">
        <h2 className="font-extrabold text-[#4c3729] text-2xl">
          Mindful Tracker -
        </h2>
        <div className="space-y-3">
          {/* Mindful Hours */}
          {/* <div className="w-80 h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <img src={GreenClock} alt="" />
              </div>
              <div>
                <p className=" font-bold text-gray-700">Mindful Hours</p>
                <p className="text-sm text-gray-500">2.5h / 8h</p>
              </div>
            </div>
            <img src={MindfullClockIcon} className="h-10" alt="" />
          </div> */}

          {/* Sleep Quality */}
          <div className="w-80 h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <img src={SleepBedIcon} alt="" />
              </div>
              <div>
                <p className="font-bold text-gray-700">
                  {user?.sleepQuality
                    ? `${user.sleepQuality}/10`
                    : "Not tracked"}
                </p>
                <p className="text-sm text-gray-500">Insomniac (~2h Avg)</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full border-2 border-purple-600 flex items-center justify-center text-xs text-purple-600">
              1
            </div>
          </div>

          {/* Mindful Journal */}
          <div className="w-80 h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <img src={DocumentHealthIcon} alt="" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Mindful Journal</p>
                <p className="text-sm text-gray-500">64 Day Streak</p>
              </div>
            </div>
            <img src={MindfullJournalIcon} className="h-10" alt="" />
          </div>

          {/* Stress Level */}
          <div className="w-80 h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <img src={StressLevelIcon} alt="" />
              </div>
              <div>
                <p className="font-bold text-gray-700">
                  {user?.currentStress
                    ? `Level ${user?.currentStress}`
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
                  className={`w-6 h-1.5 rounded-full ${
                    n <= 3 ? "bg-yellow-500" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Mood Tracker */}
          {/* <div className="w-80 h-20 flex items-center justify-between bg-white rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600">😊</span>
              </div>
              <div>
                <p className="font-bold text-gray-700">
                  Mood Tracker
                </p>
                <p className="text-sm text-gray-500">Sad → Neutral → Happy</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MindfullTracker;

import {
  useState,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import {
  ChevronLeft,
  Moon,
  Sun,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  BarChart2,
  Info,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const SleepAnalysis = () => {
  const navigate = useNavigate();
  const { user, updateTodaySleep } =
    useUserStore();

  const sleepLevels = [
    {
      level: 1,
      label: "Insomniac",
      color: "from-red-400 to-red-600",
      desc: "< 4 hours",
      emoji: "😴",
      value: 20,
    },
    {
      level: 2,
      label: "Light Sleeper",
      color:
        "from-orange-400 to-orange-600",
      desc: "4-5 hours",
      emoji: "😪",
      value: 40,
    },
    {
      level: 3,
      label: "Moderate",
      color:
        "from-yellow-400 to-yellow-600",
      desc: "5-6 hours",
      emoji: "😐",
      value: 60,
    },
    {
      level: 4,
      label: "Good Sleeper",
      color:
        "from-blue-400 to-blue-600",
      desc: "6-7 hours",
      emoji: "😊",
      value: 80,
    },
    {
      level: 5,
      label: "Sleep Master",
      color:
        "from-purple-400 to-purple-600",
      desc: "7-9 hours",
      emoji: "😌",
      value: 100,
    },
  ];

  // Calculate sleep level from hours
  const getSleepLevel = (
    hours: number
  ) => {
    if (hours < 4) return 0;
    if (hours < 5) return 1;
    if (hours < 6) return 2;
    if (hours < 7) return 3;
    return 4;
  };

  // To determine if save button shows, compare against latest user data
  const lastSavedSleepHours = user?.sleepLogs?.length
    ? user.sleepLogs[user.sleepLogs.length - 1].hours
    : 6;

  // Initialize with safe fallback
  const initialSleepHours = user?.sleepLogs?.length
    ? user.sleepLogs[user.sleepLogs.length - 1].hours
    : 6;

  const [sleepHours, setSleepHours] = useState<number>(initialSleepHours ?? 6);
  const currentLevel =
    getSleepLevel(sleepHours);

  // Filter and process sleep logs for stats (your original code)
  const sleepStats = useMemo(() => {
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    const today = new Date();

    const last7Days = Array.from(
      { length: 7 },
      (_, i) => {
        const date = new Date(today);
        date.setDate(
          date.getDate() - (6 - i)
        );
        return {
          day: days[date.getDay()],
          date: date.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          ),
          dateObj: date,
          hours: null as number | null,
          quality: null as
            | number
            | null,
          level: null as number | null,
        };
      }
    );

    

    if (
      !user?.sleepLogs ||
      user.sleepLogs.length === 0
    )
      return last7Days;

    user.sleepLogs.forEach((log) => {
      const logDate = new Date(
        log.date
      );
      logDate.setHours(0, 0, 0, 0);
      const dayIndex =
        last7Days.findIndex((day) => {
          const dayDate = new Date(
            day.dateObj
          );
          dayDate.setHours(0, 0, 0, 0);
          return (
            dayDate.getTime() ===
            logDate.getTime()
          );
        });
      if (dayIndex !== -1) {
        last7Days[dayIndex].hours =
          log.hours;
        last7Days[dayIndex].quality =
          log.quality;
        last7Days[dayIndex].level =
          getSleepLevel(log.hours);
      }
    });

    return last7Days;
  }, [user?.sleepLogs]);

  const weeklyAverage = useMemo(() => {
    const dataWithValues =
      sleepStats.filter(
        (s) => s.hours !== null
      );
    if (!dataWithValues.length)
      return 0;
    return (
      dataWithValues.reduce(
        (sum, stat) =>
          sum + stat.hours!,
        0
      ) / dataWithValues.length
    ).toFixed(1);
  }, [sleepStats]);

  const averageQuality = useMemo(() => {
    const dataWithValues =
      sleepStats.filter(
        (s) => s.quality !== null
      );
    if (!dataWithValues.length)
      return 0;
    return Math.round(
      dataWithValues.reduce(
        (sum, stat) =>
          sum + stat.quality!,
        0
      ) / dataWithValues.length
    );
  }, [sleepStats]);

  const trend = useMemo(() => {
    const dataWithValues =
      sleepStats.filter(
        (s) => s.hours !== null
      );
    if (dataWithValues.length < 2)
      return {
        direction: "neutral",
        value: 0,
      };

    const recentData =
      dataWithValues.slice(-3);
    const earlierData =
      dataWithValues.slice(0, 3);
    if (
      recentData.length === 0 ||
      earlierData.length === 0
    )
      return {
        direction: "neutral",
        value: 0,
      };

    const recent =
      recentData.reduce(
        (sum, s) => sum + s.hours!,
        0
      ) / recentData.length;
    const earlier =
      earlierData.reduce(
        (sum, s) => sum + s.hours!,
        0
      ) / earlierData.length;
    const diff = recent - earlier;

    return {
      direction:
        diff > 0.5
          ? "up"
          : diff < -0.5
          ? "down"
          : "neutral",
      value: Math.abs(diff).toFixed(1),
    };
  }, [sleepStats]);

  const latestSleep = useMemo(() => {
    const withData = sleepStats.filter(
      (s) => s.hours !== null
    );
    return withData.length > 0
      ? withData[withData.length - 1]
      : null;
  }, [sleepStats]);

  const hasChanged =
    sleepHours !== lastSavedSleepHours;

  const [saving, setSaving] =
    useState(false);
  const [showSuccess, setShowSuccess] =
    useState(false);

  const handleSave = async () => {
    if (!hasChanged) return;

    setSaving(true);
    try {
      await updateTodaySleep(
        sleepHours
      ); // Add this method to your store: accepts hours:number
      setShowSuccess(true);
      setTimeout(
        () => setShowSuccess(false),
        2000
      );
    } catch {
      alert(
        "Failed to update sleep. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#EFECE8] to-[#e5e0dc] overflow-hidden">
      {/* Decorative Shapes */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none animate-blob" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none animate-blob-slow" />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <CheckCircle2 size={20} />
          <span className="font-bold">
            Sleep updated!
          </span>
        </div>
      )}

      <div className="relative z-10 flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div
          className={`relative w-full bg-gradient-to-br ${sleepLevels[currentLevel].color} rounded-b-[40px] shadow-2xl transition-all duration-500 overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>

          <div className="relative z-10 px-6 pt-8 pb-12">
            <button
              onClick={() =>
                navigate(-1)
              }
              className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 mb-6 hover:bg-white/30 transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft
                size={24}
                className="text-white"
              />
            </button>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Moon
                  size={28}
                  className="text-white"
                />
                <h1 className="text-3xl font-bold text-white">
                  Sleep Tracker
                </h1>
              </div>
              <p className="text-white/90 text-sm mb-1">
                Track your sleep quality
              </p>
              <p className="text-white/70 text-xs">
                Get insights for better
                rest
              </p>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                <div className="relative w-32 h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl text-7xl">
                  {
                    sleepLevels[
                      currentLevel
                    ].emoji
                  }
                </div>
              </div>

              <div className="px-6 py-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg mb-2">
                <span className="text-white font-bold text-lg">
                  {
                    sleepLevels[
                      currentLevel
                    ].label
                  }
                </span>
              </div>

              <p className="text-white/80 text-sm">
                {weeklyAverage}h average
                sleep
              </p>
            </div>

            {/* Slider or input to update sleep hours */}
            <div className="flex justify-center">
              <input
                type="range"
                min={0}
                max={12}
                step={0.25}
                value={sleepHours}
                onChange={(e) =>
                  setSleepHours(
                    parseFloat(
                      e.target.value
                    )
                  )
                }
                aria-label="Update sleep hours"
                className="w-80"
              />
              <span className="ml-4 text-white font-bold text-lg">
                {sleepHours}h
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mx-6 -mt-8 relative z-20 grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {trend.direction ===
                "up" && (
                <TrendingUp
                  size={18}
                  className="text-green-500"
                />
              )}
              {trend.direction ===
                "down" && (
                <TrendingDown
                  size={18}
                  className="text-red-500"
                />
              )}
              {trend.direction ===
                "neutral" && (
                <Minus
                  size={18}
                  className="text-gray-500"
                />
              )}
            </div>
            <p className="text-2xl font-bold text-[#3C2C1D]">
              {weeklyAverage}h
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Weekly Avg
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <Moon
              size={18}
              className="text-indigo-600 mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-[#3C2C1D]">
              {
                sleepStats.filter(
                  (s) =>
                    s.hours !== null
                ).length
              }
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Logs
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg text-center">
            <Sparkles
              size={18}
              className="text-purple-600 mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-[#3C2C1D]">
              {averageQuality}%
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Quality
            </p>
          </div>
        </div>

        {/* Latest Sleep */}
        {latestSleep && (
          <div className="mx-6 mb-6">
            <h3 className="text-lg font-bold text-[#3C2C1D] mb-4 flex items-center gap-2">
              <Clock size={20} />
              Last Night
            </h3>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center">
                      <Moon
                        size={20}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        Bedtime
                      </p>
                      <p className="text-lg font-bold text-[#3C2C1D]">
                        23:00
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sun
                        size={20}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        Wake Up
                      </p>
                      <p className="text-lg font-bold text-[#3C2C1D]">
                        {latestSleep.hours! <
                        12
                          ? `0${Math.floor(
                              latestSleep.hours! +
                                23
                            )}`
                          : Math.floor(
                              latestSleep.hours!
                            )}
                        :00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap
                      size={20}
                      className="text-purple-600"
                    />
                    <div>
                      <p className="text-xs text-gray-600">
                        Duration
                      </p>
                      <p className="text-lg font-bold text-[#3C2C1D]">
                        {
                          latestSleep.hours
                        }
                        h
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">
                      Quality
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      {
                        latestSleep.quality
                      }
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Chart */}
        <div className="mx-6 mb-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart2
                  size={24}
                  className="text-indigo-600"
                />
                <h2 className="text-xl font-bold text-[#3C2C1D]">
                  Weekly Overview
                </h2>
              </div>
              {trend.direction !==
                "neutral" && (
                <div
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    trend.direction ===
                    "up"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {trend.direction ===
                  "up" ? (
                    <TrendingUp
                      size={16}
                      className="text-green-600"
                    />
                  ) : (
                    <TrendingDown
                      size={16}
                      className="text-red-600"
                    />
                  )}
                  <span
                    className={`text-xs font-bold ${
                      trend.direction ===
                      "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {trend.value}h
                  </span>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                {[...Array(5)].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-px bg-gray-400"
                    ></div>
                  )
                )}
              </div>

              <div className="relative flex items-end justify-between h-56 gap-2">
                {sleepStats.map(
                  (stat, idx) => {
                    const todayDate =
                      new Date();
                    todayDate.setHours(
                      0,
                      0,
                      0,
                      0
                    );
                    const statDate =
                      new Date(
                        stat.dateObj
                      );
                    statDate.setHours(
                      0,
                      0,
                      0,
                      0
                    );
                    const isToday =
                      todayDate.getTime() ===
                      statDate.getTime();
                    const hasData =
                      stat.hours !==
                      null;

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end gap-3 group"
                      >
                        {hasData && (
                          <span
                            className={`text-2xl transition-all duration-300 ${
                              isToday
                                ? "scale-125 drop-shadow-lg"
                                : "group-hover:scale-125"
                            }`}
                          >
                            {
                              sleepLevels[
                                stat.level!
                              ].emoji
                            }
                          </span>
                        )}

                        <div className="relative w-full">
                          {hasData ? (
                            <div
                              className={`w-full rounded-t-xl transition-all duration-500 shadow-lg relative overflow-hidden ${
                                isToday
                                  ? "ring-4 ring-white"
                                  : "group-hover:ring-2 group-hover:ring-white/50"
                              }`}
                              style={{
                                height: `${
                                  (stat.hours! /
                                    9) *
                                  180
                                }px`,
                                background: `linear-gradient(to top, ${sleepLevels[
                                  stat.level!
                                ].color
                                  .replace(
                                    "from-",
                                    ""
                                  )
                                  .replace(
                                    " to-",
                                    ", "
                                  )})`,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30"></div>
                              <div className="absolute top-1 left-0 right-0 text-center">
                                <span className="text-xs font-bold text-white drop-shadow">
                                  {
                                    stat.hours
                                  }
                                  h
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-5 bg-gray-200 rounded-t-xl opacity-30"></div>
                          )}
                        </div>

                        <div
                          className={`text-center ${
                            isToday
                              ? "text-indigo-600 font-bold"
                              : "text-gray-600"
                          }`}
                        >
                          <p className="text-xs font-semibold">
                            {stat.day}
                          </p>
                          <p className="text-[10px] opacity-70">
                            {stat.date}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mx-6 mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Info
                  size={24}
                  className="text-white"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#3C2C1D] mb-2">
                  Sleep Insight
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentLevel >= 4 ? (
                    <>
                      You're getting{" "}
                      <span className="font-bold text-green-600">
                        excellent sleep
                      </span>
                      ! Keep maintaining
                      this routine. 🌟
                    </>
                  ) : currentLevel ===
                    3 ? (
                    <>
                      Your sleep is{" "}
                      <span className="font-bold text-yellow-600">
                        moderate
                      </span>
                      . Try adding 30
                      minutes for
                      optimal rest. 😊
                    </>
                  ) : currentLevel ===
                    2 ? (
                    <>
                      You're getting{" "}
                      <span className="font-bold text-orange-600">
                        limited sleep
                      </span>
                      . Aim for 7-9
                      hours for better
                      health. 💤
                    </>
                  ) : (
                    <>
                      You're
                      experiencing{" "}
                      <span className="font-bold text-red-600">
                        sleep
                        deprivation
                      </span>
                      . Please
                      prioritize rest
                      immediately. 🚨
                    </>
                  )}
                </p>
                {trend.direction ===
                  "up" && (
                  <p className="text-xs text-green-600 mt-3 font-medium flex items-center gap-1">
                    <CheckCircle2
                      size={14}
                    />
                    Great! Your sleep
                    increased by{" "}
                    {trend.value}h this
                    week!
                  </p>
                )}
                {trend.direction ===
                  "down" && (
                  <p className="text-xs text-red-600 mt-3 font-medium flex items-center gap-1">
                    <AlertCircle
                      size={14}
                    />
                    Your sleep decreased
                    by {trend.value}h.
                    Try going to bed
                    earlier.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Scale Guide */}
        <div className="mx-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-[#3C2C1D] mb-4 flex items-center gap-2">
              <Info size={20} />
              Sleep Quality Scale
            </h3>
            <div className="space-y-2">
              {sleepLevels.map(
                (sleep, idx) => (
                  <div
                    key={idx}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      currentLevel ===
                      idx
                        ? `bg-gradient-to-r ${sleep.color} shadow-lg`
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="text-3xl">
                      {sleep.emoji}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`font-bold text-sm ${
                          currentLevel ===
                          idx
                            ? "text-white"
                            : "text-[#3C2C1D]"
                        }`}
                      >
                        {sleep.label}
                      </p>
                      <p
                        className={`text-xs ${
                          currentLevel ===
                          idx
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        {sleep.desc}
                      </p>
                    </div>
                    {currentLevel ===
                      idx && (
                      <CheckCircle2
                        size={20}
                        className="text-white"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {hasChanged && (
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#e5e0dc] to-transparent pointer-events-none z-30">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 bg-gradient-to-r ${sleepLevels[currentLevel].color} text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 active:scale-98 pointer-events-auto transition-all`}
            >
              {saving
                ? "Saving..."
                : "Update Sleep"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepAnalysis;

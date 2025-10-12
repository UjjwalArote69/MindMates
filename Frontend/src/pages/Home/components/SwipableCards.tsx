import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import HeartIcon from "../../../assets/Icons/White Heart Icon.svg";
import SadIcon from "../../../assets/Icons/White Sad Icon.svg";
import { useUserStore } from "../../../store/userStore";

const SwipableCards = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  
  const score = user?.mentalHealthScore ?? 0;
  const mood = user?.currentMood ?? "Not set";

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Healthy";
    if (score >= 50) return "Fair";
    return "Needs Care";
  };

  // const getScoreColor = (score: number) => {
  //   if (score >= 70) return "#fff";
  //   return "#fef3c7";
  // };

  return (
    <div className="w-full px-4 py-6 space-y-6 font-Lato">
      <h2 className="font-extrabold text-[#4c3729] text-2xl">
        Mental Health Metrics -
      </h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.4}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        className="pb-6"
      >
        {/* Mental Health Score */}
        <SwiperSlide>
          <div 
            className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#95B77D] shadow-lg cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/stats")}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src={HeartIcon} alt="heart" className="w-6 h-6" />
              <span className="text-white font-semibold">Mind Score</span>
            </div>
            <div className="relative w-28 h-28 mb-4">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#fff 0deg ${
                    score * 3.6
                  }deg, #c5d1b8 ${score * 3.6}deg 360deg)`,
                }}
              />
              <div className="absolute inset-3 bg-[#95B77D] rounded-full flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="text-xs text-white/80">out of 100</span>
              </div>
            </div>
            <p className="text-white text-sm font-medium">{getScoreStatus(score)}</p>
          </div>
        </SwiperSlide>

        {/* Mood */}
        <SwiperSlide>
          <div 
            className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#F06D3A] shadow-lg cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/stats/mood")}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src={SadIcon} alt="mood" className="w-6 h-6" />
              <span className="text-white font-semibold">Current Mood</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white mb-2">{mood}</p>
              {user?.moodTracker && user.moodTracker.length > 0 && (
                <p className="text-white/80 text-xs">
                  Tracked {user.moodTracker.length} time{user.moodTracker.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </SwiperSlide>

        {/* Stress Level */}
        <SwiperSlide>
          <div 
            className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#E57373] shadow-lg cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/stats/stress")}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💓</span>
              <span className="text-white font-semibold">Stress Level</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-5xl font-bold text-white mb-2">
                {user?.currentStress ?? "N/A"}
              </p>
              <p className="text-white/80 text-sm">out of 10</p>
              {user?.stressLogs && user.stressLogs.length > 1 && (
                <div className="mt-4 flex gap-1">
                  {user.stressLogs.slice(-7).map((log, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/50 rounded-full"
                      style={{ height: `${(log.level / 10) * 40}px` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default SwipableCards;

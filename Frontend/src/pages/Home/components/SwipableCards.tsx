// SwipableCards.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HeartIcon from "../../../assets/Icons/White Heart Icon.svg";
import SadIcon from "../../../assets/Icons/White Sad Icon.svg";
import { useUserStore } from "../../../store/userStore";

const SwipableCards = () => {

  const user = useUserStore((state) => state.user)
  const score = user?.mentalHealthScore ?? 0;
  const mood = user?.currentMood ?? "Not set";

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
          <div className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#95B77D] shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <img src={HeartIcon} alt="" />
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
                <span className="text-2xl font-bold text-white">{score}</span>
                <span className="text-sm text-white">
                  {score >= 70 ? "Healthy" : "Needs Care"}
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Mood */}
        <SwiperSlide>
          <div className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#F06D3A] shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <img src={SadIcon} alt="" />
              <span className="text-white font-semibold">Mood</span>
            </div>
            <p className="text-2xl font-bold text-white mb-4">{mood}</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default SwipableCards;

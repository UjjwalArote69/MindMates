// SwipableCards.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HeartIcon from "../../assets/Icons/White Heart Icon.svg";
import SadIcon from "../../assets/Icons/White Sad Icon.svg";

const SwipableCards = () => {
  return (
    <div className="w-full px-4 py-6 space-y-6 bg-amber-20 mb-2 font-Lato">
      {/* Title */}
      <h2 className="font-extrabold text-[#4c3729] text-2xl">
        Mental Health Metrics -
      </h2>

      {/* Swiper */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.4}
        pagination={{
          clickable: true,
          el: ".custom-pagination", // attach dots to this div
        }}
        className="pb-6"
      >
        {/* Freud Score Card */}
        <SwiperSlide>
          <div className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#95B77D] shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <img src={HeartIcon} alt="" />
              <span className="text-white font-semibold ">
                Mind Score
              </span>
            </div>

            {/* Circular Progress */}
            <div className="relative w-28 h-28 mb-4">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#fff 0deg 288deg, #c5d1b8 288deg 360deg)",
                }}
              />
              <div className="absolute inset-3 bg-[#95B77D] rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">80</span>
                <span className="text-sm text-white">Healthy</span>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Mood Card */}
        <SwiperSlide>
          <div className="relative w-52 h-64 flex flex-col items-center justify-center rounded-3xl bg-[#F06D3A] shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <img src={SadIcon} alt="" />
              <span className="text-white font-semibold ">Mood</span>
            </div>

            {/* Mood Label */}
            <p className="text-2xl font-bold text-white mb-4">Sad</p>

            {/* Bars */}
            <div className="flex items-end gap-1 h-20">
              {[3, 5, 8, 12, 10, 7, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-full bg-white"
                  style={{
                    height: `${h * 4}px`,
                    opacity: i % 2 === 0 ? 0.5 : 1,
                  }}
                />
              ))}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Pagination Container (dots will render here) */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default SwipableCards;

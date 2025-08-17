// src/components/SwipableCards.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SwipableCards = () => {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-xl font-bold text-brown-900 mb-4">Mental Health Metrics</h2>
      
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        className="pb-8"
      >
        {/* Freud Score */}
        <SwiperSlide>
          <div className="bg-green-300 rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-4">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(#fff 0deg 288deg, #c5d1b8 288deg 360deg)",
                }}
              ></div>
              <div className="absolute inset-2 bg-green-300 rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">80</span>
                <span className="text-sm text-white">Healthy</span>
              </div>
            </div>
            <p className="text-white font-medium text-lg">Freud Score</p>
          </div>
        </SwiperSlide>

        {/* Mood */}
        <SwiperSlide>
          <div className="bg-orange-400 rounded-3xl p-6 flex flex-col items-center justify-center">
            <p className="text-white text-lg font-semibold mb-2">Mood</p>
            <p className="text-2xl text-white font-bold mb-4">Sad</p>
            <div className="flex items-end gap-1 h-20">
              {[4, 6, 10, 14, 12, 8, 5].map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-full bg-white"
                  style={{ height: `${h * 4}px`, opacity: i % 2 === 0 ? 0.5 : 1 }}
                ></div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* Add more cards if needed */}
        <SwiperSlide>
          <div className="bg-purple-400 rounded-3xl p-6 flex flex-col items-center justify-center">
            <p className="text-white text-lg font-semibold">More Metrics</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwipableCards;

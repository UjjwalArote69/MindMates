// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const slides = [
    { img: "/images/welcome1.png", text: "Welcome to MindMates" },
    { img: "/images/welcome2.png", text: "Your mental health matters" },
    { img: "/images/welcome3.png", text: "Get matched with experts" },
    { img: "/images/welcome4.png", text: "Track your progress" },
    { img: "/images/welcome5.png", text: "Let’s get started!" },
  ];

  return (
    <div className="h-screen bg-white">
      <Swiper
        allowTouchMove={true}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center h-full p-6">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-72 h-72 object-contain"
              />
              <p className="text-xl font-semibold mt-6">{slide.text}</p>
              {index === slides.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // localStorage.setItem("onboardingCompleted", "true");
                    navigate("/home");
                  }}
                  className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-xl"
                >
                  Get Started
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Onboarding;

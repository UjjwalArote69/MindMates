import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Onboarding = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const slides = [
    { img: "/images/welcome1.png", text: "Welcome to MindMates" },
    { img: "/images/welcome2.png", text: "Your mental health matters" },
    { img: "/images/welcome3.png", text: "Get matched with experts" },
    { img: "/images/welcome4.png", text: "Track your progress" },
    { img: "/images/welcome5.png", text: "Let’s get started!" },
  ];

  const handleSubmit = async () => {
    if (!age || !gender) {
      alert("Please enter age and select gender.");
      return;
    }
    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/onboarding`,
        { age: Number(age), gender },
        { withCredentials: true }
      );
      navigate("/home");
    } catch (error) {
      console.error("Onboarding submit error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
                <div className="mt-8 w-full max-w-xs">
                  <input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl"
                  >
                    {loading ? "Saving..." : "Get Started"}
                  </button>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Onboarding;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { onboardingData } from "../services/user.service";

import BackArrow from "../assets/Icons/Back Arrow.svg";
import MaleIcon from "../assets/Icons/Male Gender Icon.svg";
import FemaleIcon from "../assets/Icons/Female Gender Icon.svg";
import Male from "../assets/Images/Onboarding/Male.svg";
import Female from "../assets/Images/Onboarding/Female.svg";
import RightArrow from "../assets/Icons/Right Direction Arrow.svg";
import AgePage from "../assets/Images/Onboarding/AgePage.svg";
import HappyIcon from "../assets/Icons/Happy.svg";
import SadIcon from "../assets/Icons/Sad Icon.svg";
import VerySadIcon from "../assets/Icons/Very Sad Icon.svg";
import NeutralIcon from "../assets/Icons/Neutral Icon.svg";
import ExcellentSleepIcon from "../assets/Icons/Very Good Sleep Icon.svg";
import GoodSleepIcon from "../assets/Icons/Good Sleep Icon.svg";
import NuetralSleepIcon from "../assets/Icons/Neutral Sleep Icon.svg";
import BadSleepIcon from "../assets/Icons/Bad Sleep Icon.svg";
import VeryBadSleepIcon from "../assets/Icons/Very Bad Sleep Icon.svg";
import { useUserStore } from "../store/userStore";

const Onboarding = () => {
  // const [gender, setGender] = useState<"male" | "female">();
  // const [age, setAge] = useState<number>(18);

  // Additional answers
  // const [mentalHealthScore, setMentalHealthScore] = useState<string>("happy");
  // const [stressQuality, setStressQuality] = useState<string>("good");
  // const [currentMood, setCurrentMood] = useState<string>("Happy");
  // const [sleepQuality, setSleepQuality] = useState<number>(3);

  const sleepOptions = [
    {
      value: 5,
      label: "Excellent",
      hours: "7–9 hours",
      icon: ExcellentSleepIcon,
      color: "bg-green-500",
    },
    {
      value: 4,
      label: "Good",
      hours: "6–7 hours",
      icon: GoodSleepIcon,
      color: "bg-yellow-400",
    },
    {
      value: 3,
      label: "Fair",
      hours: "5 hours",
      icon: NuetralSleepIcon,
      color: "bg-gray-400",
    },
    {
      value: 2,
      label: "Poor",
      hours: "3–4 hours",
      icon: BadSleepIcon,
      color: "bg-orange-500",
    },
    {
      value: 1,
      label: "Worst",
      hours: "<3 hours",
      icon: VeryBadSleepIcon,
      color: "bg-purple-500",
    },
  ];

  const [step, setStep] = useState<number>(1); // controls flow
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const gender = useUserStore((state) => state.gender);
const setGender = useUserStore((state) => state.setGender);
const age = useUserStore((state) => state.age);
const setAge = useUserStore((state) => state.setAge);
const currentMood = useUserStore((state) => state.currentMood);
const setCurrentMood = useUserStore((state) => state.setCurrentMood);
const sleepQuality = useUserStore((state) => state.sleepQuality);
const setSleepQuality = useUserStore((state) => state.setSleepQuality);
const stressQuality = useUserStore((state) => state.stressQuality);
const setStressQuality = useUserStore((state) => state.setStressQuality);

const submitOnboarding = useUserStore((state) => state.submitOnboarding);


  const handleGenderSelect = (selected: "male" | "female") => {
    setGender(selected);
  };

  const handleData = async () => {
    if (!gender || !age) {
      console.warn("Gender and age are required");
      return;
    }

    try {
      await submitOnboarding();
      navigate("/home");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  return (
    <div className="bg-[#F7F3EF]  flex flex-col gap-10 min-h-screen font-Lato">
      {/* Header */}
      <div id="header" className="mt-5 ml-5  flex gap-5 items-center">
        <button id="back-button" onClick={prevStep}>
          <img
            src={BackArrow}
            className="bg-transparent h-8 border-2 border-[#5b5b5b] px-3 py-1 rounded-[50%]"
            alt=""
          />
        </button>
        <h2 className="font-bold text-xl text-[#694a39]">Assessment</h2>
      </div>

      {/* STEP 1: Gender */}
      {step === 1 && (
        <div className="p-5 flex gap-4 flex-col bg-amber-30">
          <h1 className="text-4xl pb-5 font-bold text-center">
            What's your official gender?
          </h1>
          <div className="flex flex-col gap-2">
            <button
              id="male"
              onClick={() => handleGenderSelect("male")}
              className={`text-start ${
                gender === "male"
                  ? "border-3 border-black"
                  : "border-2 border-[#b1b1b1]"
              } rounded-3xl overflow-clip bg-white h-32`}
            >
              <h2 className="text-xl font-bold pl-4 pt-2">I am Male</h2>
              <img src={MaleIcon} className="absolute top-80 left-10" alt="" />
              <img src={Male} className="ml-30 -mt-10" alt="" />
            </button>

            <button
              id="female"
              onClick={() => handleGenderSelect("female")}
              className={`text-start ${
                gender === "female"
                  ? "border-3 border-black"
                  : "border-2 border-[#b1b1b1]"
              } rounded-3xl overflow-clip bg-white h-32`}
            >
              <h2 className="text-xl font-bold pl-4 pt-2">I am Female</h2>
              <img
                src={FemaleIcon}
                className="absolute top-113 left-10"
                alt=""
              />
              <img src={Female} className="ml-30 -mt-15" alt="" />
            </button>

            <button
              id="continue"
              onClick={nextStep}
              disabled={!gender}
              className="flex py-3 mt-20 bg-[#694a39] justify-center gap-5 rounded-4xl disabled:opacity-50"
            >
              <h1 className="text-white text-xl">Continue</h1>
              <img src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Age */}
      {step === 2 && (
        <div className="relative w-full h-full overflow-hidden bg-amber-40">
          {/* Fullscreen Background (fixed to viewport height) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${AgePage})`,
            }}
          ></div>

          {/* Foreground Content (same spacing as gender step) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 gap-9 pb-5">
            <h1 className="text-5xl text-balance font-bold text-[#694a39]  text-center">
              How old are you?
            </h1>

            {/* Age Number Display */}
            <div className="flex items-center justify-center w-32 h-32 rounded-full shadow-lg bg-gradient-to-br from-[#e9e0ff] to-[#ae9ddb]">
              <span className="text-5xl font-bold text-[#694a39]">{age}</span>
            </div>

            {/* Slider */}
            <div className="bg-white pt-2 pb-1 w-full rounded-4xl px-4">
              <input
                type="range"
                min="12"
                max="100"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full accent-[#694a39] cursor-pointer"
              />
            </div>

            <p className="mt-2 text-white text-3xl">
              Age: <span className="font-bold">{age}</span> years
            </p>

            <button
              id="continue"
              onClick={nextStep}
              className="flex py-3  mt-10 bg-[#694a39] justify-center gap-5 rounded-4xl px-28"
            >
              <h1 className="text-white text-xl">Continue</h1>
              <img src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Current Mood */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-between h-full px-6 -mt-5 ">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-[#694a39] mb-8">
            How would you describe your current mood?
          </h1>

          {/* Mood Selection */}
          <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
            {[
              { label: "Happy", icon: HappyIcon, color: "#9bb169" },
              { label: "Neutral", icon: NeutralIcon, color: "#fece5d" },
              { label: "Sad", icon: SadIcon, color: "#fe814b" },
              { label: "Very Sad", icon: VerySadIcon, color: "#a08eff" },
            ].map((mood) => (
              <button
                key={mood.label}
                onClick={() => setCurrentMood(mood.label)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-300
            ${
              currentMood === mood.label
                ? `scale-110 shadow-xl border-[#694a39] bg-[${mood.color}]`
                : "border-gray-300 bg-white hover:scale-105 hover:shadow-md"
            }
          `}
              >
                <img src={mood.icon} className="h-12 mb-2" alt={mood.label} />
                <span className="font-semibold text-lg text-[#694a39]">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Mood Display */}
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-[#694a39]">
              I'm <span className="text-[#ff875b]">{currentMood}</span>
            </h2>
            <p className="text-center text-[#694a39] mt-2 text-lg">
              {currentMood === "Happy" && "Feeling joyful and positive! 😄"}
              {currentMood === "Neutral" && "Feeling balanced and calm 😐"}
              {currentMood === "Sad" && "Feeling a bit down 😕"}
              {currentMood === "Very Sad" && "Feeling very low 😢"}
            </p>
          </div>

          {/* Continue Button */}
          <button
            id="continue"
            onClick={nextStep}
            className="flex py-3 bg-[#694a39] justify-center gap-5 rounded-4xl px-28 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h1 className="text-white text-xl">Continue</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}

      {/* STEP 4: Sleep Quality */}
      {step === 4 && (
        <div className="flex flex-col items-center px-6 ">
          <h1 className="text-3xl font-bold text-center text-[#694a39]  mb-8">
            How would you rate <br /> your sleep quality?
          </h1>

          {/* Sleep Cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {sleepOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSleepQuality(opt.value)}
                className={`
            flex flex-col items-center justify-center gap-2 w-32 p-4 rounded-3xl border-2 transition-transform duration-300
            ${
              sleepQuality === opt.value
                ? `border-[#694a39] scale-105 shadow-lg ${opt.color}`
                : "border-gray-300 bg-white hover:scale-105"
            }
          `}
              >
                <img
                  src={opt.icon}
                  alt={opt.label}
                  className="w-12 h-12 mb-2"
                />
                <span className="font-semibold text-center">{opt.label}</span>
                <span className="text-sm text-gray-600">{opt.hours}</span>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            id="continue"
            onClick={nextStep}
            disabled={!sleepQuality}
            className="flex py-3 mt-12 mb-10 bg-[#694a39] justify-center gap-5 rounded-4xl px-28 disabled:opacity-50"
          >
            <h1 className="text-white text-xl">Continue</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}

      {/* STEP 5: Stress Level */}
      {step === 5 && (
        <div className="flex flex-col items-center justify-between h-full px-6 ">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-[#694a39] mb-6">
            How stressed are you feeling today?
          </h1>

          {/* Stress Buttons Row */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((num) => {
              const colors = [
                "#6fcf97",
                "#a0d468",
                "#ffd966",
                "#ffb74d",
                "#ff6b6b",
              ];
              return (
                <button
                  key={num}
                  onClick={() => setStressQuality(String(num))}
                  style={{
                    backgroundColor:
                      stressQuality === String(num) ? colors[num - 1] : "#fff",
                  }}
                  className={`mt-5 w-12 h-12 flex items-center justify-center rounded-full font-bold border-2
              transition-transform duration-300
              ${
                stressQuality === String(num)
                  ? "scale-120 shadow-lg text-white border-[#694a39] animate-bounce"
                  : "border-gray-300 text-[#694a39] hover:scale-110 hover:shadow-md"
              }
            `}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Central Display */}
          <div
            className="flex flex-col items-center text-center justify-center w-56 h-36 rounded-4xl shadow-lg mb-6 transition-colors duration-500"
            style={{
              background:
                stressQuality === "1"
                  ? "linear-gradient(135deg, #a8e6cf, #6fcf97)"
                  : stressQuality === "2"
                  ? "linear-gradient(135deg, #d0f0c0, #a0d468)"
                  : stressQuality === "3"
                  ? "linear-gradient(135deg, #fff2b2, #ffd966)"
                  : stressQuality === "4"
                  ? "linear-gradient(135deg, #ffcb9a, #ffb74d)"
                  : "linear-gradient(135deg, #ff9999, #ff6b6b)",
            }}
          >
            <span className="text-6xl font-bold text-[#694a39]">
              {stressQuality}
            </span>
            <span className="mt-1 text-lg text-[#694a39] font-bold ">
              {stressQuality === "1" && "Calm 😌"}
              {stressQuality === "2" && "Slightly Stressed 😐"}
              {stressQuality === "3" && "Moderate 😕"}
              {stressQuality === "4" && "Stressed 😟"}
              {stressQuality === "5" && "Extremely 😫"}
            </span>
          </div>

          {/* Description */}
          <p className="text-center text-[#694a39] font-medium mb-8 px-4">
            {stressQuality === "1" && "You are very calm and relaxed."}
            {stressQuality === "2" && "You feel a bit stressed, take it easy."}
            {stressQuality === "3" &&
              "You are moderately stressed, consider a break."}
            {stressQuality === "4" && "You are quite stressed, breathe deeply."}
            {stressQuality === "5" &&
              "You are extremely stressed out! Time to relax."}
          </p>

          {/* Continue Button */}
          <button
            id="continue"
            onClick={handleData}
            className="flex py-3 bg-[#694a39] justify-center gap-5 rounded-4xl px-28 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h1 className="text-white text-xl">Finish</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;

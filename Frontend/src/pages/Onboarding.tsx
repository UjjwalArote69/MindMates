import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingData } from "../services/user.service";

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

const Onboarding = () => {
  const [gender, setGender] = useState<"male" | "female">();
  const [age, setAge] = useState<number>(18);

  // Additional answers
  const [mentalHealthScore, setMentalHealthScore] = useState<string>("happy");
  const [stressQuality, setStressQuality] = useState<string>("good");
  const [currentMood, setCurrentMood] = useState<string>("Happy");
  const [sleepQuality, setSleepQuality] = useState<number>(3);

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

  const handleGenderSelect = (selected: "male" | "female") => {
    setGender(selected);
  };

  const handleData = async () => {
    if (!gender || !age) {
      console.warn("Gender and age are required");
      return;
    }

    try {
      const res = await onboardingData({
        age,
        gender,
        currentMood,
        sleepQuality,
        currentStress: Number(stressQuality), // since it's stored as string
        mentalHealthScore: 50, // placeholder, we can calculate later
        subscriptionType: "free",
      });
      console.log("Onboarding saved:", res);
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
        <div className="p-5 flex gap-4 flex-col bg-amber-300">
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
        <div className="relative w-full h-full overflow-hidden bg-amber-400">
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
        <div className="flex flex-col items-center bg-amber-500 p-5">
          <h1 className="text-4xl -mt-4 font-bold text-center text-balance">
            How would you describe your current mood ?
          </h1>

          <div className="mt-5 flex flex-col gap-3">
            <div id="first" className="flex bg-amber-0 gap-3">
              <button onClick={() => setCurrentMood("Happy")}>
                <div
                  id="happy"
                  className="bg-[#9bb169] p-8  border-2 border-black rounded-2xl"
                >
                  <img src={HappyIcon} className="h-12" alt="" />
                </div>
              </button>
              <button onClick={() => setCurrentMood("Neutral")}>
                <div
                  id="neutral"
                  className="bg-[#fece5d] bg-amber-80 p-8  border-2 border-black rounded-2xl"
                >
                  <img src={NeutralIcon} className="h-12" alt="" />
                </div>
              </button>
            </div>
            <div id="second" className="flex bg-amber-60 gap-3">
              <button onClick={() => setCurrentMood("Sad")}>
                <div
                  id="sad"
                  className="bg-[#fe814b] bg-amber-20 p-8  border-2 border-black rounded-2xl"
                >
                  <img src={SadIcon} className="h-12" alt="" />
                </div>
              </button>
              <button onClick={() => setCurrentMood("Very Sad")}>
                <div
                  id="very sad"
                  className="bg-[#a08eff] p-8 border-2 border-black rounded-2xl"
                >
                  <img src={VerySadIcon} className="h-12" alt="" />
                </div>
              </button>
            </div>
          </div>

          <h1 className="pt-8 text-3xl">
            I'm <span className="font-bold">{currentMood}</span>
          </h1>

          <button
            id="continue"
            onClick={nextStep}
            className="flex py-3 mt-8 bg-[#694a39] justify-center gap-5 rounded-4xl px-28"
          >
            <h1 className="text-white text-xl">Continue</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}

      {/* STEP 4: Sleep Quality */}
      {step === 4 && (
        <div className="flex flex-col items-center px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-[#694a39] mt-10 mb-8">
            How would you rate <br /> your sleep quality?
          </h1>

          <div className="flex justify-center gap-6">
            {/* Labels + Icons */}
            <div className="flex flex-col justify-between h-[350px] py-2">
              {sleepOptions.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <span
                    className={`font-bold ${
                      sleepQuality === opt.value
                        ? "text-[#694a39]"
                        : "text-gray-500"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="text-sm text-gray-500">{opt.hours}</span>
                  <img src={opt.icon} alt={opt.label} className="h-7 w-7" />
                </div>
              ))}
            </div>

            {/* Vertical Slider */}
            <div className="relative h-[350px] flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                className="absolute left-1/2 -translate-x-1/2 h-[350px] w-2 appearance-none cursor-pointer bg-transparent"
                style={{
                  writingMode: "horizontal-tb",
                  WebkitAppearance: "slider-vertical",
                }}
              />

              {/* Track */}
              <div className="absolute w-2 h-full bg-gray-200 rounded-full"></div>

              {/* Progress */}
              <div
                className={`absolute bottom-0 w-2 rounded-full transition-all duration-300 ${
                  sleepOptions.find((o) => o.value === sleepQuality)?.color
                }`}
                style={{ height: `${(sleepQuality / 5) * 100}%` }}
              ></div>

              {/* Thumb */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                  sleepOptions.find((o) => o.value === sleepQuality)?.color
                }`}
                style={{
                  bottom: `${((sleepQuality - 1) / 4) * 100}%`,
                  width: "45px",
                  height: "45px",
                }}
              ></div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            id="continue"
            onClick={nextStep}
            className="flex py-3 mt-12 bg-[#694a39] justify-center gap-5 rounded-4xl px-28"
          >
            <h1 className="text-white text-xl">Continue</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}

      {/* STEP 5: Stress Level */}
      {step === 5 && (
        <div className="flex flex-col items-center px-6 py-10">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-[#694a39] mb-10">
            How would you rate <br /> your stress level?
          </h1>

          {/* Stress Number */}
          <div className="text-[100px] font-bold text-[#694a39]">
            {stressQuality}
          </div>

          {/* Circles 1–5 */}
          <div className="flex gap-4 mt-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setStressQuality(String(num))}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold transition ${
                  stressQuality === String(num)
                    ? "bg-[#ff875b] border-[#ff875b] text-white scale-110"
                    : "bg-white border-gray-400 text-[#694a39]"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Label */}
          <p className="mt-6 text-lg text-[#694a39] font-medium">
            {stressQuality === "1" && "You are very calm."}
            {stressQuality === "2" && "You feel a bit stressed."}
            {stressQuality === "3" && "You are moderately stressed."}
            {stressQuality === "4" && "You are quite stressed."}
            {stressQuality === "5" && "You are extremely stressed out."}
          </p>

          {/* Continue */}
          <button
            id="continue"
            onClick={handleData}
            className="flex py-3 mt-12 bg-[#694a39] justify-center gap-5 rounded-4xl px-28"
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

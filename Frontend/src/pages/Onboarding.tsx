import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { onboardingData } from "../services/user.service";

const Onboarding = () => {
  const [gender, setGender] = useState<"male" | "female">();
  const [age, setAge] = useState<number>(18);

  // Additional answers
  const [mentalHealthScore, setMentalHealthScore] = useState<string>("happy");
  const [stressQuality, setStressQuality] = useState<string>("good");
  const [currentMood, setCurrentMood] = useState<string>("happy");
  const [sleepQuality, setSleepQuality] = useState<number>(8);

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
      const res = await onboardingData({ age, gender });
      console.log("Onboarding saved:", res);
      navigate("/home");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  return (
    <div className="bg-[#F7F3EF]  flex flex-col gap-10 min-h-screen font-Lato">
      {/* Header */}
      <div id="header" className="mt-5 ml-5 flex gap-5 items-center">
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
          <h1 className="text-4xl font-bold text-center text-balance">
            How would you describe your current mood ?
          </h1>

          <div className="mt-5 flex flex-col gap-3">
            <div id="first" className="flex bg-amber-0 gap-3">
            <div id="happy" className="bg-[#9bb169] p-8  border-2 border-black rounded-2xl">
              <img src={HappyIcon} className="h-12" alt="" />
            </div>
            <div id="neutral" className="bg-[#fece5d] bg-amber-80 p-8  border-2 border-black rounded-2xl">
              <img src={NeutralIcon} className="h-12" alt="" />
            </div>
          </div>
          <div id="second" className="flex bg-amber-60 gap-3">
            <div id="sad" className="bg-[#fe814b] bg-amber-20 p-8  border-2 border-black rounded-2xl">
              <img src={SadIcon} className="h-12" alt="" />
            </div>
            <div id="very sad" className="bg-[#a08eff] p-8 border-2 border-black rounded-2xl">
              <img src={VerySadIcon} className="h-12" alt="" />
            </div>
          </div>
          </div>

          <h1 className="text-xl">I'm {currentMood}</h1>

          <button
            id="continue"
            onClick={nextStep}
            className="flex py-3 bg-[#694a39] justify-center gap-5 rounded-4xl px-28"
          >
            <h1 className="text-white text-xl">Continue</h1>
            <img src={RightArrow} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;

// import React from 'react'
import { useState } from "react";
import BackArrow from "../assets/Icons/Back Arrow.svg";
import MaleIcon from "../assets/Icons/Male Gender Icon.svg";
import FemaleIcon from "../assets/Icons/Female Gender Icon.svg";
import Male from "../assets/Images/Onboarding/Male.svg";
import Female from "../assets/Images/Onboarding/Female.svg";
import RightArrow from "../assets/Icons/Right Direction Arrow.svg";
import AgePage from "../assets/Images/Onboarding/AgePage.svg";
import { useNavigate } from "react-router-dom";
import { onboardingData } from "../services/user.service";
// import { number } from "motion/react";

const Onboarding = () => {
  const [gender, setGender] = useState<"male" | "female">();
  const [genderChecked, setGenderChecked] = useState<boolean>(false);
  const [age, setAge] = useState<number>(18);
  // const [ageChecked, setAgeChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const data = { age, gender: gender ?? "" };

  const handleGenderSelect = (selected: "male" | "female") => {
    setGender(selected);
  };


  const handleBack = () => {
    if (!genderChecked) {
      navigate("/register");
    } else {
      setGenderChecked(false);
    }
  }

  const handleData = async () => {
    if (!gender || !age) {
      console.warn("Gender and age are required");
      return;
    }

    try {
      const res = await onboardingData({ age, gender});
      console.log("Onboarding saved:", res);
      navigate("/home");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      
    }
  }

  return (
    <div
      className={`${
        !genderChecked ? "bg-[#F7F3EF] p-8" : "bg-[#e9e0ff]"
      }  flex flex-col gap-10 min-h-screen font-Lato`}
    >
      <div 
        
        id="header"
        className={`${
          genderChecked ? "mt-8 ml-8" : ""
        } flex gap-5 items-center bg-amber-00`}
      >
        <button id="back-button" onClick={handleBack}>
          <img
            src={BackArrow}
            className="bg-transparent h-8 border-2 border-[#5b5b5b] px-3 py-1 rounded-[50%]"
            alt=""
          />
        </button>
        <h2 className="font-bold text-xl text-[#694a39]">Assesment</h2>
      </div>

      {!genderChecked && (
        <div
          id="body"
          className={`flex gap-4 flex-col bg-amber-10 bg-amber-20`}
        >
          <h1 className="text-4xl pb-5 font-bold text-balance text-center">
            What's your official gender ?
          </h1>
          <div className="flex flex-col gap-2 pb-0">
            <button
              id="male"
              onClick={() => handleGenderSelect("male")}
              className={`text-start ${
                gender === "male"
                  ? "border-3 border-rounded-3xl border-black"
                  : "border-2 border-[#b1b1b1]"
              } rounded-3xl overflow-clip bg-white h-32`}
            >
              <div
                id="male"
                className="h-32 overflow-clip  bg-white border-2 border-[#b1b1b1] rounded-3xl"
              >
                <h2 className="text-xl font-bold pl-4 pt-2">I am Male</h2>
                <img
                  src={MaleIcon}
                  className="absolute top-65 left-12"
                  alt=""
                />
                <img src={Male} className="ml-30 -mt-10" alt="" />
              </div>
            </button>

            <button
              id="female"
              onClick={() => handleGenderSelect("female")}
              className={`text-start  ${
                gender === "female"
                  ? "border-3 border-rounded-3xl border-black"
                  : "border-2 border-[#b1b1b1]"
              } rounded-3xl overflow-clip bg-white h-32 `}
            >
              <div
                id="female"
                className="h-32 overflow-clip  bg-white border-2 border-[#b1b1b1] rounded-3xl"
              >
                <h2 className="text-xl font-bold pl-4 pt-2">I am Female</h2>
                <img
                  src={FemaleIcon}
                  className="absolute top-98 left-12"
                  alt=""
                />
                <img src={Female} className="ml-30 -mt-15" alt="" />
              </div>
            </button>

            <button
              id="continue"
              onClick={() => {
                setGenderChecked(true);
              }}
              className="flex py-3 mt-20 bg-[#694a39] justify-center gap-5 rounded-4xl"
            >
              <h1 className="text-white text-xl">Continue</h1>
              <img src={RightArrow} className="" alt="" />
            </button>
          </div>
        </div>
      )}

      {genderChecked && (
        <div className="relative w-full min-h-screen font-Lato flex flex-col items-center p-6">
          {/* Blurred Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${AgePage})`,
              filter: "blur(4px) scale(1.05)",
            }}
          ></div>

          {/* Foreground Content */}
          <div className="relative bg-amber-30 z-10 w-full flex flex-col  gap-7  items-center">
            <h1 className="text-5xl text-balance font-bold text-[#694a39]  text-center">
              How old are you?
            </h1>

            {/* Age Number Display */}
            <div className="flex items-center justify-center w-32 h-32 rounded-full shadow-lg bg-gradient-to-br from-[#e9e0ff] to-[#ae9ddb]">
              <span className="text-5xl font-bold text-[#694a39]">{age}</span>
            </div>

            {/* Slider */}
            <div className=" bg-white pt-2 pb-1 w-full rounded-4xl px-4">
              <input
                type="range"
                min="12"
                max="100"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full  accent-[#694a39] cursor-pointer"
              />
            </div>

            {/* Age Label */}
            <p className="mt-4 text-[#5b5b5b] text-lg">
              Age: <span className="font-bold">{age}</span> years
            </p>

            {/* Continue Button */}
            <button
              id="continue"
              onClick={handleData}
              className="flex py-3 px-25 mt-10 bg-[#694a39] justify-center gap-5 rounded-4xl"
            >
              <h1 className="text-white text-xl">Continue</h1>
              <img src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Onboarding;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Weight, Ruler } from "lucide-react";

// import BackArrow from "../assets/Icons/Back Arrow.svg";
// import MaleIcon from "../assets/Icons/Male Gender Icon.svg";
// import FemaleIcon from "../assets/Icons/Female Gender Icon.svg";
import Male from "../assets/Images/Onboarding/Male.svg";
import Female from "../assets/Images/Onboarding/Female.svg";
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
  const sleepOptions = [
    { value: 5, label: "Excellent", hours: "7–9 hours", icon: ExcellentSleepIcon, gradient: "from-green-400 to-green-600" },
    { value: 4, label: "Good", hours: "6–7 hours", icon: GoodSleepIcon, gradient: "from-yellow-400 to-yellow-600" },
    { value: 3, label: "Fair", hours: "5 hours", icon: NuetralSleepIcon, gradient: "from-gray-400 to-gray-600" },
    { value: 2, label: "Poor", hours: "3–4 hours", icon: BadSleepIcon, gradient: "from-orange-400 to-orange-600" },
    { value: 1, label: "Worst", hours: "<3 hours", icon: VeryBadSleepIcon, gradient: "from-purple-400 to-purple-600" },
  ];

  const user = useUserStore((state) => state.user);
  const [step, setStep] = useState<number>(1);
  const [weight, setWeight] = useState<number>(70); // kg
  const [height, setHeight] = useState<number>(170); // cm
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

  // Calculate BMI
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { text: "Normal", color: "text-green-600" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-600" };
    return { text: "Obese", color: "text-red-600" };
  };

  const handleData = async () => {
    if (!gender || !age) {
      console.warn("⚠️ Gender and age are required");
      return;
    }

    try {
      console.log("📤 Submitting onboarding data...");
      await submitOnboarding();
      console.log("✅ Onboarding submitted, navigating to home");
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 500);
    } catch (error) {
      console.error("❌ Error saving onboarding data:", error);
      alert("Failed to save onboarding data. Please try again.");
    }
  };

  useEffect(() => {
    console.log("🎯 Onboarding Page - User Status:", {
      name: user?.name,
      isOnboarded: user?.isOnboarded,
      email: user?.email
    });
  }, [user]);

  const totalSteps = 7;

  return (
    <div className="relative bg-gradient-to-br from-[#F7F3EF] to-[#f0e9e2] flex flex-col min-h-screen font-Lato overflow-hidden">
      {/* Decorative Shapes */}
      <div className="fixed top-0 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mt-6 mx-5 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl active:scale-95 transition-all border-2 border-[#694a39]/10"
        >
          <ChevronLeft size={24} className="text-[#694a39]" />
        </button>
        
        <div className="flex-1 mx-6">
          <div className="flex items-center gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  i + 1 <= step ? "bg-gradient-to-r from-[#694a39] to-[#8b6a5a]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-center text-sm text-[#694a39] mt-2 font-semibold">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="w-12"></div>
      </div>

      {/* STEP 1: Gender */}
      {step === 1 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-center text-[#694a39] mb-3">
            What's your gender?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Help us personalize your experience
          </p>

          <div className="space-y-4 max-w-md mx-auto w-full">
            <button
              onClick={() => handleGenderSelect("male")}
              className={`group relative w-full h-36 rounded-3xl overflow-hidden transition-all duration-300 ${
                gender === "male" ? "ring-4 ring-[#694a39] shadow-2xl scale-105" : "ring-2 ring-gray-200 shadow-lg hover:shadow-xl hover:scale-102"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 ${gender === "male" ? "opacity-100" : "opacity-70"} transition-opacity`}></div>
              <div className="relative flex items-center justify-between px-6 h-full">
                <div>
                  <h2 className="text-2xl font-bold text-[#694a39] mb-1">Male</h2>
                  <p className="text-sm text-gray-600">Select this option</p>
                </div>
                <img src={Male} className="h-28 object-contain" alt="Male" />
              </div>
              {gender === "male" && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#694a39] rounded-full flex items-center justify-center animate-scale-in">
                  <Check size={20} className="text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => handleGenderSelect("female")}
              className={`group relative w-full h-36 rounded-3xl overflow-hidden transition-all duration-300 ${
                gender === "female" ? "ring-4 ring-[#694a39] shadow-2xl scale-105" : "ring-2 ring-gray-200 shadow-lg hover:shadow-xl hover:scale-102"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 ${gender === "female" ? "opacity-100" : "opacity-70"} transition-opacity`}></div>
              <div className="relative flex items-center justify-between px-6 h-full">
                <div>
                  <h2 className="text-2xl font-bold text-[#694a39] mb-1">Female</h2>
                  <p className="text-sm text-gray-600">Select this option</p>
                </div>
                <img src={Female} className="h-28 object-contain" alt="Female" />
              </div>
              {gender === "female" && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#694a39] rounded-full flex items-center justify-center animate-scale-in">
                  <Check size={20} className="text-white" />
                </div>
              )}
            </button>
          </div>

          <button
            onClick={nextStep}
            disabled={!gender}
            className="mt-8 max-w-md mx-auto w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* STEP 2: Age */}
      {step === 2 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-center text-[#694a39] mb-3">
            How old are you?
          </h1>
          <p className="text-center text-gray-600 mb-12">
            We'll customize insights based on your age
          </p>

          <div className="relative w-48 h-48 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-2xl flex items-center justify-center">
              <span className="text-7xl font-bold text-white drop-shadow-lg">{age}</span>
            </div>
          </div>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
            <input
              type="range"
              min="12"
              max="100"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #694a39 0%, #694a39 ${((age - 12) / (100 - 12)) * 100}%, #e5e7eb ${((age - 12) / (100 - 12)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 text-sm font-semibold text-gray-600">
              <span>12</span>
              <span className="text-[#694a39] text-xl">{age} years</span>
              <span>100</span>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="mt-12 max-w-md w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* ✅ STEP 3: Weight (NEW) */}
      {step === 3 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-8 animate-fade-in">
          <div className="mb-8">
            <Weight size={48} className="text-[#694a39] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-center text-[#694a39] mb-3">
              What's your weight?
            </h1>
            <p className="text-center text-gray-600">
              This helps us provide personalized health insights
            </p>
          </div>

          <div className="relative w-56 h-56 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-2xl flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-white drop-shadow-lg">{weight}</span>
              <span className="text-2xl font-semibold text-white/90 mt-2">kg</span>
            </div>
          </div>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-6">
            <input
              type="range"
              min="30"
              max="200"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${((weight - 30) / (200 - 30)) * 100}%, #e5e7eb ${((weight - 30) / (200 - 30)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 text-sm font-semibold text-gray-600">
              <span>30 kg</span>
              <span className="text-green-600 text-xl font-bold">{weight} kg</span>
              <span>200 kg</span>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="max-w-md w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* ✅ STEP 4: Height (NEW) */}
      {step === 4 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-8 animate-fade-in">
          <div className="mb-8">
            <Ruler size={48} className="text-[#694a39] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-center text-[#694a39] mb-3">
              What's your height?
            </h1>
            <p className="text-center text-gray-600">
              Almost done with your physical profile!
            </p>
          </div>

          <div className="relative w-56 h-56 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-2xl flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-white drop-shadow-lg">{height}</span>
              <span className="text-2xl font-semibold text-white/90 mt-2">cm</span>
            </div>
          </div>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-6">
            <input
              type="range"
              min="100"
              max="250"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${((height - 100) / (250 - 100)) * 100}%, #e5e7eb ${((height - 100) / (250 - 100)) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 text-sm font-semibold text-gray-600">
              <span>100 cm</span>
              <span className="text-blue-600 text-xl font-bold">{height} cm</span>
              <span>250 cm</span>
            </div>
          </div>

          {/* BMI Display */}
          <div className="max-w-md w-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center shadow-lg">
            <p className="text-sm text-gray-600 mb-2">Your BMI</p>
            <p className={`text-4xl font-bold ${getBMICategory(parseFloat(bmi)).color}`}>
              {bmi}
            </p>
            <p className={`text-lg font-semibold ${getBMICategory(parseFloat(bmi)).color} mt-2`}>
              {getBMICategory(parseFloat(bmi)).text}
            </p>
          </div>

          <button
            onClick={nextStep}
            className="mt-8 max-w-md w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* STEP 5: Current Mood (was Step 3) */}
      {step === 5 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-[#694a39] mb-3">
            How are you feeling today?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Your current emotional state
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full mb-8">
            {[
              { label: "Happy", icon: HappyIcon, gradient: "from-green-400 to-green-600" },
              { label: "Neutral", icon: NeutralIcon, gradient: "from-yellow-400 to-yellow-600" },
              { label: "Sad", icon: SadIcon, gradient: "from-orange-400 to-orange-600" },
              { label: "Very Sad", icon: VerySadIcon, gradient: "from-purple-400 to-purple-600" },
            ].map((mood) => (
              <button
                key={mood.label}
                onClick={() => setCurrentMood(mood.label)}
                className={`relative flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 ${
                  currentMood === mood.label
                    ? `bg-gradient-to-br ${mood.gradient} shadow-2xl scale-105 ring-4 ring-white`
                    : "bg-white shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                <img src={mood.icon} className="h-16 mb-3" alt={mood.label} />
                <span className={`font-bold text-lg ${currentMood === mood.label ? "text-white" : "text-[#694a39]"}`}>
                  {mood.label}
                </span>
                {currentMood === mood.label && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                    <Check size={20} className="text-[#694a39]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto w-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center mb-8">
            <p className="text-2xl font-bold text-[#694a39]">
              I'm feeling <span className="text-purple-600">{currentMood || "..."}</span>
            </p>
          </div>

          <button
            onClick={nextStep}
            disabled={!currentMood}
            className="max-w-md mx-auto w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* STEP 6: Sleep Quality (was Step 4) */}
      {step === 6 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-[#694a39] mb-3">
            How's your sleep quality?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Quality sleep is essential for mental health
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto w-full mb-8">
            {sleepOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSleepQuality(opt.value)}
                className={`relative flex flex-col items-center justify-center p-5 rounded-3xl transition-all duration-300 ${
                  sleepQuality === opt.value
                    ? `bg-gradient-to-br ${opt.gradient} shadow-2xl scale-105 ring-4 ring-white`
                    : "bg-white shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                <img src={opt.icon} alt={opt.label} className="w-14 h-14 mb-3" />
                <span className={`font-bold text-center mb-1 ${sleepQuality === opt.value ? "text-white" : "text-[#694a39]"}`}>
                  {opt.label}
                </span>
                <span className={`text-xs text-center ${sleepQuality === opt.value ? "text-white/90" : "text-gray-600"}`}>
                  {opt.hours}
                </span>
                {sleepQuality === opt.value && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                    <Check size={20} className="text-[#694a39]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={!sleepQuality}
            className="max-w-md mx-auto w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
          >
            <span>Continue</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* STEP 7: Stress Level (was Step 5) */}
      {step === 7 && (
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-[#694a39] mb-3">
            What's your stress level?
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Rate from 1 (calm) to 5 (very stressed)
          </p>

          <div className="flex justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradients = [
                "from-green-400 to-green-600",
                "from-yellow-400 to-yellow-600",
                "from-orange-400 to-orange-600",
                "from-red-400 to-red-600",
                "from-purple-400 to-purple-600",
              ];
              return (
                <button
                  key={num}
                  onClick={() => setStressQuality(String(num))}
                  className={`relative w-16 h-16 rounded-full font-bold text-2xl transition-all duration-300 shadow-lg ${
                    stressQuality === String(num)
                      ? `bg-gradient-to-br ${gradients[num - 1]} text-white scale-125 ring-4 ring-white`
                      : "bg-white text-[#694a39] hover:scale-110"
                  }`}
                >
                  {num}
                  {stressQuality === String(num) && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center animate-bounce">
                      <Check size={14} className="text-[#694a39]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div
            className={`max-w-md mx-auto w-full rounded-3xl p-8 text-center mb-8 shadow-2xl transition-all duration-500 ${
              stressQuality === "1" ? "bg-gradient-to-br from-green-400 to-green-600" :
              stressQuality === "2" ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
              stressQuality === "3" ? "bg-gradient-to-br from-orange-400 to-orange-600" :
              stressQuality === "4" ? "bg-gradient-to-br from-red-400 to-red-600" :
              "bg-gradient-to-br from-purple-400 to-purple-600"
            }`}
          >
            <span className="text-7xl font-bold text-white drop-shadow-lg">
              {stressQuality || "?"}
            </span>
            <p className="text-xl font-bold text-white mt-3">
              {stressQuality === "1" && "Very Calm 😌"}
              {stressQuality === "2" && "Slightly Stressed 😐"}
              {stressQuality === "3" && "Moderate 😕"}
              {stressQuality === "4" && "High Stress 😟"}
              {stressQuality === "5" && "Very High 😫"}
            </p>
          </div>

          <button
            onClick={handleData}
            disabled={!stressQuality}
            className="max-w-md mx-auto w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#694a39] to-[#8b6a5a] text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all"
          >
            <span>Finish Setup</span>
            <Check size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;

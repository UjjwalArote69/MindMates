import MockupSvg from "../assets/Images/Hero first mockup.svg";
import Benefits1 from "../assets/Images/Benefits 1.svg";
import Benefits2 from "../assets/Images/Benifits 2.svg";
import Benefits3 from "../assets/Images/Benefits 3.svg";
import RoboIcon from "../assets/Icons/Benefits-1 Robo icon.svg";
import TickMark from "../assets/Icons/Benefits-1 Tick make Icon.svg";
import Metrics from "../assets/Icons/Metrics Icon.svg";
import Therapist from "../assets/Icons/Therapist icon.svg";
import AnimatedBlurTestimonialsDemo from "../components/ui/animated-blur-testimonials/demo";
import LastMockup from "../assets/Images/Last Mockup.svg";
import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="hero min-w-screen overflow-hidden bg-[#F7F3EF]">
      
      {/* NAVBAR */}
      <nav className="h-20 w-full  md:px-24 md:pt-4  flex items-center justify-between relative">
        {/* Logo */}
        <a href="#" className="pl-2 md:pl-0 flex flex-row items-center">
          <img
            src="src/assets/Images/Logo.png"
            className="h-10 w-10 md:h-16 md:w-16"
            alt="MindMates Logo"
          />
          <h1 className="-mt-4 font-Lato text-xl  md:text-3xl pt-1.5 font-bold text-[#696767]">
            Mindmates
          </h1>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row items-center gap-4">
          <button className="py-2 px-4 border-2 border-[#926247] text-xl text-[#926247] rounded-full">
            Sign up
          </button>
          <button className="py-2 px-4 border-2 bg-[#926247] text-xl text-white rounded-full">
            Sign in
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="pr-7 -mt-4 md:hidden text-3xl text-[#926247]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden z-50 w-40">
            <button className="py-2 px-4 border-2 border-[#926247] text-sm text-[#926247] rounded-full">
              Sign up
            </button>
            <button className="py-2 px-4 border-2 bg-[#926247] text-sm text-white rounded-full">
              Sign in
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="pt-10 md:pt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-28 px-4 md:px-0">
        <img
          src={MockupSvg}
          className="h-auto order-1 md:h-[90vh] w-auto "
          alt=""
        />
        <div className="font-Lato text-center md:text-left md:order-1">
          <p className="bg-[#9BB167] inline py-1.5 px-3 rounded-full text-white text-sm md:text-base">
            Our Mission
          </p>
          <h1 className="pt-5 pb-5 font-bold text-4xl md:text-7xl text-[#533630] leading-tight">
            Understand Your <br className="hidden md:block" />
            Mind. Anytime, <br className="hidden md:block" /> Anywhere
          </h1>
          <p className=" text-base md:text-xl  text-[#533630]">
            Mental health deserves daily care, not just crisis care. Mindmates{" "}
            is your private AI listener, coach, and mood tracker designed to
            help you understand, manage, and improve your emotional well-being
            24/7.
          </p>
        </div>
      </div>

      {/* REVIEWS */}
      <div
        id="review"
        className="w-full bg-[#533630] mt-15 pt-10 md:pt-40 px-4 md:px-0"
      >
        <div
          id="header"
          className="flex flex-col items-center gap-5 md:gap-7 font-Lato text-center"
        >
          <p className="bg-[#e0cdc9] py-1 px-3 inline-block text-[#533630] rounded-full">
            Reviews
          </p>
          <h2 className="text-[#e0cdc9] text-2xl text-balance md:text-3xl font-extrabold">
            Real people. Real support. Real growth.
          </h2>
          <p className="text-[#e0cdc9] px-3 text-base md:text-xl max-w-xl">
            Every day, thousands of people choose MindMates to feel heard,
            reflect, and build healthier mental habits. Here's what they have to
            say.
          </p>
        </div>
        <AnimatedBlurTestimonialsDemo />
      </div>

      {/* BENEFITS SECTION */}
      <div id="benefits" className="bg-white pt-16 md:pt-24 px-4 md:px-0">
        <div
          id="header"
          className="flex flex-col items-center gap-4 md:gap-7 font-Lato text-center"
        >
          <p className="bg-[#e0cdc9] py-1 px-3 inline-block text-[#533630] rounded-full">
            Benefits
          </p>
          <h2 className="text-[#533630] text-balance text-2xl md:text-3xl font-extrabold">
            Discover the real-life Benefits our users love most.
          </h2>
          <p className="px-4 text-base md:text-xl max-w-xl">
            Mindmates gives you easy tools to slow down racing thoughts, manage
            anxiety, and calm in just a few minutes a day.
          </p>
        </div>

        <div
          id="body"
          className="pt-15 md:pt-20 flex flex-col gap-16 md:gap-20"
        >
          {/* First */}
          <div
            id="first"
            className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-4"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={Benefits1} className="max-w-full h-auto" alt="" />
            </div>
            <div className="flex flex-col gap-6 p-4 items-start w-full md:w-1/2 md:text-left">
              <div className="flex flex-col gap-6">
                <img
                  src={RoboIcon}
                  className="h-9 w-9 p-2 bg-[#e0cdc9] rounded-full  md:mx-0"
                  alt=""
                />
                <h1 className="font-bold text-[#533630db] text-2xl md:text-3xl">
                  Mindfull AI Companion
                </h1>
                <p className="font-light text-base md:text-xl">
                  Talk openly. Mindmate listens without judgement and helps you
                  reflect on thoughts and feelings
                </p>
              </div>
              <div className="flex flex-col gap-2   md:items-start">
                {["Judgement-Free", "Reflective", "Private & Secure"].map(
                  (item, i) => (
                    <div key={i} className="flex gap-2 ">
                      <img
                        src={TickMark}
                        className="bg-[#9BB167] p-2 rounded-full"
                        alt=""
                      />
                      <h3 className="font-light text-base md:text-xl">
                        {item}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Second */}
          <div
            id="second"
            className="flex flex-col-reverse md:flex-row items-center w-full gap-6 md:gap-4"
          >
            <div className="w-full p- md:w-1/2 flex flex-col gap-6 p-4  md:text-left">
              <div className="flex flex-col gap-6">
                <img
                  src={Metrics}
                  className="h-9 w-9 p-2 bg-[#e0cdc9] rounded-full  md:mx-0"
                  alt=""
                />
                <h1 className="text-[#533630db] font-bold text-2xl md:text-3xl">
                  Mental Health Metrics
                </h1>
                <p className="font-light text-base md:text-xl">
                  Get gentle actionable advice tailored to your needs from
                  stress management to sleep support
                </p>
              </div>
              <div className="flex flex-col gap-2  md:items-start">
                {["Stress-Free", "Very Safe", "Quick Response"].map(
                  (item, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <img
                        src={TickMark}
                        className="bg-[#9BB167] p-2 rounded-full"
                        alt=""
                      />
                      <h3 className="font-light text-base md:text-xl">
                        {item}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={Benefits2} className="max-w-full h-auto" alt="" />
            </div>
          </div>

          {/* Third */}
          <div
            id="third"
            className="pb-5 flex flex-col md:flex-row items-center w-full gap-6 md:gap-4"
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={Benefits3} className="max-w-full h-auto" alt="" />
            </div>
            <div className="flex flex-col gap-6 p-4 w-full md:w-1/2  md:text-left">
              <div className="flex flex-col gap-6">
                <img
                  src={Therapist}
                  className="h-9 w-9 p-2 bg-[#e0cdc9] rounded-full md:mx-0"
                  alt=""
                />
                <h1 className="font-bold text-2xl md:text-3xl">
                  Therapist Appointment
                </h1>
                <p className="font-light text-base md:text-xl">
                  Spot patterns and triggers with simple, science-backed mood
                  tracking. Your conversations stay confidential. We use strong
                  encryption and never share your data
                </p>
              </div>
              <div className="flex flex-col gap-2  md:items-start">
                {["Quick Search", "99.9% Match", "Talk Freely"].map(
                  (item, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <img
                        src={TickMark}
                        className="bg-[#9BB167] p-2 rounded-full"
                        alt=""
                      />
                      <h3 className="font-light text-base md:text-xl">
                        {item}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Section */}
      <div className="w-full flex flex-col bg-[#533630]">
        <div className="pt-10 p-4 flex flex-col gap-6 font-Lato text-white">
          <h1 className="text-3xl  font-bold">
            Take Care of Your Mind <br /> - Start Today
          </h1>
          <p className="font-light">
            Don’t wait for stress to take over. MindMates makes daily mental
            wellness simple, private, and always available — so you can feel
            more understood and in control every day.
          </p>
        </div>
        <div className="">
          <img src={LastMockup} className="" alt="" />
        </div>
      </div>

      {/* Footer  */}
      <div className="w-full p-4 font-Lato flex flex-col">
        <div className="flex flex-col gap-3 border-b-2 border-[#5336305e] ">
          <div className="pt-7 flex ">
            <img src="src/assets/Images/Logo.png" className="" alt="" />
            <h2 className="text-2xl font-bold">MindMates</h2>
          </div>
          <p className="pl-2 font-light pb-10">Building a mindfulness habit starts with one gentle breath — and Freud is here to walk with you every step of the way.</p>
        </div>
      </div>

    </div>
  );
};

export default Hero;

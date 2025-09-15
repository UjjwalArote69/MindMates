// import React from "react";
import BackButton from "../../assets/Icons/Back Arrow.svg"
import ArrowLeft from "../../assets/Icons/Arrow Curved Bottom Left.svg"
import RobotImage from "../../assets/Images/Chat/Therapy New Chat Robot.svg"; // replace with your robot image
import SearchButton from "../../assets/Icons/Search Icon.svg"

const ChatIntro = () => {
  return (
    <div className="flex flex-col h-screen bg-[#FAF9F6]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button className="p-2">
          {/* <BackButton className="text-brown-700 w-5 h-5" /> */}
          <img src={BackButton} alt="" />
        </button>
        <h1 className="font-semibold text-lg text-brown-800">Doctor Mates.AI</h1>
        <button className="p-2">
          {/* <FiSearch className="text-brown-700 w-5 h-5" /> */}
          <img src={SearchButton} alt="" />
        </button>
      </div>

      {/* Robot Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <img
          src={RobotImage}
          alt="Robot"
          className="w-48 h-48 object-contain"
        />

        {/* Badge */}
        <div className="mt-6">
          <span className="px-4 py-1 text-sm rounded-full bg-red-100 text-red-600 font-medium">
            LIMITATIONS
          </span>
        </div>

        {/* Text Section */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-brown-800">
            Limited Knowledge
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            No human being is perfect. So is chatbots. Dr Mate’s knowledge is
            limited to 2024.
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-2 bg-white">
        <input
          type="text"
          placeholder="Type to start chatting...!"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-400 text-sm"
        />
        <button className="bg-green-400 p-3 rounded-full">
          <img src={ArrowLeft} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatIntro;

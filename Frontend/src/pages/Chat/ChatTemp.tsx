// import React from "react";
import { useNavigate } from "react-router-dom";
// import ShieldIcon from "../../assets/Icons/Shield Icon.svg";

const ChatTemp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f3ef] text-center px-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md">
        
          <h1 className="text-2xl font-extrabold text-[#694a39] mb-4">
            Chat Feature
          </h1>
        
        <p className="text-[#4c3729] text-lg mb-6">
          🚧 This feature is currently unavailable.
          <br />
          We are working hard to bring chat functionality in future updates!
        </p>
        <button
          onClick={() => navigate("/home")}
          className="mt-2 px-6 py-3 bg-[#694a39] text-white rounded-3xl font-semibold hover:bg-[#563825] transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ChatTemp;

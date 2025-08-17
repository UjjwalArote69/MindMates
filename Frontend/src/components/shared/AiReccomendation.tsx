// import React from "react";
import AiRobot from "../../assets/Images/Ai Reccomendations/Ai robot mockup.svg"
import SleepIcon from "../../assets/Icons/Sleep zzz Icon.svg";

const AiReccomendation = () => {
  return (
    <>
      <div className="mt-5 flex flex-col justify-start gap-2 bg-amber-80 font-Lato ">
        <h1 className="font-extrabold text-[#4c3729] text-2xl">AI insights -</h1>
        <div className="h-40 w-82 bg-[#4c3729] overflow-clip flex  rounded-3xl">
            <div className="flex items-center gap-1 pl-5 bg-amber-30">
                <img src={SleepIcon} className="h-10 bg-[#f6f5f2] rounded-full p-2" alt="" />
                <h3 className="text-[#f6f5f2] text-xl text-balance">You sleep well at weekend</h3>
            </div>
            <img src={AiRobot} className="h-44" alt="robot-image" />
        </div>
      </div>
    </>
  );
};

export default AiReccomendation;

import AiRobot from "../../../assets/Images/Ai Reccomendations/Ai robot mockup.svg";
import SleepIcon from "../../../assets/Icons/Sleep zzz Icon.svg";

const AiReccomendation = ({ user }: { user: any }) => {
  return (
    <div className="mt-5 flex flex-col justify-start gap-2 font-Lato">
      <h1 className="font-extrabold text-[#4c3729] text-2xl">AI insights -</h1>
      <div className="h-40 w-82 bg-[#4c3729] overflow-clip flex rounded-3xl">
        <div className="flex items-center gap-1 pl-5">
          <img src={SleepIcon} className="h-10 bg-[#f6f5f2] rounded-full p-2" alt="" />
          <h3 className="text-[#f6f5f2] text-xl">
            {user?.sleepQuality
              ? `Your sleep quality is ${user.sleepQuality}/10`
              : "Track your sleep to get insights"}
          </h3>
        </div>
        <img src={AiRobot} className="h-44" alt="robot" />
      </div>
    </div>
  );
};

export default AiReccomendation;

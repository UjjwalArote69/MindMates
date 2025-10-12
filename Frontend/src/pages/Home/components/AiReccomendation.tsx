import { useNavigate } from "react-router-dom";
import AiRobot from "../../../assets/Images/Ai Reccomendations/Ai robot mockup.svg";
import SleepIcon from "../../../assets/Icons/Sleep zzz Icon.svg";
import { useUserStore } from "../../../store/userStore";

const AiReccomendation = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // Get latest sleep data
  const latestSleepHours = user?.sleepLogs && user.sleepLogs.length > 0
    ? user.sleepLogs[user.sleepLogs.length - 1].hours
    : null;

  const getSleepMessage = () => {
    if (!latestSleepHours) {
      return "Track your sleep to get insights";
    }
    if (latestSleepHours < 6) {
      return `You slept ${latestSleepHours.toFixed(1)}h - Try for 7-9h tonight`;
    }
    if (latestSleepHours >= 7 && latestSleepHours <= 9) {
      return `Great! You slept ${latestSleepHours.toFixed(1)}h last night`;
    }
    return `You slept ${latestSleepHours.toFixed(1)}h - Consider 7-9h`;
  };

  return (
    <div className="mt-5 flex flex-col justify-start gap-2 font-Lato w-full">
      <h1 className="font-extrabold text-[#4c3729] text-2xl">AI insights -</h1>
      <div 
        className="h-40 w-full bg-[#4c3729] overflow-clip flex rounded-3xl cursor-pointer active:scale-95 transition-transform"
        onClick={() => navigate("/stats/sleep")}
      >
        <div className="w-2/3 flex flex-col items-center">
          <div className="w-full h-1/3 pt-4 pl-3">
            <img
              src={SleepIcon}
              className="h-10 bg-[#f6f5f2] rounded-full p-2"
              alt="sleep"
            />
          </div>
          <div className="w-full pt-4 pl-4 h-2/3">
            <h3 className="text-[#f6f5f2] text-xl font-semibold">
              {getSleepMessage()}
            </h3>
          </div>
        </div>
        <img src={AiRobot} className="h-44" alt="robot" />
      </div>
    </div>
  );
};

export default AiReccomendation;

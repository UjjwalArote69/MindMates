import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import HappyIcon from "../../assets/Icons/Happy Icon.svg";
import StressIcon from "../../assets/Icons/Stress Level Head Icon.svg";
import SleepIcon from "../../assets/Icons/Sleep Analysis Bed Icon.svg";
import ExerciseIcon from "../../assets/Icons/Mindfull Exercise Stopwatch Icon.svg";
import Navbar from "../../components/shared/Navbar";

const StatsHome = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#f8f5f2] flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="relative w-full h-72 bg-[#A5BE7C] rounded-b-3xl flex flex-col items-center justify-center text-white">
          <button
            onClick={() => navigate("/home")}
            className="absolute top-5 left-5 bg-white/20 rounded-full p-2"
          >
            <img src={BackIcon} alt="Back" className="w-5 h-5" />
          </button>

          <p className="text-lg font-semibold text-white mb-2">Mind Score</p>
          <span className="absolute top-6 right-6 px-3 py-1 text-xs rounded-full bg-white/30">
            NORMAL
          </span>

          <h1 className="text-[80px] font-bold leading-none">80</h1>
          <p className="text-sm mt-2 text-center max-w-[250px]">
            Congratulations! You are mentally healthy.
          </p>
        </div>

        {/* Recommendations */}
        <div className="flex flex-col gap-4 mt-12 px-6">
          <div
            onClick={() => navigate("/stats/mood")}
            className="bg-white rounded-xl shadow-md px-5 py-4 flex items-start gap-4"
          >
            <img src={HappyIcon} alt="Happy" className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-[#4B2E2B]">
                Very Happy
              </h3>
              <p className="text-xs text-gray-500">No Recommendation.</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/stats/mood")}
            className="bg-white rounded-xl shadow-md px-5 py-4 flex items-start gap-4"
          >
            <img src={StressIcon} alt="Stress" className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-[#4B2E2B]">
                Stress Level
              </h3>
              <p className="text-xs text-gray-500">No Recommendation.</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/stats/sleep")}
            className="bg-white rounded-xl shadow-md px-5 py-4 flex items-start gap-4"
          >
            <img src={SleepIcon} alt="Sleep" className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-[#4B2E2B]">
                Sleep on time
              </h3>
              <p className="text-xs text-gray-500">Good amount of sleep.</p>
            </div>
          </div>

          <div
            onClick={() => navigate("/stats/exercise")}
          className="bg-white rounded-xl shadow-md px-5 py-4 flex items-start gap-4">
            <img src={ExerciseIcon} alt="Exercise" className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-[#4B2E2B]">
                MindFull Exercises
              </h3>
              <p className="text-xs text-gray-500">Good amount of sleep.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar fixed at bottom */}
      <Navbar />
    </div>
  );
};

export default StatsHome;

// import { useNavigate } from "react-router-dom";
import BackArrow from "../../../assets/Icons/Back Arrow.svg";

interface ChatHeaderProps {
  title: string;
  onBack: () => void;
  isConnected: boolean;
}

export default function ChatHeader({ title, onBack, isConnected }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#4A7C59] to-[#5B9368] px-4 py-4 flex items-center gap-3 shadow-md sticky top-0 z-20">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all active:scale-95"
        aria-label="Go back"
      >
        <img src={BackArrow} alt="Back" className="w-5 h-5 brightness-0 invert" />
      </button>

      <div className="flex-1 min-w-0">
        <h2 className="text-white font-bold text-lg truncate">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-300 animate-pulse' : 'bg-red-300'}`} />
          <p className="text-white/90 text-xs">
            {isConnected ? 'Online' : 'Reconnecting...'}
          </p>
        </div>
      </div>

      {/* Optional: Menu button */}
      <button
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        aria-label="Options"
      >
        <span className="text-white text-xl">⋮</span>
      </button>
    </div>
  );
}

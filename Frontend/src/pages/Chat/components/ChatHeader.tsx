import { useState } from "react";
import BackArrow from "../../../assets/Icons/Back Arrow.svg";

interface ChatHeaderProps {
  title: string;
  onBack: () => void;
  isConnected: boolean;
  onDeleteChat?: () => void;
  isNewChat?: boolean;
}

export default function ChatHeader({ title, onBack, isConnected, onDeleteChat, isNewChat }: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

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

      {/* Menu button */}
      {!isNewChat && (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
            aria-label="Options"
          >
            <span className="text-white text-xl">⋮</span>
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-40 min-w-[160px]">
                {onDeleteChat && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDeleteChat();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Chat
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

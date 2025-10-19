import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  id?: string;
}

interface Props {
  message: Message;
  isStreaming?: boolean;
  showTimestamp?: boolean;
}

export default function MessageBubble({ 
  message, 
  isStreaming = false, 
  showTimestamp = true 
}: Props) {
  const isUser = message.role === "user";
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.classList.add("animate-fade-in-up");
    }
  }, []);

  return (
    <div
      ref={bubbleRef}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Avatar with glow effect */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-md transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-br from-[#4A7C59] to-[#5B9368] group-hover:shadow-lg group-hover:shadow-[#4A7C59]/30"
            : "bg-gradient-to-br from-[#5BA3D0] to-[#4A90C6] group-hover:shadow-lg group-hover:shadow-blue-400/30"
        }`}
      >
        {isUser ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        )}
      </div>

      {/* Message Content with improved styling */}
      <div className={`flex flex-col max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
            isUser
              ? "bg-gradient-to-br from-[#4A7C59] to-[#5B9368] text-white rounded-tr-sm hover:shadow-md"
              : "bg-white text-gray-800 rounded-tl-sm border border-gray-200 hover:shadow-md hover:border-gray-300"
          }`}
        >
          {/* Message text with better typography */}
          <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser ? "text-white" : "text-gray-800"
          }`}>
            {message.content}
          </p>

          {/* Streaming cursor */}
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-current ml-1 animate-pulse" />
          )}
        </div>

        {/* Timestamp with fade-in on hover */}
        {showTimestamp && (
          <div className={`flex items-center gap-2 mt-1 px-2 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`}>
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            
            {/* Message actions on hover */}
            {isHovered && !isUser && (
              <div className="flex gap-1">
                <button 
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Copy message"
                  onClick={() => navigator.clipboard.writeText(message.content)}
                >
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

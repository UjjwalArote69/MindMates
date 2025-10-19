import { useState, FormEvent, useRef } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSendMessage, disabled, placeholder }: Props) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxLength = 500;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      // Keep focus on input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const charCount = message.length;
  const isNearLimit = charCount > maxLength * 0.8;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-shrink-0 px-4 py-4 bg-white border-t border-gray-200"
    >
      <div className={`relative flex items-center bg-white border-2 rounded-3xl shadow-sm transition-all duration-200 ${
        isFocused 
          ? 'border-[#4A7C59] shadow-md' 
          : 'border-gray-200 hover:border-gray-300'
      } ${disabled ? 'opacity-60' : ''}`}>
        
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || "Share what's on your mind..."}
          disabled={disabled}
          maxLength={maxLength}
          className="flex-1 px-5 py-3.5 text-sm bg-transparent border-none outline-none rounded-full placeholder:text-gray-400"
          aria-label="Message input"
        />

        {/* Character counter - shows when near limit */}
        {isNearLimit && (
          <span className={`text-xs px-2 ${
            charCount >= maxLength ? 'text-red-500' : 'text-gray-400'
          }`}>
            {charCount}/{maxLength}
          </span>
        )}

        {/* Send button with improved animation */}
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={`mr-2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 transform ${
            message.trim() && !disabled
              ? 'bg-gradient-to-r from-[#4A7C59] to-[#5B9368] hover:scale-105 hover:shadow-lg active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${
              message.trim() ? 'translate-x-0.5 -translate-y-0.5' : ''
            }`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>

      {/* Helpful hint text */}
      {isFocused && !message && (
        <p className="text-xs text-gray-400 mt-2 px-2 animate-fade-in">
          💬 Take your time. This is a safe space to share your thoughts.
        </p>
      )}
    </form>
  );
}

interface Props {
  onStart: () => void;
}

export default function ChatIntro({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4A7C59] to-[#6FAF84] flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0c0 1.574.512 3.042 1.395 4.28L3 20l3.745-1.949A9.863 9.863 0 0012 20c4.97 0 9-3.582 9-8z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2">
        Start a New Conversation
      </h2>
      <p className="text-gray-500 max-w-xs mb-6 leading-relaxed text-sm">
        Talk about anything — advice, thoughts, or support. Doctor Mates AI is
        always here to listen and assist.
      </p>

      <button
        onClick={onStart}
        className="bg-[#4A7C59] hover:bg-[#3C6B4B] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform hover:scale-105 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Conversation
      </button>
    </div>
  );
}

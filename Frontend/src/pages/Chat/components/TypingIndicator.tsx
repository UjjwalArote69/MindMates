export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5BA3D0] to-[#4A90C6] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-md">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 border border-gray-200 shadow-sm">
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "200ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "400ms", animationDuration: "1s" }}
          />
        </div>
      </div>
    </div>
  );
}

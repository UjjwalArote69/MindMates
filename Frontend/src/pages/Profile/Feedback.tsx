import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";
import { submitFeedback } from "../../services/user.service";
import { Send, Check, AlertCircle, MessageSquare, Star } from "lucide-react";

const Feedback = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const options = [
    { label: "PERFORMANCE", color: "from-blue-500 to-blue-600", icon: "⚡" },
    { label: "BUG", color: "from-red-500 to-red-600", icon: "🐛" },
    { label: "USER EXPERIENCE", color: "from-green-500 to-green-600", icon: "✨" },
    { label: "CRASHES", color: "from-orange-500 to-orange-600", icon: "💥" },
    { label: "LOADING", color: "from-purple-500 to-purple-600", icon: "⏳" },
    { label: "SUPPORT", color: "from-pink-500 to-pink-600", icon: "🆘" },
    { label: "NAVIGATION", color: "from-yellow-500 to-yellow-600", icon: "🧭" },
  ];

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      setErrorMsg("Please enter your feedback before submitting.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await submitFeedback({
        selectedAreas: selected,
        feedback: feedbackText,
        // rating,
      });
      setSuccessMsg("Thank you for your feedback!");
      setSelected([]);
      setFeedbackText("");
      setRating(0);
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/profile");
      }, 2000);
      console.log("Feedback response:", res);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#A3B763] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4E342E] font-semibold text-lg">Submitting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] text-[#4B2E2B] md:pl-[100px] overflow-hidden pb-32">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3B763]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-[#A3B763] to-[#8fa054] rounded-b-3xl md:rounded-3xl md:mx-6 md:mt-6 p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            >
              <img src={BackIcon} alt="Back" className="w-5 h-5 brightness-0 invert" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={28} />
                Send Feedback
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Help us improve your experience
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto space-y-6">
          {/* Emoji + Question Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A3B763]/20 to-[#8fa054]/10 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">💭</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#4B2E2B] mb-2">
              Which areas need improvement?
            </h2>
            <p className="text-gray-600 text-sm">
              Select all that apply (optional)
            </p>
          </div>

          {/* Category Tags */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-wrap gap-3 justify-center">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => toggleOption(option.label)}
                  className={`group relative px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
                    selected.includes(option.label)
                      ? `bg-gradient-to-r ${option.color} text-white scale-105 shadow-lg`
                      : "bg-white text-[#4B2E2B] hover:scale-105"
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                  {selected.includes(option.label) && (
                    <Check
                      size={16}
                      className="inline-block ml-2 animate-scale-in"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Stars */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <label className="block text-base font-bold mb-3 text-[#4B2E2B]">
              Rate your overall experience
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-all hover:scale-125 active:scale-110"
                >
                  <Star
                    size={40}
                    className={`${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-all`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-3">
                {rating === 5 && "Excellent! 🌟"}
                {rating === 4 && "Great! 😊"}
                {rating === 3 && "Good 👍"}
                {rating === 2 && "Fair 🤔"}
                {rating === 1 && "Needs work 😕"}
              </p>
            )}
          </div>

          {/* Feedback Textarea */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            <label
              htmlFor="feedback"
              className="block text-base font-bold mb-3 text-[#4B2E2B]"
            >
              Share your detailed feedback *
            </label>
            <textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what you think... We'd love to hear your thoughts!"
              rows={6}
              maxLength={500}
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-[#A3B763] outline-none transition-colors resize-none font-medium"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {feedbackText.length}/500 characters
              </p>
              {feedbackText.length >= 10 && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <Check size={14} />
                  Looking good!
                </p>
              )}
            </div>
          </div>

          {/* Error / Success Messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 px-5 py-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 shadow-md animate-slide-up">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 px-5 py-4 bg-green-50 text-green-600 rounded-2xl border border-green-200 shadow-md animate-slide-up">
              <Check size={20} className="flex-shrink-0" />
              <p className="text-sm font-medium">{successMsg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !feedbackText.trim()}
            className="w-full bg-gradient-to-r from-[#A3B763] to-[#8fa054] text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={22} />
                Submit Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";
import { Copy, Share2, Check, Users, Gift, Sparkles } from "lucide-react";

const InviteFriends = () => {
  const [inviteLink] = useState("https://mindmates.app/invite?ref=12345");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me on MindMates",
          text: "I'm using MindMates to improve my mental wellness. Join me on this journey!",
          url: inviteLink,
        });
      } else {
        handleCopy();
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const benefits = [
    { icon: "🎁", title: "Get Rewards", desc: "Earn points for each friend" },
    { icon: "🤝", title: "Help Friends", desc: "Support their wellness journey" },
    { icon: "🌟", title: "Unlock Features", desc: "Access premium content" },
  ];

  const shareOptions = [
    { icon: "💬", name: "WhatsApp", color: "from-green-500 to-green-600" },
    { icon: "📧", name: "Email", color: "from-blue-500 to-blue-600" },
    { icon: "📱", name: "SMS", color: "from-purple-500 to-purple-600" },
    { icon: "🔗", name: "More", color: "from-gray-500 to-gray-600" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] md:pl-[100px] overflow-hidden pb-8">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-3xl md:rounded-3xl md:mx-6 md:mt-6 p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            >
              <img src={BackIcon} alt="Back" className="w-5 h-5 brightness-0 invert" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users size={28} />
                Invite Friends
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Share wellness, earn rewards
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto space-y-6">
          {/* Hero Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 text-center overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gift size={48} className="text-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] mb-3">
                Invite Friends & Get Rewarded!
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto">
                Share your unique invite link and help your friends improve their mental wellness.
                You'll both get amazing rewards! 🎉
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-md border border-white/20 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl md:text-4xl mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-xs md:text-sm text-[#4B2E2B] mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-xs hidden md:block">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Invite Link Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-purple-500" />
              <h3 className="font-bold text-lg text-[#4B2E2B]">
                Your Unique Invite Link
              </h3>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-4 border border-gray-200">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="bg-transparent outline-none flex-1 text-sm md:text-base text-gray-700 font-medium"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span className="hidden md:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="hidden md:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mb-6">
              Your friends will join with this link and both of you get rewards! 🎁
            </p>

            {/* Share Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-bold text-[#4B2E2B] text-center">
                Share via
              </p>
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={handleShare}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${option.color} text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-xs font-bold">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 md:p-8 shadow-xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your Referral Stats</h3>
                <p className="text-white/80 text-sm">Track your progress</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-white/80 mt-1">Invited</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-white/80 mt-1">Joined</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">340</div>
                <div className="text-sm text-white/80 mt-1">Points</div>
              </div>
            </div>
          </div>

          {/* Primary Share Button */}
          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 md:py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Share2 size={24} />
            Share Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;

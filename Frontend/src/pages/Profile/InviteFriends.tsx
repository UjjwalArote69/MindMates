import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";

const InviteFriends = () => {
  const [inviteLink] = useState("https://mindmates.app/invite?ref=12345");
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me on MindMates",
          text: "I’m using MindMates to improve my mental wellness, join me!",
          url: inviteLink,
        });
      } else {
        await navigator.clipboard.writeText(inviteLink);
        alert("Invite link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing: ", err);
      alert("Failed to share link. Try copying manually.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] flex flex-col">
      {/* Header */}
      <div className="bg-[#A8C56A] rounded-b-3xl p-5 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Invite Friends</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center mt-10 px-5">
        {/* Emoji or illustration */}
        <div className="w-20 h-20 rounded-full bg-[#f0edea] flex items-center justify-center mb-6">
          <span className="text-3xl">🎁</span>
        </div>

        <h2 className="text-center text-lg font-semibold mb-4">
          Share MindMates with your friends!
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6 px-4">
          Send your unique invite link and help your friends improve their mental wellness.
        </p>

        {/* Invite link box */}
        <div className="flex w-full max-w-md items-center bg-white rounded-full shadow-sm px-4 py-3 mb-6">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="bg-transparent outline-none w-full text-sm text-gray-700"
          />
          <button
            onClick={handleShare}
            className="ml-3 bg-[#4B2E2B] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#39211e] transition"
          >
            Invite
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your friends will get access to MindMates once they join using your link.
        </p>
      </div>
    </div>
  );
};

export default InviteFriends;

import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import SearchIcon from "../../assets/Icons/Search Icon.svg";
import LiveChatImage from "../../assets/Images/HelpCenter/Help Center Image.svg";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "chat">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      question: "What is MindMates AI?",
      answer:
        "MindMates AI is an advanced mental health chatbot app that utilizes artificial intelligence to provide personalized support.",
    },
    {
      question: "How does MindMates AI work?",
      answer:
        "MindMates AI analyzes your inputs, tracks your mood, and provides mindfulness recommendations tailored for you.",
    },
    {
      question: "Is MindMates AI a replacement for professional therapy?",
      answer:
        "No, MindMates AI is designed to support mental well-being but it is not a substitute for licensed mental health professionals.",
    },
    {
      question: "How do I access MindMates AI?",
      answer:
        "You can access MindMates AI by signing up on our app and creating a personalized account.",
    },
    {
      question: "Is MindMates AI free to use?",
      answer:
        "MindMates AI offers a free tier with limited features. Premium subscriptions unlock advanced analytics and insights.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take privacy seriously. Your data is encrypted and never shared without your consent.",
    },
    {
      question: "Can MindMates AI help during anxiety or panic attacks?",
      answer:
        "Yes, MindMates AI provides calming techniques like guided breathing and grounding exercises to support you in those moments.",
    },
    {
      question: "Does MindMates AI track my progress over time?",
      answer:
        "Absolutely! MindMates AI helps monitor your mental wellness trends and gives insights to improve your lifestyle.",
    },
    {
      question: "Can I connect with a real therapist through the app?",
      answer:
        "Currently, MindMates AI offers AI-driven support only. Human therapist integration is being planned for future updates.",
    },
    {
      question: "Can I add emergency contacts in MindMates AI?",
      answer:
        "Yes, you can add emergency contacts in the app. They can be quickly accessed during critical situations.",
    },
  ];

  // ✅ Filter FAQs based on search input
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      {/* Header */}
      <div className="bg-[#A8C56A] rounded-b-3xl p-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")}>
            <img src={BackIcon} alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Help Center</h1>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 bg-[#96b55e] rounded-full p-1">
          <button
            onClick={() => setActiveTab("faq")}
            className={`flex-1 text-sm font-medium py-2 rounded-full ${
              activeTab === "faq" ? "bg-white text-[#4B2E2B]" : "text-white"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 text-sm font-medium py-2 rounded-full ${
              activeTab === "chat" ? "bg-white text-[#4B2E2B]" : "text-white"
            }`}
          >
            Live Chat
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6">
        {activeTab === "faq" ? (
          <>
            {/* Search Bar */}
            <div className="flex items-center bg-white shadow rounded-full px-4 py-2">
              <img src={SearchIcon} alt="Search" className="w-5 h-5 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="flex-1 text-sm focus:outline-none"
              />
            </div>

            {/* FAQ List */}
            <div className="mt-6 space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-xl px-4 py-3 shadow cursor-pointer ${
                      openIndex === index
                        ? "bg-[#4B2E2B] text-white"
                        : "bg-white text-[#4B2E2B]"
                    }`}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{faq.question}</span>
                      <span>{openIndex === index ? "▲" : "▼"}</span>
                    </div>
                    {openIndex === index && (
                      <p className="mt-2 text-sm">{faq.answer}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 mt-6">
                  No results found.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <img
              src={LiveChatImage}
              alt="Live Chat"
              className="w-40 h-40 mb-6"
            />
            <h2 className="text-lg font-bold mb-2">
              We are here to help you with your mental health needs!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We aim to reply within a few minutes! 😇
            </p>
            <button className="w-full py-3 bg-[#f0edea] rounded-full font-semibold flex items-center justify-center gap-2">
              Live Chat 💬
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;

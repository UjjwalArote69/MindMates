import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import SearchIcon from "../../assets/Icons/Search Icon.svg";
import LiveChatImage from "../../assets/Images/HelpCenter/Help Center Image.svg";
import { useNavigate } from "react-router-dom";
import { Search, HelpCircle, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "chat">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is MindMates AI?",
      answer:
        "MindMates AI is an advanced mental health chatbot app that utilizes artificial intelligence to provide personalized support.",
      category: "General",
    },
    {
      question: "How does MindMates AI work?",
      answer:
        "MindMates AI analyzes your inputs, tracks your mood, and provides mindfulness recommendations tailored for you.",
      category: "General",
    },
    {
      question: "Is MindMates AI a replacement for professional therapy?",
      answer:
        "No, MindMates AI is designed to support mental well-being but it is not a substitute for licensed mental health professionals.",
      category: "General",
    },
    {
      question: "How do I access MindMates AI?",
      answer:
        "You can access MindMates AI by signing up on our app and creating a personalized account.",
      category: "Account",
    },
    {
      question: "Is MindMates AI free to use?",
      answer:
        "MindMates AI offers a free tier with limited features. Premium subscriptions unlock advanced analytics and insights.",
      category: "Pricing",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take privacy seriously. Your data is encrypted and never shared without your consent.",
      category: "Privacy",
    },
    {
      question: "Can MindMates AI help during anxiety or panic attacks?",
      answer:
        "Yes, MindMates AI provides calming techniques like guided breathing and grounding exercises to support you in those moments.",
      category: "Features",
    },
    {
      question: "Does MindMates AI track my progress over time?",
      answer:
        "Absolutely! MindMates AI helps monitor your mental wellness trends and gives insights to improve your lifestyle.",
      category: "Features",
    },
    {
      question: "Can I connect with a real therapist through the app?",
      answer:
        "Currently, MindMates AI offers AI-driven support only. Human therapist integration is being planned for future updates.",
      category: "Features",
    },
    {
      question: "Can I add emergency contacts in MindMates AI?",
      answer:
        "Yes, you can add emergency contacts in the app. They can be quickly accessed during critical situations.",
      category: "Safety",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      General: "bg-blue-100 text-blue-700",
      Account: "bg-green-100 text-green-700",
      Pricing: "bg-purple-100 text-purple-700",
      Privacy: "bg-red-100 text-red-700",
      Features: "bg-yellow-100 text-yellow-700",
      Safety: "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] text-[#4B2E2B] md:pl-[100px] overflow-hidden pb-8">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-3xl md:rounded-3xl md:mx-6 md:mt-6 p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/profile")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            >
              <img src={BackIcon} alt="Back" className="w-5 h-5 brightness-0 invert" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <HelpCircle size={28} />
                Help Center
              </h1>
              <p className="text-white/80 text-sm mt-1">
                We're here to help you 24/7
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 text-sm font-bold py-3 rounded-xl transition-all ${
                activeTab === "faq"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              📚 FAQs
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 text-sm font-bold py-3 rounded-xl transition-all ${
                activeTab === "chat"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              💬 Live Chat
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 md:px-8 mt-6 max-w-4xl mx-auto">
          {activeTab === "faq" ? (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-1">
                <div className="flex items-center px-4 py-3">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search FAQs by keyword or category..."
                    className="flex-1 bg-transparent text-sm md:text-base focus:outline-none text-[#4B2E2B] font-medium"
                  />
                </div>
              </div>

              {/* Results Count */}
              {search && (
                <div className="text-sm text-gray-600 px-2">
                  Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
                </div>
              )}

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-md border border-white/20 overflow-hidden transition-all ${
                        openIndex === index ? "shadow-lg" : "hover:shadow-lg"
                      }`}
                    >
                      <div
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getCategoryColor(faq.category)}`}>
                              {faq.category}
                            </span>
                          </div>
                          <span className="font-bold text-[#4B2E2B] text-sm md:text-base">
                            {faq.question}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          {openIndex === index ? (
                            <ChevronUp size={20} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {openIndex === index && (
                        <div className="px-5 pb-5 pt-2 bg-blue-50/50 animate-slide-down">
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 text-center shadow-lg border border-white/20">
                    <Search size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">
                      No results found for "{search}"
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Try different keywords or check the Live Chat
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-white/20 text-center">
              <div className="max-w-md mx-auto">
                <img
                  src={LiveChatImage}
                  alt="Live Chat"
                  className="w-48 h-48 mx-auto mb-6"
                />
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#4B2E2B]">
                  Chat with our support team! 💬
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                  We're here to help you with your mental health needs!
                  Our team typically responds within a few minutes.
                </p>
                
                <button className="w-full py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-3 text-lg">
                  <MessageCircle size={24} />
                  Start Live Chat
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  Available 24/7 • Average response time: 2 minutes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

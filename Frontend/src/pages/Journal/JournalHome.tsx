import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Plus, 
  Search,
//   Calendar,
  BookOpen,
  Sparkles,
  Filter,
  Clock,
  Loader
} from "lucide-react";
import { getJournalEntries, getJournalStats, JournalEntry } from "../../services/journal.service";

const JournalHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMood, setFilterMood] = useState("all");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntries: 0,
    thisMonth: 0,
    currentStreak: 0,
  });

  const moods = [
    { value: "all", label: "All Moods", emoji: "✨", color: "gray" },
    { value: "happy", label: "Happy", emoji: "😊", color: "green" },
    { value: "sad", label: "Sad", emoji: "😢", color: "blue" },
    { value: "neutral", label: "Neutral", emoji: "😐", color: "gray" },
    { value: "excited", label: "Excited", emoji: "🤩", color: "yellow" },
    { value: "anxious", label: "Anxious", emoji: "😰", color: "orange" },
    { value: "grateful", label: "Grateful", emoji: "🙏", color: "purple" },
  ];

  // Fetch entries from backend
  useEffect(() => {
    fetchEntries();
    fetchStats();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await getJournalEntries({ limit: 100 });
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getJournalStats();
      const now = new Date();
      const thisMonthEntries = entries.filter(e => {
        const date = new Date(e.createdAt);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });

      setStats({
        totalEntries: data.totalEntries || 0,
        thisMonth: thisMonthEntries.length,
        currentStreak: data.currentStreak || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  // Filter and search entries
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesMood = filterMood === "all" || entry.mood === filterMood;
      const matchesSearch = 
        (entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMood && matchesSearch;
    });
  }, [entries, searchQuery, filterMood]);

  const getMoodEmoji = (mood: string) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData?.emoji || "📝";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
        <div className="flex flex-col items-center gap-4">
          <Loader size={48} className="text-amber-500 animate-spin" />
          <p className="text-gray-600 font-medium">Loading journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none animate-blob"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none animate-blob-slow animation-delay-2s"></div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-b-3xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/home")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <div className="flex items-center gap-2">
              <BookOpen size={28} className="text-white" />
              <h1 className="text-2xl font-bold text-white">My Journal</h1>
            </div>

            <button
              onClick={() => navigate("/journal/new")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <Plus size={24} className="text-white" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-white">{stats.totalEntries}</p>
              <p className="text-xs text-white/80 mt-1">Total Entries</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
              <p className="text-xs text-white/80 mt-1">This Month</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold text-white">{stats.currentStreak}</p>
              <p className="text-xs text-white/80 mt-1">Day Streak</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg flex items-center px-4 py-3 gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Mood Filter */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Filter by mood:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setFilterMood(mood.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  filterMood === mood.value
                    ? "bg-amber-400 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Entries List */}
        <div className="px-6 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={40} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {searchQuery || filterMood !== "all" ? "No entries found" : "Start Your Journey"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || filterMood !== "all" 
                  ? "Try adjusting your filters" 
                  : "Write your first journal entry today!"}
              </p>
              {!searchQuery && filterMood === "all" && (
                <button
                  onClick={() => navigate("/journal/new")}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                  Create First Entry
                </button>
              )}
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry._id}
                onClick={() => navigate(`/journal/${entry._id}`)}
                className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">
                      {getMoodEmoji(entry.mood)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {entry.title || "Untitled"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {formatDate(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
                  {entry.content}
                </p>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Floating Insights Card */}
        {entries.length > 0 && (
          <div className="mx-6 mt-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800">Journal Insights</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                You've been consistently journaling! Writing helps process emotions and track personal growth. 
                Keep up the great work! 🌟
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/journal/new")}
        className="fixed bottom-24 md:bottom-8 right-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <Plus size={32} className="text-white" />
      </button>
    </div>
  );
};

export default JournalHome;

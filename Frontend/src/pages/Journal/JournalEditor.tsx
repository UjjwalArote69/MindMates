import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ChevronLeft, 
  Save,
  Trash2,
  Calendar,
  Tag,
  Smile,
  CheckCircle2,
  AlertCircle,
  Loader
} from "lucide-react";
import {
  createJournalEntry,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
} from "../../services/journal.service";

const JournalEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== "new";

  const moods = [
    { value: "happy", label: "Happy", emoji: "😊", color: "from-green-400 to-green-600" },
    { value: "sad", label: "Sad", emoji: "😢", color: "from-blue-400 to-blue-600" },
    { value: "neutral", label: "Neutral", emoji: "😐", color: "from-gray-400 to-gray-600" },
    { value: "excited", label: "Excited", emoji: "🤩", color: "from-yellow-400 to-yellow-600" },
    { value: "anxious", label: "Anxious", emoji: "😰", color: "from-orange-400 to-orange-600" },
    { value: "grateful", label: "Grateful", emoji: "🙏", color: "from-purple-400 to-purple-600" },
  ];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("happy");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load entry if editing
  useEffect(() => {
    if (isEditing && id) {
      loadEntry();
    }
  }, [id, isEditing]);

  const loadEntry = async () => {
    try {
      setLoading(true);
      const data = await getJournalEntryById(id!);
      const entry = data.entry;
      
      if (entry) {
        setTitle(entry.title || "");
        setContent(entry.content);
        setSelectedMood(entry.mood);
        setTags(entry.tags || []);
      }
    } catch (error) {
      console.error("Failed to load entry:", error);
      alert("Failed to load journal entry");
      navigate("/journal");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Please write some content");
      return;
    }

    setSaving(true);

    try {
      const entryData = {
        title: title.trim() || undefined,
        content: content.trim(),
        mood: selectedMood,
        tags: tags,
      };

      if (isEditing && id) {
        // Update existing entry
        await updateJournalEntry(id, entryData);
      } else {
        // Create new entry
        await createJournalEntry(entryData);
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/journal");
      }, 1000);
    } catch (error: any) {
      console.error("Failed to save entry:", error);
      alert(error.response?.data?.message || "Failed to save journal entry");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteJournalEntry(id);
      navigate("/journal");
    } catch (error: any) {
      console.error("Failed to delete entry:", error);
      alert(error.response?.data?.message || "Failed to delete journal entry");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const currentMood = moods.find(m => m.value === selectedMood) || moods[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
        <div className="flex flex-col items-center gap-4">
          <Loader size={48} className="text-amber-500 animate-spin" />
          <p className="text-gray-600 font-medium">Loading entry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4] overflow-hidden">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-down">
          <CheckCircle2 size={20} />
          <span className="font-bold">Entry saved successfully!</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Entry?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Are you sure you want to delete this journal entry?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen pb-24">
        {/* Header */}
        <div className={`bg-gradient-to-br ${currentMood.color} rounded-b-3xl shadow-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/journal")}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <h1 className="text-xl font-bold text-white">
              {isEditing ? "Edit Entry" : "New Entry"}
            </h1>

            {isEditing && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all shadow-lg"
              >
                <Trash2 size={20} className="text-white" />
              </button>
            )}
            {!isEditing && <div className="w-11"></div>}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 w-fit">
            <Calendar size={18} className="text-white" />
            <span className="text-sm font-medium text-white">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Mood Selector */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Smile size={20} className="text-gray-600" />
            <h3 className="font-bold text-gray-800">How are you feeling?</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  selectedMood === mood.value
                    ? `bg-gradient-to-br ${mood.color} shadow-lg scale-105 text-white`
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-semibold">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <div className="px-6 mb-6">
          <input
            type="text"
            placeholder="Entry title (optional)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white rounded-2xl px-5 py-4 text-xl font-bold text-gray-800 placeholder-gray-400 shadow-lg outline-none focus:ring-4 focus:ring-amber-200 transition-all"
            maxLength={200}
          />
        </div>

        {/* Content Input */}
        <div className="px-6 mb-6">
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] bg-white rounded-2xl px-5 py-4 text-gray-700 placeholder-gray-400 shadow-lg outline-none focus:ring-4 focus:ring-amber-200 transition-all resize-none leading-relaxed"
            maxLength={10000}
          />
          <p className="text-xs text-gray-500 mt-2 text-right">
            {content.length} / 10,000 characters
          </p>
        </div>

        {/* Tags */}
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={18} className="text-gray-600" />
            <h3 className="font-bold text-gray-800">Tags</h3>
          </div>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              className="flex-1 bg-white rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 shadow-lg outline-none focus:ring-4 focus:ring-amber-200 transition-all"
            />
            <button
              onClick={handleAddTag}
              className="px-6 py-3 bg-amber-400 text-white rounded-2xl font-bold shadow-lg hover:bg-amber-500 active:scale-95 transition-all"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center hover:bg-amber-300 active:scale-90 transition-all"
                  >
                    <span className="text-xs">×</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f8f5f2] via-[#f8f5f2] to-transparent pointer-events-none z-30">
        <button
          onClick={handleSave}
          disabled={saving || !content.trim()}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-all pointer-events-auto"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={24} />
              {isEditing ? "Update Entry" : "Save Entry"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default JournalEditor;

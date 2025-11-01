import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "../../services/socket.service";
import BackArrow from "../../assets/Icons/Back Arrow.svg";

interface ChatPreview {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ChatHome() {
  const [chats, setChats] = useState<
    ChatPreview[]
  >([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initializeAndLoadChats =
      async () => {
        try {
          await socketService.connect();
          if (!mounted) return;

          const handleAllChats = (
            ...args: unknown[]
          ) => {
            const data = args[0] as
              | { chats: ChatPreview[] }
              | undefined;
            if (
              mounted &&
              data?.chats
            ) {
              setChats(data.chats);
              setLoading(false);
            }
          };

          const handleError = (
            ...args: unknown[]
          ) => {
            const data = args[0] as
              | { message: string }
              | undefined;
            if (
              mounted &&
              data?.message
            ) {
              setError(data.message);
              setLoading(false);
            }
          };

          socketService.on(
            "chat:all-chats",
            handleAllChats
          );
          socketService.on(
            "chat:error",
            handleError
          );

          socketService.emit(
            "chat:get-all",
            {}
          );

          return () => {
            socketService.off(
              "chat:all-chats",
              handleAllChats
            );
            socketService.off(
              "chat:error",
              handleError
            );
          };
        } catch (error) {
          console.error(
            "Failed to initialize chat:",
            error
          );
          if (mounted) {
            setError(
              "Failed to connect to chat server"
            );
            setLoading(false);
          }
        }
      };

    initializeAndLoadChats();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4A7C59] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Loading conversations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-600 mb-4">
            {error}
          </p>
          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#4A7C59] to-[#5B9368] px-6 py-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() =>
            navigate("/home")
          }
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 hover:bg-white/30 transition-all"
        >
          <img
            src={BackArrow}
            alt="Back"
            className="w-5 h-5 brightness-0 invert"
          />
        </button>

        <h1 className="text-white text-3xl font-bold mb-3">
          My Conversations
        </h1>

        <div className="flex gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-lg">
              💬
            </span>
            <span className="font-medium">
              {chats.length} Total
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-lg">
              📅
            </span>
            <span className="font-medium">
              {
                chats.filter((c) => {
                  const today =
                    new Date();
                  const chatDate =
                    new Date(
                      c.updatedAt
                    );
                  return (
                    chatDate.getMonth() ===
                    today.getMonth()
                  );
                }).length
              }{" "}
              This Month
            </span>
          </div>
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="px-4 py-4 space-y-3">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() =>
                navigate(
                  `/chat/${chat._id}`
                )
              }
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#4A7C59]/30 active:scale-[0.98]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-teal-400 flex-shrink-0 shadow-sm" />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate mb-1">
                    {chat.title}
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span>🕒</span>
                    {new Date(
                      chat.updatedAt
                    ).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete/menu
                  }}
                  className="text-gray-400 hover:text-gray-600 text-lg p-1 hover:bg-gray-100 rounded-full transition-all"
                >
                  ⋮
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-4">
              💭
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Start a new conversation
              with Dr. Mate
            </p>
            <button
              onClick={() =>
                navigate("/chat/new")
              }
              className="px-6 py-3 bg-gradient-to-r from-[#4A7C59] to-[#5B9368] text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() =>
          navigate("/chat/new")
        }
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#4A7C59] to-[#5B9368] hover:brightness-110 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95 z-50"
        aria-label="New Chat"
      >
        +
      </button>
    </div>
  );
}

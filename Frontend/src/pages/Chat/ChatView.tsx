import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socketService } from "../../services/socket.service";
import ChatInput from "./components/ChatInput";
import MessageBubble from "./components/MessageBubble";
import TypingIndicator from "./components/TypingIndicator";
import ChatHeader from "./components/ChatHeader";
import ErrorBanner from "./components/ErrorBanner";
import MindMatesRobot from "../../assets/Images/Chat/MindMates AI Robot.svg";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string | Date;
}

interface Chat {
  _id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

export default function ChatView() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [chat, setChat] = useState<Chat | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasLoadedHistory = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (isUserAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserAtBottom]);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    setIsUserAtBottom(scrollHeight - scrollTop - clientHeight < 50);
  }, []);

  // Initialize socket connection and set up listeners FIRST
  useEffect(() => {
    let mounted = true;

    const initializeSocket = async () => {
      try {
        await socketService.connect();
        if (mounted) {
          setIsConnected(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to connect socket:", error);
        if (mounted) {
          setError("Failed to connect to chat server");
          setIsLoading(false);
        }
      }
    };

    initializeSocket();

    return () => {
      mounted = false;
    };
  }, []);

  // Set up event listeners
  useEffect(() => {
    const onConnect = () => {
      console.log("📡 Connected to chat server");
      setIsConnected(true);
      setError(null);

      // Load chat history if we have a chatId and haven't loaded yet
      if (chatId && chatId !== "new" && !hasLoadedHistory.current) {
        console.log("📥 Loading chat history for:", chatId);
        socketService.emit("chat:get-history", { chatId });
        hasLoadedHistory.current = true;
      }
    };

    const onDisconnect = () => {
      console.log("📡 Disconnected from chat server");
      setIsConnected(false);
      setError("Connection lost, reconnecting...");
    };

    const onChatHistory = (data: { chat: Chat }) => {
      console.log("📥 Received chat history:", data.chat);
      if (data.chat) {
        setChat(data.chat);
        setError(null);
        setIsLoading(false);
      }
    };

    const onMessageReceived = (data: { chatId: string; message: Message }) => {
      console.log("📨 Message received:", data);

      setChat((prev) => {
        // If this is a new chat, update the chatId
        if (!prev && data.chatId) {
          // Navigate to the new chat URL
          navigate(`/chat/${data.chatId}`, { replace: true });
          return {
            _id: data.chatId,
            title: data.message.content.substring(0, 50),
            messages: [data.message],
            updatedAt: new Date(),
          };
        }

        // Add to existing chat
        if (prev && prev._id === data.chatId) {
          return { ...prev, messages: [...prev.messages, data.message] };
        }

        return prev;
      });
    };

    const onAITyping = (data: { chatId: string }) => {
      console.log("⌨️ AI is typing...", data);
      setIsTyping(true);
      setStreamingMessage("");
      setError(null);
    };

    const onAIChunk = (data: { chatId: string; chunk: string }) => {
      setStreamingMessage((prev) => prev + data.chunk);
    };

    const onAIComplete = (data: { chatId: string; message: Message }) => {
      console.log("✅ AI response complete");
      setIsTyping(false);
      setStreamingMessage("");

      setChat((prev) => {
        if (prev && prev._id === data.chatId) {
          return { ...prev, messages: [...prev.messages, data.message] };
        }
        return prev;
      });
    };

    const onError = (data: { message: string }) => {
      console.error("❌ Chat error:", data.message);
      setError(data.message);
      setIsTyping(false);
      setStreamingMessage("");
    };

    // Attach all listeners
    socketService.on("connect", onConnect);
    socketService.on("disconnect", onDisconnect);
    socketService.on("chat:history", onChatHistory);
    socketService.on("chat:message-received", onMessageReceived);
    socketService.on("chat:ai-typing", onAITyping);
    socketService.on("chat:ai-chunk", onAIChunk);
    socketService.on("chat:ai-complete", onAIComplete);
    socketService.on("chat:error", onError);

    // If socket is already connected, trigger onConnect
    if (socketService.isConnected()) {
      onConnect();
    }

    // Cleanup listeners on unmount
    return () => {
      socketService.off("connect", onConnect);
      socketService.off("disconnect", onDisconnect);
      socketService.off("chat:history", onChatHistory);
      socketService.off("chat:message-received", onMessageReceived);
      socketService.off("chat:ai-typing", onAITyping);
      socketService.off("chat:ai-chunk", onAIChunk);
      socketService.off("chat:ai-complete", onAIComplete);
      socketService.off("chat:error", onError);
    };
  }, [chatId, navigate]);

  // Reset hasLoadedHistory when chatId changes
  useEffect(() => {
    hasLoadedHistory.current = false;
    setIsLoading(true);

    // Load history if we have a valid chatId and socket is connected
    if (chatId && chatId !== "new" && socketService.isConnected()) {
      console.log("📥 Loading chat history for:", chatId);
      socketService.emit("chat:get-history", { chatId });
      hasLoadedHistory.current = true;
    } else if (chatId === "new") {
      setIsLoading(false);
      setChat(null);
    }
  }, [chatId]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages.length, streamingMessage, scrollToBottom]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!message.trim() || !isConnected || isTyping) {
        console.warn("Cannot send message:", {
          isEmpty: !message.trim(),
          isConnected,
          isTyping,
        });
        return;
      }

      console.log("📤 Sending message:", message);

      socketService.emit("chat:send-message", {
        chatId: chatId === "new" || !chatId ? undefined : chatId,
        message: message.trim(),
      });
    },
    [chatId, isConnected, isTyping]
  );

  if (isLoading && chatId !== "new") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4A7C59] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <ChatHeader
        title={chat?.title || "New Conversation"}
        onBack={() => navigate("/chat")}
        isConnected={isConnected}
      />

      {/* Error Banner */}
      {error && (
        <ErrorBanner message={error} onDismiss={() => setError(null)} />
      )}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {/* Enhanced Empty State */}
        {!chat?.messages.length && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 animate-fade-in">
            {/* Robot illustration */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
              <img
                src={MindMatesRobot}
                alt="MindMates AI Companion"
                className="w-40 h-40 relative animate-float drop-shadow-xl"
              />
            </div>

            {/* Welcome message */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hi there! I'm Dr. Mate
            </h2>

            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
              Your compassionate AI companion. I'm here to listen, support, and
              guide you through whatever's on your mind.
            </p>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
              <button
                onClick={() => sendMessage("I'm feeling anxious today")}
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all hover:shadow-md active:scale-95"
              >
                <span className="text-2xl">😟</span>
                <span className="text-xs text-gray-700 font-medium">
                  Feeling Anxious
                </span>
              </button>

              <button
                onClick={() => sendMessage("I need stress relief tips")}
                className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-all hover:shadow-md active:scale-95"
              >
                <span className="text-2xl">🧘</span>
                <span className="text-xs text-gray-700 font-medium">
                  Stress Relief
                </span>
              </button>

              <button
                onClick={() => sendMessage("I want to talk about my day")}
                className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-all hover:shadow-md active:scale-95"
              >
                <span className="text-2xl">💭</span>
                <span className="text-xs text-gray-700 font-medium">
                  Talk It Out
                </span>
              </button>

              <button
                onClick={() => sendMessage("Give me motivation")}
                className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-all hover:shadow-md active:scale-95"
              >
                <span className="text-2xl">✨</span>
                <span className="text-xs text-gray-700 font-medium">
                  Need Motivation
                </span>
              </button>
            </div>

            {/* Gentle reminder */}
            <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-sm">
              <span className="text-lg">💡</span>
              <p className="text-xs text-amber-800 text-left leading-relaxed">
                <strong>Reminder:</strong> I'm an AI companion, not a licensed
                therapist. For crisis support, please contact emergency services
                or a mental health professional.
              </p>
            </div>
          </div>
        ) : (
          <>
            {chat?.messages.map((msg, i) => {
              const message = {
                ...msg,
                timestamp:
                  typeof msg.timestamp === "string"
                    ? new Date(msg.timestamp)
                    : msg.timestamp,
              };
              return (
                <MessageBubble
                  key={msg.id || i}
                  message={message}
                  showTimestamp={true}
                />
              );
            })}

            {/* Streaming message */}
            {isTyping && streamingMessage && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0 shadow-md">
                  AI
                </div>
                <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%] shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {streamingMessage}
                    <span className="inline-block w-1 h-4 bg-blue-500 ml-1 animate-pulse">
                      |
                    </span>
                  </p>
                </div>
              </div>
            )}

            {isTyping && !streamingMessage && <TypingIndicator />}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {!isUserAtBottom && (
        <button
          onClick={() => {
            setIsUserAtBottom(true);
            scrollToBottom();
          }}
          className="absolute bottom-24 right-6 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 z-10"
          aria-label="Scroll to bottom"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}

      {/* Input Area */}
      <ChatInput
        onSendMessage={sendMessage}
        disabled={!isConnected || isTyping}
        placeholder={
          !isConnected
            ? "Connecting..."
            : isTyping
            ? "AI is responding..."
            : "Share what's on your mind..."
        }
      />
    </div>
  );
}

import React from 'react';
import { ChatPreview } from '../../types/chat.types';

interface ChatListProps {
  chats: ChatPreview[];
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  onDeleteChat,
  onNewChat,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-6 rounded-b-3xl shadow-lg">
        <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white mb-4">
          ←
        </button>
        <h1 className="text-white text-3xl font-bold mb-3">My Conversations</h1>
        <div className="flex gap-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <span>{chats.length} Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <span>
              {chats.filter(c => {
                const today = new Date();
                const chatDate = new Date(c.updatedAt);
                return chatDate.getMonth() === today.getMonth();
              }).length} This Month
            </span>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-700 font-semibold">Recent ({chats.slice(0, 4).length})</h3>
        </div>

        {chats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No conversations yet</p>
            <button
              onClick={onNewChat}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full hover:shadow-lg transition"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => onSelectChat(chat._id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-300 to-teal-400 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate mb-1">
                    {chat.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat._id);
                  }}
                  className="text-gray-400 hover:text-red-500 text-lg"
                >
                  ⋮
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition"
        >
          + New Conversation
        </button>
      </div>
    </div>
  );
};

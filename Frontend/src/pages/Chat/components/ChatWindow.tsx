import React, { useState, useRef, useEffect } from 'react';
import { IChat } from '../../../types/chat.types';
import MessageBubble from './MessageBubble';
import TypingIndicator  from './TypingIndicator';

interface ChatWindowProps {
  chat: IChat | null;
  isTyping: boolean;
  streamingMessage: string;
  onSendMessage: (message: string, chatId?: string) => void;
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  isTyping,
  streamingMessage,
  onSendMessage,
  onBack,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, isTyping, streamingMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    onSendMessage(inputMessage, chat?._id);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-4 flex items-center gap-3 shadow-md">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          ←
        </button>
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg">
            {chat?.title || 'New Conversation'}
          </h2>
          <p className="text-white/80 text-xs">Mental Health Companion</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
        {chat?.messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {/* Streaming message preview */}
        {streamingMessage && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
              AI
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[70%]">
              <p className="text-sm whitespace-pre-wrap break-words">{streamingMessage}</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="px-4 py-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};

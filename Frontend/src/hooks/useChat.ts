import { useState, useEffect, useCallback, useRef } from 'react';
import { socketService } from '../services/socket.service';
import { IChat, IMessage, ChatPreview } from '../types/chat.types';

export const useChat = (token: string) => {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const socketRef = useRef(socketService.getSocket());

  // Initialize socket connection
  useEffect(() => {
    if (!token) return;

    const socket = socketService.connect(token);
    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Listen for all chats
    socket.on('chat:all-chats', (data: { chats: ChatPreview[] }) => {
      setChats(data.chats);
    });

    // Listen for chat history
    socket.on('chat:history', (data: { chat: IChat }) => {
      setCurrentChat(data.chat);
    });

    // Listen for user message received
    socket.on('chat:message-received', (data: { chatId: string; message: IMessage }) => {
      setCurrentChat((prev) => {
        if (!prev || prev._id !== data.chatId) return prev;
        return {
          ...prev,
          messages: [...prev.messages, data.message],
        };
      });
    });

    // Listen for AI typing indicator
    socket.on('chat:ai-typing', () => {
      setIsTyping(true);
      setStreamingMessage('');
    });

    // Listen for AI response chunks (streaming)
    socket.on('chat:ai-chunk', (data: { chatId: string; chunk: string }) => {
      setStreamingMessage((prev) => prev + data.chunk);
    });

    // Listen for AI response complete
    socket.on('chat:ai-complete', (data: { chatId: string; message: IMessage }) => {
      setIsTyping(false);
      setStreamingMessage('');
      
      setCurrentChat((prev) => {
        if (!prev || prev._id !== data.chatId) return prev;
        return {
          ...prev,
          messages: [...prev.messages, data.message],
        };
      });
    });

    // Listen for chat deleted
    socket.on('chat:deleted', (data: { chatId: string }) => {
      setChats((prev) => prev.filter((chat) => chat._id !== data.chatId));
      if (currentChat?._id === data.chatId) {
        setCurrentChat(null);
      }
    });

    // Listen for errors
    socket.on('chat:error', (data: { message: string }) => {
      setError(data.message);
      setIsTyping(false);
    });

    // Load all chats on connect
    socket.emit('chat:get-all');

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat:all-chats');
      socket.off('chat:history');
      socket.off('chat:message-received');
      socket.off('chat:ai-typing');
      socket.off('chat:ai-chunk');
      socket.off('chat:ai-complete');
      socket.off('chat:deleted');
      socket.off('chat:error');
    };
  }, [token]);

  const sendMessage = useCallback((message: string, chatId?: string) => {
    if (!socketRef.current || !message.trim()) return;
    
    socketRef.current.emit('chat:send-message', {
      chatId,
      message: message.trim(),
    });
  }, []);

  const loadChatHistory = useCallback((chatId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('chat:get-history', { chatId });
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('chat:delete', { chatId });
  }, []);

  const refreshChats = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('chat:get-all');
  }, []);

  return {
    chats,
    currentChat,
    isTyping,
    streamingMessage,
    isConnected,
    error,
    sendMessage,
    loadChatHistory,
    deleteChat,
    refreshChats,
    setCurrentChat,
  };
};

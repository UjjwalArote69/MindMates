// src/services/socket.service.ts
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private connectionPromise: Promise<Socket> | null = null;

  async connect(token?: string): Promise<Socket> {
    // Return existing connection if already connected
    if (this.socket?.connected) {
      console.log('♻️ Using existing connection');
      return this.socket;
    }

    // Return pending connection if connecting
    if (this.connectionPromise) {
      console.log('⏳ Waiting for pending connection');
      return this.connectionPromise;
    }

    // Get token from localStorage if not provided
    const authToken = token || localStorage.getItem('token');
    
    if (!authToken) {
      console.error('❌ No token available for socket authentication');
      throw new Error('Authentication token required');
    }

    console.log('🔌 Connecting socket with token:', authToken.substring(0, 20) + '...');

    this.connectionPromise = new Promise((resolve, reject) => {
      this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: { token: authToken },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Connection success
      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket?.id);
        this.connectionPromise = null;
        resolve(this.socket!);
      });

      // Connection error
      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        this.connectionPromise = null;
        reject(error);
      });

      // Disconnection
      this.socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
      });

      // If already connected, resolve immediately
      if (this.socket.connected) {
        this.connectionPromise = null;
        resolve(this.socket);
      }
    });

    return this.connectionPromise;
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.connectionPromise = null;
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      console.log('📤 Emitting:', event, data);
      this.socket.emit(event, data);
    } else {
      console.error('❌ Socket not connected, cannot emit:', event);
      console.log('💡 Attempting to reconnect...');
      this.connect().then(() => {
        this.socket?.emit(event, data);
      });
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.warn('⚠️ Socket not initialized, cannot attach listener for:', event);
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getSocket() {
    return this.socket;
  }

  isConnected() {
    return this.socket?.connected || false;
  }

  // Wait for connection to be ready
  async waitForConnection(timeout = 10000): Promise<boolean> {
    if (this.socket?.connected) return true;

    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(false), timeout);
      
      if (this.socket) {
        this.socket.once('connect', () => {
          clearTimeout(timer);
          resolve(true);
        });
      } else {
        clearTimeout(timer);
        resolve(false);
      }
    });
  }
}

export const socketService = new SocketService();

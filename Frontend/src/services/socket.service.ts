import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private connectionPromise: Promise<Socket> | null = null;

  // Get the correct backend URL
  private getServerURL(): string {
    // For production, use environment variable
    if (import.meta.env.PROD) {
      return import.meta.env.VITE_API_URL || 'https://mindmates-l2ba.onrender.com';
    }
    // For development
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  async connect(token?: string): Promise<Socket> {
    if (this.socket?.connected) {
      console.log('♻️ Using existing connection');
      return this.socket;
    }

    if (this.connectionPromise) {
      console.log('⏳ Waiting for pending connection');
      return this.connectionPromise;
    }

    const authToken = token || localStorage.getItem('token');
    
    if (!authToken) {
      console.error('❌ No token available for socket authentication');
      throw new Error('Authentication token required');
    }

    const serverURL = this.getServerURL();
    console.log('🔌 Connecting to Socket.IO server:', serverURL);

    this.connectionPromise = new Promise((resolve, reject) => {
      this.socket = io(serverURL, {
        auth: { token: authToken },
        
        // Transport configuration - try websocket first, fall back to polling
        transports: ['websocket', 'polling'],
        upgrade: true,
        
        // Reconnection settings
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        
        // Timeout settings
        timeout: 20000,
        
        // Auto-connect
        autoConnect: true,
        
        // Additional options for production
        withCredentials: true,
        forceNew: false,
      });

      // Connection success
      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket?.id);
        console.log('   Transport:', this.socket?.io.engine.transport.name);
        this.connectionPromise = null;
        resolve(this.socket!);
      });

      // Connection error
      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error.message);
        console.error('   Server URL:', serverURL);
        console.error('   Full error:', error);
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

  // Rest of your methods...
  
  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.connectionPromise = null;
  }

  emit<T = unknown>(event: string, data: T): boolean {
  if (this.socket?.connected) {
    console.log('📤 Emitting:', event);
    this.socket.emit(event, data);
    return true;
  } else {
    console.error('❌ Socket not connected, cannot emit:', event);
    return false;
  }
}


  on(event: string, callback: (...args: unknown[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.warn('⚠️ Socket not initialized, cannot attach listener for:', event);
    }
  }

  off(event: string, callback?: (...args: unknown[]) => void) {
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

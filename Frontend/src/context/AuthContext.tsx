// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/user.service";

interface AuthContextType {
  user: any;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    // optionally: clear cookies with a logout API
  };

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use auth
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

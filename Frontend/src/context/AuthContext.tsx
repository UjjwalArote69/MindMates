// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  refreshUser: () => void; // optional: to refresh after login
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setUser(null); // not logged in → expected
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

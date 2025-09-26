// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

type AuthContextType = {
  user: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          setUser(null); // User not logged in → expected
        } else {
          console.error(err); // Other unexpected errors
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

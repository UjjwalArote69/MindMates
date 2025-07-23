// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = axios
      .get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    console.log(userData);
  }, []);

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
          <img src={user.avatar} className="rounded-full mt-4 w-24 h-24" />
          <p className="mt-2 text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

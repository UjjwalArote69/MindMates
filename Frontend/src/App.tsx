// src/App.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Onboarding route - logged in */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
          <Onboarding />
           </ProtectedRoute>
        }
      />

      {/* Home route - logged in */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
          <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Hero from "./pages/Hero";
import Auth from "./pages/Authentication/Auth";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import ProfileHome from "./pages/Profile/ProfileHome";
import PersonalInfo from "./pages/Profile/PersonalInfo";
import Emergency from "./pages/Profile/Emergency";
import Feedback from "./pages/Profile/Feedback";
import Language from "./pages/Profile/Language";
import HelpCenter from "./pages/Profile/HelpCenter";
import InviteFriends from "./pages/Profile/InviteFriends";
import CloseAccount from "./pages/Profile/CloseAccount";

import Chat from "./pages/Chat/Chat";
import ChatTemp from "./pages/Chat/ChatTemp";
import ChatList from "./pages/Chat/ChatList";
import ChatSingle from "./pages/Chat/ChatSingle";
import ChatIntro from "./pages/Chat/ChatIntro";
import ChatLimit from "./pages/Chat/ChatLimit";
import UpgradePlan from "./pages/Chat/UpgradePlan";

import Stats from "./pages/Stats/Stats";
import StatsHome from "./pages/Stats/StatsHome";
import Mood from "./pages/Stats/Mood";
import MindScore from "./pages/Stats/MindScore";
import MindfulExercise from "./pages/Stats/MindfulExercise";
import SleepAnalysis from "./pages/Stats/SleepAnalysis";
import { useUserStore } from "./store/userStore";
import GoogleCallback from "./pages/Authentication/GoogleCallback";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  const { fetchUser, initialized, loading } = useUserStore();

  useEffect(() => {
    // fetch only if user is not already loaded
    if (!initialized) {
      fetchUser();
    }
  }, [initialized]); // ✅ no dependency on `loading` or `user`

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Register />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="google/callback" element={<GoogleCallback />} />
      </Route>

      {/* Onboarding route - logged in */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Home route - logged in */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
        <Route index element={<ProfileHome />} />
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="language" element={<Language />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="invite" element={<InviteFriends />} />
        <Route path="delete" element={<CloseAccount />} />
      </Route>

      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>}>
        <Route index element={<ChatTemp />} />
        <Route path="list" element={<ChatList />} />
        <Route path=":id" element={<ChatSingle />} />
        <Route path="intro" element={<ChatIntro />} />
        <Route path="limit" element={<ChatLimit />} />
        <Route path="upgrade" element={<UpgradePlan />} />
      </Route>

      <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>}>
        <Route index element={<StatsHome />} />
        <Route path="mood" element={<Mood />} />
        <Route path="mindscore" element={<MindScore />} />
        <Route path="exercise" element={<MindfulExercise />} />
        <Route path="sleep" element={<SleepAnalysis />} />
      </Route>
    </Routes>
  );
}

export default App;

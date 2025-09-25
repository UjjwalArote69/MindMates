// src/App.tsx
import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/shared/ProtectedRoute";
import Login from "./pages/Authentication/Login";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home/Home";
import Hero from "./pages/Hero";
import Register from "./pages/Authentication/Register";
import Profile from "./pages/Profile/Profile";
import PersonalInfo from "./pages/Profile/PersonalInfo";
import Emergency from "./pages/Profile/Emergency";
import Feedback from "./pages/Profile/Feedback";
import Language from "./pages/Profile/Language";
import HelpCenter from "./pages/Profile/HelpCenter";
import Chat from "./pages/Chat/Chat";
import ChatList from "./pages/Chat/ChatList";
import ChatSingle from "./pages/Chat/ChatSingle";
import ChatIntro from "./pages/Chat/ChatIntro";
import ChatLimit from "./pages/Chat/ChatLimit";
import UpgradePlan from "./pages/Chat/UpgradePlan";
import ProfileHome from "./pages/Profile/ProfileHome";
import Auth from "./pages/Authentication/Auth";
import Stats from "./pages/Stats/Stats";
import StatsHome from "./pages/Stats/StatsHome";
// import StressLevel from "./pages/Stats/StressLevel";
import MindScore from "./pages/Stats/MindScore";
import MindfulExercise from "./pages/Stats/MindfulExercise";
import SleepAnalysis from "./pages/Stats/SleepAnalysis";
// import MoodStats from "./pages/Stats/Mood_n_Stress";
// import Mood_n_Stress from "./pages/Stats/Mood_n_Stress";
import Mood from "./pages/Stats/Mood";
import InviteFriends from "./pages/Profile/InviteFriends";
import CloseAccount from "./pages/Profile/CloseAccount";
import ChatTemp from "./pages/Chat/ChatTemp";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Hero />} />

      <Route path="/auth" element={<Auth />}>
        <Route index element={<Register />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

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

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfileHome />} /> {/* /profile */}
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
        <Route path="list" element={<ChatList />} /> {/* /chat */}
        <Route path=":id" element={<ChatSingle />} /> {/* /chat/123 */}
        <Route path="intro" element={<ChatIntro />} /> {/* /chat/intro */}
        <Route path="limit" element={<ChatLimit />} /> {/* /chat/limit */}
        <Route path="upgrade" element={<UpgradePlan />} /> {/* /chat/upgrade */}
      </Route>

      <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>}>
        <Route index element={<StatsHome />} />
        <Route path="mood" element={<Mood />} />
        {/* <Route path="stres" element={<StressLevel/>}/> */}
        <Route path="mindscore" element={<MindScore />} />
        <Route path="exercise" element={<MindfulExercise />} />
        <Route path="sleep" element={<SleepAnalysis />} />
      </Route>
    </Routes>
  );
}

export default App;

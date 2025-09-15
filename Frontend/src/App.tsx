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
          // <ProtectedRoute>
          <Onboarding />
          //  {/* </ProtectedRoute> */}
        }
      />

      {/* Home route - logged in */}
      <Route
        path="/home"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      {/* <Route
        path="/chat-intro"
        element={
          // <ProtectedRoute>
          <ChatIntroduction />
          // </ProtectedRoute>
        }
      /> */}

      <Route
        path="/profile"
        element={
          // <ProtectedRoute>
          <Profile />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/personal-info"
        element={
          // <ProtectedRoute>
          <PersonalInfo />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/emergency"
        element={
          // <ProtectedRoute>
          <Emergency />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/feedback"
        element={
          // <ProtectedRoute>
          <Feedback />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/language"
        element={
          // <ProtectedRoute>
          <Language />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile/help"
        element={
          // <ProtectedRoute>
          <HelpCenter />
          // </ProtectedRoute>
        }
      />
      <Route path="/chat" element={<Chat />}>
        <Route index element={<ChatList />} /> {/* /chat */}
        <Route path=":id" element={<ChatSingle />} /> {/* /chat/123 */}
        <Route path="intro" element={<ChatIntro />} /> {/* /chat/intro */}
        <Route path="limit" element={<ChatLimit />} /> {/* /chat/limit */}
        <Route path="upgrade" element={<UpgradePlan />} /> {/* /chat/upgrade */}
      </Route>
    </Routes>
  );
}

export default App;

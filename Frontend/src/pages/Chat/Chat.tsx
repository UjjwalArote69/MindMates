// src/pages/Chat/Chat.tsx
import { Outlet } from "react-router-dom";

function Chat() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Could add a shared Chat Navbar/Header here */}
      <Outlet />
    </div>
  );
}

export default Chat;

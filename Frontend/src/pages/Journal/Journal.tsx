// src/pages/Journal/Profile.tsx
import { Outlet } from "react-router-dom";

const Journal = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
};

export default Journal;

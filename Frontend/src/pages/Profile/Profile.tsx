// src/pages/Profile/Profile.tsx
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      {/* Common profile layout (background, navbar, etc.) */}
      <Outlet /> {/* Nested routes will render here */}
      {/* <Navbar /> */}
    </div>
  );
};

export default Profile;

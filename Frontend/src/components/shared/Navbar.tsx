import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import HomeNotActiveIcon from "../../assets/Icons/Home Icon Not Active.svg";
import HomeActiveIcon from "../../assets/Icons/Home Icon Active.svg";
import MessageNotActiveIcon from "../../assets/Icons/Message Icon Not Active.svg";
import MessageActiveIcon from "../../assets/Icons/Message Icon Active.svg";
import ProfileNotActiveIcon from "../../assets/Icons/Profile Icon Not Active.svg";
import ProfileActiveIcon from "../../assets/Icons/Profile Icon Active.svg";
import MetricsNotActiveIcon from "../../assets/Icons/Metrics Icon Not Active.svg";
import MetricsActiveIcon from "../../assets/Icons/Metrics Icon Active.svg";
import PlusIcon from "../../assets/Icons/Plus Icon.svg";
import MindMatesLogo from "../../assets/Icons/MindMates Logo.svg";
import LogOutIcon from "../../assets/Icons/Log Out Icon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      path: "/home",
      label: "Home",
      activeIcon: HomeActiveIcon,
      inactiveIcon: HomeNotActiveIcon,
    },
    {
      path: "/stats",
      label: "Stats",
      activeIcon: MetricsActiveIcon,
      inactiveIcon: MetricsNotActiveIcon,
    },
    {
      path: "/chat",
      label: "Chat",
      activeIcon: MessageActiveIcon,
      inactiveIcon: MessageNotActiveIcon,
    },
    {
      path: "/profile",
      label: "Profile",
      activeIcon: ProfileActiveIcon,
      inactiveIcon: ProfileNotActiveIcon,
    },
  ];

  return (
    <>
      {/* ========== MOBILE BOTTOM NAVBAR (Hidden on Desktop) ========== */}
      <div className="md:hidden fixed bottom-3 w-full flex justify-center items-center z-50 px-4">
        <div className="bg-white flex items-center justify-around px-6 py-3 rounded-full shadow-lg w-full max-w-[400px] relative">
          {/* First 2 Icons */}
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`transition-all ${
                currentPath.startsWith(item.path)
                  ? "text-[#4B2E2B]"
                  : "text-gray-400 hover:text-[#4B2E2B]"
              }`}
            >
              <img
                src={
                  currentPath.startsWith(item.path)
                    ? item.activeIcon
                    : item.inactiveIcon
                }
                alt={item.label}
                className="w-6 h-6"
              />
            </button>
          ))}

          {/* Center Plus Button */}
          <button
            onClick={() => navigate("/journal")}
            className={`bg-gradient-to-br from-[#A3B763] to-[#8fa054] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform -mt-8 ${
              currentPath === "/journal"
                ? "ring-2 ring-white ring-offset-2"
                : ""
            }`}
          >
            <img
              src={PlusIcon}
              alt="Add"
              className="w-7 h-7 brightness-0 invert"
            />
          </button>

          {/* Last 2 Icons */}
          {navItems.slice(2).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`transition-all ${
                currentPath.startsWith(item.path)
                  ? "text-[#4B2E2B]"
                  : "text-gray-400 hover:text-[#4B2E2B]"
              }`}
            >
              <img
                src={
                  currentPath.startsWith(item.path)
                    ? item.activeIcon
                    : item.inactiveIcon
                }
                alt={item.label}
                className="w-6 h-6"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ IMPROVED Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[90px] bg-gradient-to-b from-[#5b4a3f] via-[#4a3a2f] to-[#5b4a3f] flex-col items-center py-8 shadow-2xl z-50">
        {/* Logo with Glow Effect */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-[#A3B763] rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          <button
            onClick={() => navigate("/home")}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10"
          >
            <img
              src={MindMatesLogo}
              alt="MindMates"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>

        {/* Navigation Icons with Tooltips */}
        <nav className="flex flex-col gap-5 flex-1 items-center">
          {navItems.map(({ path, label, activeIcon, inactiveIcon }) => {
            const isActive = currentPath.startsWith(path);
            return (
              <div
                key={path}
                className="relative group"
                onMouseEnter={() => setHoveredItem(path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute left-full ml-6 px-4 py-2 bg-white text-[#5b4a3f] text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    hoveredItem === path
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {label}
                  {/* Tooltip Arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white"></div>
                </div>

                {/* Nav Button */}
                <button
                  onClick={() => navigate(path)}
                  className={`relative w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#A3B763] to-[#8fa054] shadow-lg scale-105"
                      : "bg-white/5 hover:bg-white/10 hover:scale-105"
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}

                  <img
                    src={isActive ? activeIcon : inactiveIcon}
                    alt={label}
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? "brightness-0 invert"
                        : "brightness-0 invert opacity-60 group-hover:opacity-100"
                    }`}
                  />
                </button>
              </div>
            );
          })}

          {/* Journal Button */}
          <div
            className="relative group mt-4"
            onMouseEnter={() => setHoveredItem("journal")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Tooltip */}
            <div
              className={`absolute left-full ml-6 px-4 py-2 bg-white text-[#5b4a3f] text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap transition-all duration-300 pointer-events-none ${
                hoveredItem === "journal"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2"
              }`}
            >
              Journal
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white"></div>
            </div>

            <button
              onClick={() => navigate("/journal")}
              className={`relative w-14 h-14 bg-gradient-to-br from-[#A3B763] to-[#8fa054] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 ${
                currentPath === "/journal"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[#5b4a3f]"
                  : ""
              }`}
            >
              <img
                src={PlusIcon}
                alt="Journal"
                className="w-7 h-7 brightness-0 invert"
              />
            </button>
          </div>
        </nav>

        {/* Logout Button at Bottom */}
        <div
          className="relative group"
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {/* Tooltip */}
          <div
            className={`absolute left-full ml-6 px-4 py-2 bg-white text-red-600 text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap transition-all duration-300 pointer-events-none ${
              hoveredItem === "logout"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            Logout
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white"></div>
          </div>

          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 transition-all duration-300 hover:scale-110 group">
            <img
              src={LogOutIcon}
              alt="Logout"
              className="w-7 h-7 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

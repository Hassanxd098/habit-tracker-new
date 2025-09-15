import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  Settings,
  Menu,
  X,
  Calendar,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const data = [
    { id: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: "Habit", path: "/habit", icon: ListChecks },
    { id: "Progress", path: "/progress", icon: BarChart3 },
    { id: "Settings", path: "/settings", icon: Settings },
    { id: "Calendar", path: "/calender", icon: Calendar },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-[220px]" : "w-18"
        } h-screen bg-gray-100 shadow-md p-4 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 p-2 rounded hover:bg-gray-200 "
        >
          {isOpen ? <X size={28} /> : <Menu size={30} />}
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2">
          {data.map((elem, index) => {
            const Icon = elem.icon;
            return (
              <NavLink
                to={elem.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "justify-start gap-3 p-3" : "justify-center p-2"
                  } rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-violet-500 text-white"
                      : "hover:bg-violet-200"
                  }`
                }
              >
                {/* Bigger icon when collapsed */}
                <Icon size={isOpen ? 28 : 40} className="text-blue-900" />
                {isOpen && (
                  <span className="text-sm font-medium">{elem.id}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

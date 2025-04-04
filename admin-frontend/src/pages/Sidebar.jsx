import React, { useState } from "react";
import {
  MessageSquare,
  LogOut,
  Menu,
  X,
  User2Icon,
  SchoolIcon,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/main_logo.png";

function MenuItem({
  icon,
  text,
  active = false,
  delay = 0,
  href = "#",
  // onClick,
}) {
  // const dispatch = useDispatch();

  // const handleClick = (e) => {
  //   if (text === "Log Out") {
  //     e.preventDefault(); // Only prevent default for logout
  //     dispatch(logout());
  //   }

  //   if (onClick) onClick(); // Optional: closeSidebar
  // };

  return (
    <Link
      to={href}
      // onClick={handleClick}
      className={`group flex items-center gap-3 px-6 py-3 text-sm transition-all duration-300 animate-slide-in ${
        active ? "bg-blue-900 font-semibold" : "hover:bg-blue-800"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#003B87] text-white hover:bg-[#002d69] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 bg-[#003B87] text-white flex flex-col shadow-xl h-full z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center pt-4">
          <img
            src={logo}
            alt="IQ Nexus Logo"
            className="lg:w-50 w-32 object-contain rounded-full"
          />
        </div>

        <nav className="mt-2 space-y-1">
          <MenuItem
            icon={<User2Icon size={20} />}
            text="UPLOAD STUDENTS"
            delay={400}
            href="/upload-student-data"
            onClick={closeSidebar}
          />
          <MenuItem
            icon={<SchoolIcon size={20} />}
            text="UPLOAD SCHOOLS"
            delay={500}
            href="/upload-school-data"
            onClick={closeSidebar}
          />
        </nav>

        <div className="absolute bottom-0 left-0 w-full border-t border-blue-800 bg-[#002d69]">
          {/* <MenuItem
            icon={<Settings size={20} />}
            text="Settings"
            delay={800}
            href="/settings"
            onClick={closeSidebar}
          /> */}
          <MenuItem
            icon={<LogOut size={20} />}
            text="Log Out"
            href="/"
            delay={900}
            onClick={closeSidebar}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto md:ml-0">
        <div className="md:ml-0 mt-16 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;

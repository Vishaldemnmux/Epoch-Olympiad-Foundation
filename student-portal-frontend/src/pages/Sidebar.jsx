import React from "react";
import {
  LayoutDashboard,
  CreditCard,
  GraduationCap,
  BookOpen,
  Award,
  KeyRound,
  MessageSquare,
  PenTool,
  Settings,
  LogOut,
} from "lucide-react";
import mainLogo from "../assets/main_logo.png";
import { Outlet } from "react-router-dom";

function MenuItem({ icon, text, active = false, delay = 0, href = "#" }) {
  return (
    <a
      href={href}
      className={`group flex items-center gap-3 px-6 py-3 text-sm transition-all duration-300 animate-slide-in ${
        active ? "bg-blue-900 font-semibold" : "hover:bg-blue-800"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span>{text}</span>
    </a>
  );
}

const Sidebar = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003B87] text-white shadow-xl relative">
        <div className="flex items-center justify-center pt-4">
          <img
            src={mainLogo}
            alt="IQ Nexus Logo"
            className="w-50 object-contain rounded-full"
          />
        </div>

        <nav className="mt-2 space-y-1">
          <MenuItem
            icon={<LayoutDashboard size={20} />}
            text="DASHBOARD"
            active
            delay={0}
            href="/dashboard"
          />
          <MenuItem
            icon={<CreditCard size={20} />}
            text="ADMIT CARD"
            delay={100}
            href="/admit-card"
          />
          <MenuItem
            icon={<GraduationCap size={20} />}
            text="RESULTS"
            delay={200}
            href="/results"
          />
          <MenuItem
            icon={<BookOpen size={20} />}
            text="STUDY MATERIALS"
            delay={300}
            href="/study-materials"
          />
          <MenuItem
            icon={<Award size={20} />}
            text="CERTIFICATIONS"
            delay={400}
            href="/certificates"
          />
          <MenuItem
            icon={<KeyRound size={20} />}
            text="ANSWER KEY"
            delay={500}
            href="/answer-key"
          />
          <MenuItem
            icon={<MessageSquare size={20} />}
            text="FEEDBACK"
            delay={600}
            href="/feedback"
          />
          <MenuItem
            icon={<PenTool size={20} />}
            text="PRACTICE OMR"
            delay={700}
            href="/practice-omr"
          />
        </nav>

        <div className="absolute bottom-0 left-0 w-full border-t border-blue-800 bg-[#002d69]">
          <MenuItem
            icon={<Settings size={20} />}
            text="Settings"
            delay={800}
            href="/settings"
          />
          <MenuItem
            icon={<LogOut size={20} />}
            text="Log Out"
            delay={900}
            href="/logout"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;

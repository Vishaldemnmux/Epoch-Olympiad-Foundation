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
  Bell,
} from "lucide-react";

import mainLogo from "../assets/main_logo.png";

function App() {
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
      <main className="flex-1 p-8">
        <div className="flex justify-between items-start mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-semibold text-xl">J</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Welcome, John Doe</h2>
              <p className="text-gray-600">Your Dashboard Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>

            {/* Avatar */}
            <img
              src="https://i.pravatar.cc/100?u=john"
              alt="User Avatar"
              className="w-14 h-14 rounded-full border border-gray-300 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}

          <InfoField label="ROLL NO" value="192113" delay={0} />
          <InfoField label="STUDENT NAME" value="XYZ SHARMA" delay={100} />
          <InfoField label="FATHER'S NAME" value="MR. ABC SHARMA" delay={200} />
          <InfoField label="MOTHER'S NAME" value="MRS. EFG RANI" delay={300} />
          <InfoField label="MOBILE NO" value="9898989898" delay={400} />

          <InfoField
            label="SCHOOL NAME"
            value="EURO INTERNATIONAL SCHOOL"
            delay={500}
          />
          <InfoField label="SCHOOL CODE" value="12500011" delay={600} />
          <InfoField label="CLASS AND SECTION" value="6TH B" delay={700} />
          <InfoField
            label="CITY, STATE"
            value="GURUGRAM, HARYANA"
            delay={800}
          />
        </div>
      </main>
    </div>
  );
}

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

function InfoField({ label, value, delay = 0 }) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}

export default App;

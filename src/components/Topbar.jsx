import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  LogOut,
  User,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockNotices } from "../data/mockData";
import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar({ onMenuClick, title }) {
  const { user, role, logout, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format title if not explicitly passed
  const getDisplayTitle = () => {
    if (title) return title;
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const section = parts[1];
      return section.charAt(0).toUpperCase() + section.slice(1);
    }
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{getDisplayTitle()}</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-teal" />
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 font-sans">
              Capacity Connect Portal
            </span>
          </h2>
        </div>
      </div>

      {/* Right Controls: Notifications & User profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  System Notices ({mockNotices.length})
                </span>
                <span className="text-[11px] font-semibold text-teal-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {mockNotices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(`/${role}/notices`);
                    }}
                    className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3"
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 shrink-0">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">
                        {notice.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {notice.summary}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block font-medium">
                        {notice.date} • {notice.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate(`/${role}/notices`);
                  }}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center justify-center gap-1 mx-auto"
                >
                  <span>View All Bulletins</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt={user?.name || "User Avatar"}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || "Officer"}
              </span>
              <span className="text-[10px] font-semibold text-[#6d5cae] uppercase tracking-wide">
                {role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f3f1ff] text-[#6d5cae] border border-[#ddd7ff]">
                  Role: {role.toUpperCase()}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    switchRole();
                    navigate(`/${role === "trainee" ? "trainer" : "trainee"}/dashboard`);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between font-medium"
                >
                  <span>Switch to {role === "trainee" ? "Trainer" : "Trainee"}</span>
                  <span className="text-[10px] text-teal-600 font-bold uppercase">Toggle</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate(`/${role}/profile`);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account & Department</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  FolderDown,
  Bell,
  Users,
  Award,
  LogOut,
  ArrowLeftRight,
  X,
  ChevronRight,
  User,
  MessageSquare,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useAuth } from "../context/AuthContext";

export const defaultTraineeNav = [
  { name: "Dashboard", path: "/trainee/dashboard", icon: LayoutDashboard },
  { name: "My Profile", path: "/trainee/profile", icon: User },
  { name: "Courses", path: "/trainee/courses", icon: BookOpen },
  { name: "Resources", path: "/trainee/resources", icon: FolderDown },
  { name: "Assessments", path: "/trainee/assessments", icon: FileCheck2 },
  { name: "Feedback", path: "/trainee/feedback", icon: MessageSquare },
];

export const defaultTrainerNav = [
  { name: "Trainer Hub", path: "/trainer/dashboard", icon: LayoutDashboard },
  { name: "Course Curriculum", path: "/trainer/courses", icon: BookOpen },
  { name: "Cohort Analytics", path: "/trainer/trainees", icon: Users },
  { name: "Evaluation & Tests", path: "/trainer/assessments", icon: FileCheck2 },
  { name: "Repository Assets", path: "/trainer/resources", icon: FolderDown },
  { name: "Announcements", path: "/trainer/notices", icon: Bell },
];

export default function Sidebar({
  role = "trainee",
  navItems,
  isOpen = false,
  onClose,
}) {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const links = navItems || (role === "trainer" ? defaultTrainerNav : defaultTraineeNav);

  const handleRoleToggle = () => {
    const nextRole = switchRole();
    if (onClose) onClose();
    navigate(`/${nextRole}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <BrandLogo theme="dark" />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Group */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {role === "trainer" ? "Faculty Workspace" : "Trainee Portal"}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-[#a99bf0] border border-slate-700/60">
                {role}
              </span>
            </div>

            <nav className="space-y-1">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-slate-800/90 text-white shadow-sm border border-slate-700/80 font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg transition-colors ${
                              isActive
                                ? "bg-accent-gradient text-slate-950 shadow-xs"
                                : "text-slate-400 group-hover:text-slate-200 bg-slate-800/60"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-teal shadow-accent-glow" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Context Switcher Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">View Role</span>
              <span className="text-[10px] text-teal-400 font-mono font-bold">DEV MOCK</span>
            </div>
            <button
              onClick={handleRoleToggle}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-brand-teal" />
              <span>Switch to {role === "trainee" ? "Trainer" : "Trainee"}</span>
            </button>
          </div>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-950/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt={user?.name || "User Avatar"}
                className="w-9 h-9 rounded-full object-cover border border-slate-700 ring-2 ring-brand-teal/20 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {user?.name || "Civil Officer"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.department || "Public Administration"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

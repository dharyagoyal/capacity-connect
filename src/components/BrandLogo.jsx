import React from "react";
import { Sparkles } from "lucide-react";

export default function BrandLogo({ theme = "dark", size = "default", className = "" }) {
  const isLight = theme === "light";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 shadow-inner group">
        <div className="absolute inset-0 rounded-xl bg-accent-gradient opacity-20 blur-[6px] group-hover:opacity-40 transition-opacity" />
        <div className="w-5 h-5 rounded-md bg-accent-gradient flex items-center justify-center shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-white" />
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-bold tracking-tight leading-none">
          <span className={isLight ? "text-slate-900" : "text-white"}>Capacity</span>
          <span className="text-[#a99bf0] ml-1">Connect</span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mt-1">
          ENTERPRISE LMS
        </span>
      </div>
    </div>
  );
}

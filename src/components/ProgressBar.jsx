import React from "react";

export default function ProgressBar({
  value = 0,
  max = 100,
  variant = "gradient",
  showLabel = false,
  size = "md",
  className = "",
  label = "",
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const fillVariants = {
    gradient: "bg-accent-gradient",
    teal: "bg-[#7cc4c4]",
    orange: "bg-[#e98a35]",
    lavender: "bg-[#a99bf0]",
    emerald: "bg-emerald-500",
    blue: "bg-blue-600",
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>{label}</span>
          <span className="text-slate-700 font-bold">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            fillVariants[variant] || fillVariants.gradient
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

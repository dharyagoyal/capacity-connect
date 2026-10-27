import React from "react";

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon,
}) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-teal-50 text-teal-700 border-teal-200/80",
    lavender: "bg-[#f3f1ff] text-[#6d5cae] border-[#ddd7ff]",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    gradient: "bg-gradient-to-r from-teal-500/10 to-orange-500/10 text-slate-800 border-teal-300/40",
    dark: "bg-slate-800 text-slate-200 border-slate-700",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium gap-1",
    md: "text-xs px-2.5 py-1 font-semibold gap-1.5",
    lg: "text-sm px-3 py-1.5 font-semibold gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${
        variantStyles[variant] || variantStyles.default
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

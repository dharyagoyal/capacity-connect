import React from "react";
import Badge from "./Badge";

export default function PageHeader({
  title,
  subtitle,
  badgeText,
  badgeVariant = "lavender",
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 ${className}`}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>
          {badgeText && (
            <Badge variant={badgeVariant} size="md">
              {badgeText}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1.5 font-medium leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp = true,
  iconBg = "bg-teal-50 text-teal-600 border-teal-100",
  className = "",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md ${
                  trendUp
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                    : "text-rose-700 bg-rose-50 border border-rose-200/60"
                }`}
              >
                {trendUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border shadow-sm shrink-0 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}

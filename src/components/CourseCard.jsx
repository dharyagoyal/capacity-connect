import React from "react";
import { Clock, BookOpen, User, Star, ArrowRight, CheckCircle2, Plus } from "lucide-react";
import ProgressBar from "./ProgressBar";
import Badge from "./Badge";

export default function CourseCard({
  course,
  onAction,
  actionLabel,
  actionVariant = "default", // "default" | "enroll" | "enrolled" | "secondary"
  showProgress = true,
  onClick,
}) {
  if (!course) return null;

  const {
    title,
    description,
    trainer,
    duration,
    category,
    progress = 0,
    thumbnailColor = "from-blue-600 to-indigo-800",
    modulesCount = 6,
    rating = 4.8,
    badge,
  } = course;

  const getButtonText = () => {
    if (actionLabel) return actionLabel;
    if (actionVariant === "enrolled") return "Enrolled";
    if (actionVariant === "enroll") return "Enroll Now";
    if (progress === 100) return "Review Material";
    return "Continue Learning";
  };

  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Course Banner Header */}
      <div className={`relative h-36 bg-gradient-to-br ${thumbnailColor} p-4 flex flex-col justify-between text-white overflow-hidden`}>
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute left-10 -top-10 w-20 h-20 rounded-full bg-white/5 blur-lg pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <Badge
            variant="dark"
            size="sm"
            className="bg-black/30 backdrop-blur-md text-white border-white/20"
          >
            {category}
          </Badge>
          {badge && (
            <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-accent-gradient text-slate-950 shadow-sm">
              {badge}
            </span>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-200" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
            <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>{rating}</span>
          </div>
        </div>
      </div>

      {/* Course Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-[10px]">
                <User className="w-3 h-3 text-slate-500" />
              </div>
              <span className="font-medium truncate max-w-[130px]">{trainer}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{modulesCount} Modules</span>
            </div>
          </div>
        </div>

        {/* Progress and Action Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100">
          {showProgress && (
            <div className="mb-3">
              <ProgressBar
                value={progress}
                size="sm"
                showLabel
                label="Course Progress"
                variant={progress === 100 ? "emerald" : "gradient"}
              />
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAction) onAction(course);
            }}
            disabled={actionVariant === "enrolled"}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              actionVariant === "enrolled"
                ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
                : actionVariant === "enroll"
                ? "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                : "text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm active:scale-[0.99]"
            }`}
          >
            {actionVariant === "enrolled" ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enrolled</span>
              </>
            ) : actionVariant === "enroll" ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Enroll in Course</span>
              </>
            ) : (
              <>
                <span>{getButtonText()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

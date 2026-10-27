import React from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import { mockNotices } from "../../data/mockData";
import { Bell, Calendar, User, AlertCircle } from "lucide-react";

export default function TraineeNotices() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notice Board & Administrative Circulars"
        subtitle="Stay updated with schedule revisions, mandatory simulation drills, and conclave schedules."
        badgeText={`${mockNotices.length} Active Circulars`}
        badgeVariant="warning"
      />

      <div className="space-y-4">
        {mockNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    notice.priority === "Urgent"
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-teal-50 text-teal-600 border border-teal-200"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {notice.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {notice.author}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={notice.priority === "Urgent" ? "danger" : "lavender"}
                  size="sm"
                >
                  {notice.priority}
                </Badge>
                <Badge variant="default" size="sm">
                  {notice.category}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-4">
              {notice.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

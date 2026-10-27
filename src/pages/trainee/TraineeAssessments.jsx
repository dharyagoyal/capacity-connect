import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import { mockAssessments } from "../../data/mockData";
import {
  Calendar,
  Clock,
  HelpCircle,
  FileCheck2,
  CheckCircle,
  Play,
  ArrowRight,
  Award,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

export default function TraineeAssessments() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all"); // "all" | "pending" | "completed"
  const [search, setSearch] = useState("");

  const filteredAssessments = mockAssessments.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.subject.toLowerCase().includes(q) ||
        item.course.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = mockAssessments.filter((a) => a.status === "pending").length;
  const completedCount = mockAssessments.filter((a) => a.status === "completed").length;

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="Assessments & Certification Exams"
        subtitle="Complete periodic evaluations, verify learning milestones, and unlock competency badges."
        badgeText={`${pendingCount} Pending Tests`}
        badgeVariant="warning"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 w-full sm:w-auto">
          {[
            { id: "all", label: `All (${mockAssessments.length})` },
            { id: "pending", label: `Pending (${pendingCount})` },
            { id: "completed", label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search evaluation title or subject..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Subject-Wise Assessment Cards List */}
      <div className="space-y-4">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((asm) => {
            const isCompleted = asm.status === "completed";

            return (
              <div
                key={asm.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-soft hover:shadow-soft-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-amber-50 text-brand-orange border border-amber-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <FileCheck2 className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900">
                        {asm.subject}
                      </h3>
                      <Badge
                        variant={isCompleted ? "success" : "warning"}
                        size="sm"
                      >
                        {isCompleted ? "Evaluated & Passed" : "Pending Attempt"}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      Course: {asm.course}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        {asm.numberOfQuestions} Multiple Choice Items
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {isCompleted ? `Submitted: ${asm.submittedOn}` : `Due by: ${asm.deadline}`}
                      </span>
                      {asm.durationMinutes && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Time Limit: {asm.durationMinutes} Mins
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status / Action Side */}
                <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 self-end md:self-center shrink-0">
                  {isCompleted ? (
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Final Score
                      </span>
                      <div className="flex items-baseline gap-1 text-emerald-700">
                        <strong className="text-2xl font-black">{asm.score}%</strong>
                        <span className="text-xs font-semibold text-slate-400">/ 100</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/trainee/assessments/${asm.id}`)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-md shadow-teal-500/10 active:scale-[0.98] transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Start Assessment</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-soft">
            <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No evaluations found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try switching tabs or adjusting search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

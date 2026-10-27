import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import CourseCard from "../../components/CourseCard";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import {
  mockCourses,
  mockAssessments,
  mockNotices,
} from "../../data/mockData";
import {
  BookOpen,
  CheckCircle,
  FileCheck2,
  Award,
  Calendar,
  AlertCircle,
  Clock,
  ArrowRight,
  Bell,
  Sparkles,
} from "lucide-react";

export default function TraineeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name || "Aarav Sharma";
  const firstName = userName.split(" ")[0];

  // 3 in-progress courses (where progress > 0 and < 100, or first 3 active)
  const inProgressCourses = mockCourses
    .filter((c) => c.progress > 0 && c.progress < 100)
    .slice(0, 3);

  // Fallback to first 3 if needed
  const displayCourses = inProgressCourses.length >= 3 ? inProgressCourses : mockCourses.slice(0, 3);

  // Pending assessments
  const pendingAssessments = mockAssessments.filter((a) => a.status === "pending");

  // Helper for deadline urgency
  const getDeadlineUrgency = (deadline) => {
    return {
      label: "Action Required",
      variant: "danger",
    };
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Track your civil service learning modules, complete upcoming assessments, and inspect official circulars."
        badgeText="Trainee Dashboard"
        badgeVariant="lavender"
      >
        <button
          onClick={() => navigate("/trainee/courses")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <span>Explore All Courses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </PageHeader>

      {/* 4 StatCards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Courses Enrolled"
          value={user?.enrolledCoursesCount || 4}
          subtitle="3 active learning tracks"
          icon={BookOpen}
          iconBg="bg-teal-50 text-brand-teal border-teal-100"
          trend="+1 this month"
          trendUp={true}
          onClick={() => navigate("/trainee/courses")}
        />
        <StatCard
          title="Completed Courses"
          value={user?.completedCoursesCount || 1}
          subtitle="Full curriculum accredited"
          icon={CheckCircle}
          iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
          trend="100% score"
          trendUp={true}
          onClick={() => navigate("/trainee/courses")}
        />
        <StatCard
          title="Pending Assessments"
          value={user?.pendingAssessments || pendingAssessments.length || 2}
          subtitle="Evaluations awaiting attempt"
          icon={FileCheck2}
          iconBg="bg-amber-50 text-brand-orange border-amber-100"
          trend="Due soon"
          trendUp={false}
          onClick={() => navigate("/trainee/assessments")}
        />
        <StatCard
          title="Certificates Earned"
          value={user?.certificatesCount || 3}
          subtitle="Verified government credentials"
          icon={Award}
          iconBg="bg-purple-50 text-[#6d5cae] border-purple-100"
          trend="Dossier valid"
          trendUp={true}
          onClick={() => navigate("/trainee/profile")}
        />
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Continue Learning
            </h2>
            <p className="text-xs text-slate-500">
              Resume your modules in progress and keep skill milestones on track
            </p>
          </div>
          <button
            onClick={() => navigate("/trainee/courses")}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition-colors"
          >
            <span>View All ({mockCourses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              actionLabel="Resume Learning"
              onAction={() => navigate(`/trainee/courses/${course.id}`)}
              onClick={() => navigate(`/trainee/courses/${course.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Two-Column Grid: Upcoming Assessment Deadlines & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assessment Deadlines */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-brand-orange border border-amber-100">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Upcoming Assessment Deadlines
                  </h3>
                  <p className="text-xs text-slate-500">
                    Submit on time to maintain compliance
                  </p>
                </div>
              </div>
              <Badge variant="warning" size="sm">
                {pendingAssessments.length} Pending
              </Badge>
            </div>

            <div className="divide-y divide-slate-100 space-y-2">
              {pendingAssessments.map((assessment, idx) => {
                const urgency = getDeadlineUrgency(assessment.deadline);
                return (
                  <div
                    key={assessment.id || idx}
                    className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 p-2.5 rounded-lg transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">
                        {assessment.subject}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {assessment.course} • {assessment.numberOfQuestions} Questions
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Due: {assessment.deadline}
                        </span>
                        <Badge variant={urgency.variant} size="sm">
                          {urgency.label}
                        </Badge>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/trainee/assessments/${assessment.id}`)}
                      className="self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-xs transition-all whitespace-nowrap"
                    >
                      Start Test →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Timed computer-based MCQ evaluation</span>
            <button
              onClick={() => navigate("/trainee/assessments")}
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              See all tests →
            </button>
          </div>
        </div>

        {/* Notices & Announcements Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-brand-teal border border-teal-100">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Notices & Announcements
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official bulletins from Capacity Building Commission
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Latest 3
              </span>
            </div>

            <div className="space-y-3.5">
              {mockNotices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {notice.date}
                    </span>
                    <Badge
                      variant={notice.priority === "Urgent" ? "danger" : "lavender"}
                      size="sm"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {notice.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400">
              Departmental updates updated daily at 09:00 IST
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

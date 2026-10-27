import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import {
  mockAnalyticsData,
  mockUsers,
} from "../../data/mockData";
import {
  BookOpen,
  Users,
  FileCheck2,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrainerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const trainer = {
    ...mockUsers.trainer,
    ...user,
  };

  const recentActivity = mockAnalyticsData.recentActivity || [];
  const scoreData = mockAnalyticsData.averageScorePerCourse || [];
  const participationData = mockAnalyticsData.participationOverWeeks || [];

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title={`Welcome, ${trainer.name}`}
        subtitle="Faculty command center: monitor course benchmarks, review cohort participation trends, and track real-time trainee submissions."
        badgeText="Faculty Lead"
        badgeVariant="primary"
      >
        <button
          onClick={() => navigate("/trainer/assessments/new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Create Assessment</span>
        </button>
      </PageHeader>

      {/* 4 StatCards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Courses"
          value={trainer.activeCoursesCount || 6}
          subtitle="All curriculum units active"
          icon={BookOpen}
          iconBg="bg-teal-50 text-brand-teal border-teal-100"
          trend="Published"
          trendUp={true}
          onClick={() => navigate("/trainer/courses")}
        />
        <StatCard
          title="Total Trainees"
          value={trainer.totalTraineesCount || 148}
          subtitle="Enrolled civil officers"
          icon={Users}
          iconBg="bg-indigo-50 text-indigo-600 border-indigo-100"
          trend="+12 this month"
          trendUp={true}
          onClick={() => navigate("/trainer/participation")}
        />
        <StatCard
          title="Assessments Created"
          value={trainer.assessmentsCreatedCount || 5}
          subtitle="Periodic evaluations & tests"
          icon={FileCheck2}
          iconBg="bg-purple-50 text-[#6d5cae] border-purple-100"
          trend="2 live"
          trendUp={true}
          onClick={() => navigate("/trainer/assessments")}
        />
        <StatCard
          title="Average Performance %"
          value={`${trainer.averagePerformance || 86.4}%`}
          subtitle="Benchmark passing rate"
          icon={TrendingUp}
          iconBg="bg-amber-50 text-brand-orange border-amber-100"
          trend="+3.2% vs baseline"
          trendUp={true}
          onClick={() => navigate("/trainer/participation")}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart of Average Score Per Course */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Average Score Per Course
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation mean across curriculum tracks
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Avg: 87.8%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="course"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  tickFormatter={(val) =>
                    val.length > 12 ? `${val.substring(0, 10)}...` : val
                  }
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Average Score"]}
                />
                <Bar
                  dataKey="score"
                  fill="#7cc4c4"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Area / Line Chart of Participation Over the Last 6 Weeks */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Participation Over the Last 6 Weeks
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Active officer engagement and attendance momentum
              </p>
            </div>
            <Badge variant="success" size="sm">
              +18% Growth
            </Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={participationData}>
                <defs>
                  <linearGradient id="trainerPartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a99bf0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a99bf0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Participation Rate"]}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#a99bf0"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#trainerPartGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity List & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-soft">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
              <p className="text-xs text-slate-500">Live submissions and student engagement feed</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Live updates</span>
          </div>

          <div className="divide-y divide-slate-100 space-y-2">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="pt-3 first:pt-0 flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.avatar}
                    alt={item.user}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {item.user}{" "}
                      <span className="font-normal text-slate-500">
                        {item.action}
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Badge variant="primary" size="sm">
                    {item.score}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Shortcuts (1 Col) */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-soft border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#a99bf0] uppercase block mb-2">
                FACULTY TOOLS
              </span>
              <h4 className="text-base font-bold text-white">Create New Assessment</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Author customized multiple-choice items with dynamic rubrics and automated grading.
              </p>
            </div>

            <button
              onClick={() => navigate("/trainer/assessments/new")}
              className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Question Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Next Cohort Milestone
            </h4>
            <p className="text-xs text-slate-800 font-semibold">
              Mid-Term Evaluation Window Closes
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Due Nov 05, 2026. 148 trainees enrolled in current batch.
            </p>
            <button
              onClick={() => navigate("/trainer/participation")}
              className="mt-3 text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>Inspect Participation Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

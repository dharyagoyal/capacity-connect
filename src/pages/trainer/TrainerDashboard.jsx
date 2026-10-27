import React from "react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import { useAuth } from "../../context/AuthContext";
import {
  mockTrainees,
  mockAnalyticsData,
  mockAssessments,
} from "../../data/mockData";
import {
  Users,
  GraduationCap,
  Award,
  Star,
  Plus,
  TrendingUp,
  Mail,
  FileCheck2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrainerDashboard() {
  const { user } = useAuth();

  const traineeColumns = [
    {
      key: "name",
      label: "Trainee Officer",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={val}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div>
            <span className="font-bold text-slate-900 block">{val}</span>
            <span className="text-[11px] text-slate-400">{row.department}</span>
          </div>
        </div>
      ),
    },
    {
      key: "participation",
      label: "Attendance %",
      render: (val) => (
        <div className="w-28">
          <ProgressBar
            value={val}
            size="sm"
            showLabel
            variant={val >= 90 ? "emerald" : val >= 80 ? "teal" : "orange"}
          />
        </div>
      ),
    },
    {
      key: "averageScore",
      label: "Average Score",
      align: "right",
      render: (val) => (
        <span className="font-bold text-slate-900">{val}%</span>
      ),
    },
    {
      key: "status",
      label: "Standing",
      render: (val) => (
        <Badge
          variant={val === "Active" ? "success" : "warning"}
          size="sm"
        >
          {val}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Action",
      align: "right",
      render: (_, row) => (
        <button
          onClick={() => alert(`Reviewing dossier for: ${row.name}`)}
          className="text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          View Record
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Faculty Portal: ${user?.name || "Dr. Priya Venkatesh"}`}
        subtitle="Departmental cohort monitoring, assessment evaluations, and learning analytics."
        badgeText="Faculty Lead"
        badgeVariant="primary"
      >
        <button
          onClick={() => alert("Launching Assessment Authoring Wizard...")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>New Assessment</span>
        </button>
      </PageHeader>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Trainees"
          value={user?.assignedTrainees || 148}
          subtitle="Across 3 ministerial departments"
          icon={Users}
          iconBg="bg-teal-50 text-brand-teal border-teal-100"
          trend="+12 this month"
          trendUp={true}
        />
        <StatCard
          title="Active Cohorts"
          value={user?.activeCohorts || 3}
          subtitle="Batch 2026-A, 2026-B, 2026-C"
          icon={GraduationCap}
          iconBg="bg-purple-50 text-purple-600 border-purple-100"
        />
        <StatCard
          title="Cohort Average Score"
          value={`${user?.avgCohortScore || 86.4}%`}
          subtitle="Exceeds national benchmark (80%)"
          icon={TrendingUp}
          iconBg="bg-emerald-50 text-emerald-600 border-emerald-100"
          trend="+2.1%"
          trendUp={true}
        />
        <StatCard
          title="Trainer Rating"
          value={`${user?.rating || 4.9} / 5.0`}
          subtitle="From 230 officer reviews"
          icon={Star}
          iconBg="bg-amber-50 text-brand-orange border-amber-100"
          trend="Top 1%"
          trendUp={true}
        />
      </div>

      {/* Analytics Chart & Performance breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Department Performance Comparison
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Average evaluation scores across enrolled wings
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Mean: 87.1%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.departmentScores} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="score" fill="#7cc4c4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Grade Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trainee cohort score brackets
            </p>

            <div className="space-y-4 mt-5">
              {mockAnalyticsData.assessmentDistribution.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{item.range}</span>
                    <span>{item.count} Officers</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.count / 148) * 100}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Total 148 actively evaluated trainees.
          </div>
        </div>
      </div>

      {/* Trainees List DataTable */}
      <DataTable
        title="Enrolled Officers Roster"
        subtitle="Live participation and academic performance metrics"
        columns={traineeColumns}
        data={mockTrainees}
        searchKey="name"
        searchPlaceholder="Search officer by name..."
        itemsPerPage={6}
      />
    </div>
  );
}

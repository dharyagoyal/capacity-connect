import React, { useState, useMemo } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import ProgressBar from "../../components/ProgressBar";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { mockTrainees, mockAnalyticsData, mockCourses } from "../../data/mockData";
import {
  Users,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
  Mail,
  BookOpen,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function TrainerParticipation() {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Filter trainees based on course dropdown and search by name
  const filteredTrainees = useMemo(() => {
    return mockTrainees.filter((trainee) => {
      const matchCourse =
        selectedCourse === "All" || trainee.course === selectedCourse;
      const matchName =
        !searchQuery.trim() ||
        trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchName;
    });
  }, [selectedCourse, searchQuery]);

  const scoreDistributionData = mockAnalyticsData.scoreDistribution || [
    { range: "90-100%", count: 48, label: "Outstanding", fill: "#7cc4c4" },
    { range: "80-89%", count: 64, label: "Proficient", fill: "#a99bf0" },
    { range: "70-79%", count: 28, label: "Satisfactory", fill: "#e98a35" },
    { range: "<70%", count: 8, label: "At Risk", fill: "#f87171" },
  ];

  // Custom tooltip for score distribution bar chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-xs">
          <p className="font-bold text-[#a99bf0]">{data.range} Score Bracket</p>
          <p className="text-slate-300 mt-0.5">
            <span className="font-semibold text-white">{data.count}</span> Trainees ({data.label})
          </p>
        </div>
      );
    }
    return null;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case "At risk":
        return (
          <Badge variant="warning" size="sm">
            At risk
          </Badge>
        );
      case "Inactive":
      default:
        return (
          <Badge variant="danger" size="sm">
            Inactive
          </Badge>
        );
    }
  };

  const columns = [
    {
      key: "name",
      label: "Officer Name",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={val}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div>
            <span className="font-bold text-slate-900 block">{val}</span>
            <span className="text-[11px] text-slate-400">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "course",
      label: "Course",
      render: (val) => (
        <div className="max-w-[220px]">
          <span className="font-medium text-slate-700 block truncate" title={val}>
            {val}
          </span>
        </div>
      ),
    },
    {
      key: "participation",
      label: "Participation %",
      render: (val) => (
        <div className="w-32">
          <ProgressBar
            value={val}
            size="sm"
            showLabel
            variant={val >= 85 ? "teal" : val >= 70 ? "orange" : "rose"}
          />
        </div>
      ),
    },
    {
      key: "averageScore",
      label: "Average Score",
      align: "right",
      render: (val) => (
        <span className="font-bold text-slate-900">{Number(val).toFixed(1)}%</span>
      ),
    },
    {
      key: "completedAssessments",
      label: "Assessments Completed",
      align: "right",
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          <span>{val} completed</span>
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => getStatusBadge(val),
    },
    {
      key: "actions",
      label: "Action",
      align: "right",
      render: (_, row) => (
        <button
          onClick={() => setSelectedTrainee(row)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trainee Participation & Performance"
        subtitle="Track officer engagement rates, benchmark examination scores, and review competency standings across cohort modules."
        badgeText={`${filteredTrainees.length} Officers`}
        badgeVariant="primary"
      />

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Course Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
            >
              <option value="All">All Courses ({mockCourses.length})</option>
              {mockCourses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Name */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainee by name or email..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
        </div>

        {(selectedCourse !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCourse("All");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 self-end sm:self-center"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Recharts Bar Chart: Score Distribution */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Cohort Score Distribution Benchmark
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative examination and assignment score spread across all active trainees
            </p>
          </div>

          {/* Bracket summary pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {scoreDistributionData.map((item) => (
              <div
                key={item.range}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 font-medium"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-slate-700 font-semibold">{item.range}:</span>
                <span className="text-slate-900 font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Recharts Bar Chart */}
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scoreDistributionData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="range"
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {scoreDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || "#7cc4c4"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trainees DataTable */}
      <DataTable
        title="Enrolled Trainee Dossiers"
        subtitle={
          selectedCourse !== "All"
            ? `Displaying officers registered under "${selectedCourse}"`
            : "Master list of civil service trainees and departmental delegates"
        }
        columns={columns}
        data={filteredTrainees}
        searchKey="name"
        searchPlaceholder="Filter table rows..."
        itemsPerPage={8}
      />

      {/* Trainee Detail Modal */}
      <Modal
        isOpen={!!selectedTrainee}
        onClose={() => setSelectedTrainee(null)}
        title={selectedTrainee?.name}
        subtitle={`${selectedTrainee?.department} • ID: ${selectedTrainee?.id}`}
        footer={
          <>
            <button
              onClick={() => setSelectedTrainee(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setToast({
                  show: true,
                  message: `Feedback advisory memorandum dispatched to ${selectedTrainee?.name}.`,
                  type: "success",
                });
                setSelectedTrainee(null);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Official Feedback</span>
            </button>
          </>
        }
      >
        {selectedTrainee && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Assigned Course</span>
                <strong className="text-slate-800 text-xs block truncate mt-0.5">
                  {selectedTrainee.course}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Completed Tests</span>
                <strong className="text-slate-800 text-sm block mt-0.5">
                  {selectedTrainee.completedAssessments} Assessments
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Overall Average</span>
                <strong className="text-teal-700 text-sm block mt-0.5">
                  {selectedTrainee.averageScore}%
                </strong>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">
                  Course Engagement & Attendance
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {selectedTrainee.participation}%
                </span>
              </div>
              <ProgressBar
                value={selectedTrainee.participation}
                showLabel={false}
                size="md"
                variant={
                  selectedTrainee.participation >= 85
                    ? "teal"
                    : selectedTrainee.participation >= 70
                    ? "orange"
                    : "rose"
                }
              />
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">
                Faculty Remarks & Performance Notes:
              </span>
              <p className="text-slate-500 leading-relaxed">
                Officer demonstrates diligent analytical comprehension and participates
                consistently in group symposiums. Current pace aligns with certification milestones.
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "success" })}
      />
    </div>
  );
}

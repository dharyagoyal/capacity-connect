import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import ProgressBar from "../../components/ProgressBar";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import { mockTrainees } from "../../data/mockData";
import { Mail, Award, CheckCircle, AlertCircle, FileText, Send } from "lucide-react";

export default function TrainerTrainees() {
  const [selectedTrainee, setSelectedTrainee] = useState(null);

  const columns = [
    {
      key: "name",
      label: "Officer Name",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={val}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div>
            <span className="font-bold text-slate-900 block">{val}</span>
            <span className="text-[11px] text-slate-400">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "Ministry / Department",
      render: (val) => <span className="font-medium text-slate-700">{val}</span>,
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
      label: "Avg Grade",
      align: "right",
      render: (val) => <span className="font-bold text-slate-900">{val}%</span>,
    },
    {
      key: "status",
      label: "Dossier Standing",
      render: (val) => (
        <Badge variant={val === "Active" ? "success" : "warning"} size="sm">
          {val}
        </Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      align: "right",
      render: (_, row) => (
        <button
          onClick={() => setSelectedTrainee(row)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
        >
          View Record
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Trainee Directory"
        subtitle="Review individual officer participation rates, benchmark exam scores, and competency standing."
        badgeText={`${mockTrainees.length} Officers`}
        badgeVariant="primary"
      />

      <DataTable
        title="Active Officer Cohort (Batch 2026)"
        subtitle="Mandated capacity tracking data"
        columns={columns}
        data={mockTrainees}
        searchKey="name"
        searchPlaceholder="Search officer by name or department..."
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
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Sending official feedback memorandum to: ${selectedTrainee?.email}`);
                setSelectedTrainee(null);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Faculty Feedback</span>
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Enrolled Modules</span>
              <strong className="text-slate-800 text-sm">{selectedTrainee?.enrolledCourses} Courses</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Completed Tests</span>
              <strong className="text-slate-800 text-sm">{selectedTrainee?.completedAssessments} Tests</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Overall Average</span>
              <strong className="text-teal-700 text-sm">{selectedTrainee?.averageScore}%</strong>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 mb-1">Academic Attendance</h5>
            <ProgressBar
              value={selectedTrainee?.participation || 0}
              showLabel
              label="Session Attendance"
              size="md"
            />
          </div>

          <div className="pt-2 text-xs text-slate-600">
            <strong>Faculty Assessment Notes:</strong>
            <p className="mt-1 text-slate-500">
              Officer exhibits diligent analytical comprehension. Consistently meets assignment milestones across Digital Governance and Smart City frameworks.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

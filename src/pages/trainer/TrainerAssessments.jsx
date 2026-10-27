import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import { mockAssessments, mockMCQQuestions } from "../../data/mockData";
import { Plus, HelpCircle, FileCheck, CheckCircle2, Calendar } from "lucide-react";

export default function TrainerAssessments() {
  const [assessments, setAssessments] = useState(mockAssessments);
  const [showQuestionBank, setShowQuestionBank] = useState(false);

  const columns = [
    {
      key: "subject",
      label: "Assessment Title",
      render: (val, row) => (
        <div>
          <span className="font-bold text-slate-900 block">{val}</span>
          <span className="text-[11px] text-slate-400">{row.course}</span>
        </div>
      ),
    },
    {
      key: "deadline",
      label: "Submission Window",
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {val}
        </span>
      ),
    },
    {
      key: "numberOfQuestions",
      label: "Item Pool",
      align: "right",
      render: (val) => <span className="font-semibold text-slate-700">{val} Questions</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Badge variant={val === "completed" ? "success" : "warning"} size="sm">
          {val === "completed" ? "Evaluated" : "Active / Live"}
        </Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      align: "right",
      render: (_, row) => (
        <button
          onClick={() => alert(`Reviewing question blueprint for: ${row.subject}`)}
          className="text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          Edit Test
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evaluations & Question Authoring"
        subtitle="Manage testing standards, configure MCQ rubrics, and inspect national question blueprints."
        badgeText={`${assessments.length} Assessments`}
        badgeVariant="lavender"
      >
        <button
          onClick={() => setShowQuestionBank(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-slate-200/80 hover:bg-slate-300 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-700" />
          <span>Question Bank ({mockMCQQuestions.length})</span>
        </button>
        <button
          onClick={() => alert("Creating new assessment blueprint...")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Schedule Exam</span>
        </button>
      </PageHeader>

      <DataTable
        title="Configured Evaluations"
        subtitle="All scheduled and graded course tests"
        columns={columns}
        data={assessments}
        searchKey="subject"
        searchPlaceholder="Search assessment..."
        itemsPerPage={10}
      />

      {/* Question Bank Modal */}
      <Modal
        isOpen={showQuestionBank}
        onClose={() => setShowQuestionBank(false)}
        title="National Question Bank & Rubrics"
        subtitle="10 validated multi-choice capacity items"
        size="lg"
        footer={
          <button
            onClick={() => setShowQuestionBank(false)}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg shadow-sm"
          >
            Close Repository
          </button>
        }
      >
        <div className="space-y-4">
          {mockMCQQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  Question {idx + 1}
                </span>
                <Badge variant="primary" size="sm">
                  {q.subject}
                </Badge>
              </div>
              <p className="text-slate-800 font-medium">{q.question}</p>
              <div className="space-y-1 pl-2">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2 rounded-lg text-xs ${
                      oIdx === q.correctOptionIndex
                        ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                        : "text-slate-600"
                    }`}
                  >
                    {oIdx === q.correctOptionIndex && "✓ "}
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

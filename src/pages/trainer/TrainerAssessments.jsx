import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { mockAssessments } from "../../data/mockData";
import {
  Plus,
  Calendar,
  FileCheck2,
  Users,
  Edit3,
  BarChart2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function TrainerAssessments() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState(mockAssessments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // "edit" | "results"
  const [toast, setToast] = useState({ show: false, message: "" });

  const filteredAssessments = assessments.filter((asm) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      asm.subject.toLowerCase().includes(q) ||
      asm.course.toLowerCase().includes(q)
    );
  });

  const handleEditClick = (asm) => {
    setSelectedAssessment(asm);
    setActiveModal("edit");
  };

  const handleViewResultsClick = (asm) => {
    setSelectedAssessment(asm);
    setActiveModal("results");
  };

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="Assessment Authoring & Evaluation Management"
        subtitle="Schedule evaluations, inspect submission metrics across civil service cohorts, and author custom MCQ blueprints."
        badgeText={`${assessments.length} Created Tests`}
        badgeVariant="lavender"
      >
        <button
          onClick={() => navigate("/trainer/assessments/new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Create Assessment</span>
        </button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-soft flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search created assessments..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline-block">
          Showing {filteredAssessments.length} created evaluations
        </span>
      </div>

      {/* Table of Created Assessments */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/70 text-slate-600 uppercase font-bold tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-5">Assessment Title</th>
                <th className="py-4 px-4">Subject / Course</th>
                <th className="py-4 px-4 text-center">Questions</th>
                <th className="py-4 px-4">Deadline</th>
                <th className="py-4 px-4 text-center">Submissions</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssessments.map((asm) => (
                <tr
                  key={asm.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* Title */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900 text-sm">
                      {asm.subject}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ID: {asm.id.toUpperCase()}
                    </span>
                  </td>

                  {/* Subject / Course */}
                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-800 block">
                      {asm.course}
                    </span>
                    <Badge variant="default" size="sm" className="mt-1">
                      Mandatory Core
                    </Badge>
                  </td>

                  {/* Questions */}
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-slate-800 px-2.5 py-1 rounded-md bg-slate-100">
                      {asm.numberOfQuestions} MCQs
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {asm.deadline}
                    </span>
                  </td>

                  {/* Submissions Count */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                      <Users className="w-3.5 h-3.5" />
                      <span>{asm.submissionsCount || 110} / 148</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(asm)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleViewResultsClick(asm)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 transition-colors"
                      >
                        <BarChart2 className="w-3.5 h-3.5 text-brand-teal" />
                        <span>View Results</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Assessment Modal */}
      <Modal
        isOpen={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        title={`Edit Assessment: ${selectedAssessment?.subject}`}
        subtitle={`Course: ${selectedAssessment?.course}`}
        footer={
          <>
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setToast({
                  show: true,
                  message: `Changes to "${selectedAssessment?.subject}" saved successfully.`,
                });
                setActiveModal(null);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Assessment Title
            </label>
            <input
              type="text"
              defaultValue={selectedAssessment?.subject}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Deadline Date
              </label>
              <input
                type="date"
                defaultValue={selectedAssessment?.deadline}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Passing Marks (%)
              </label>
              <input
                type="number"
                defaultValue={75}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* View Results Modal */}
      <Modal
        isOpen={activeModal === "results"}
        onClose={() => setActiveModal(null)}
        title={`Cohort Evaluation Results`}
        subtitle={`${selectedAssessment?.subject} • ${selectedAssessment?.submissionsCount || 110} Submissions Analyzed`}
        size="lg"
        footer={
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg shadow-sm"
          >
            Close Report
          </button>
        }
      >
        <div className="space-y-5 text-xs">
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div>
              <span className="text-slate-400 block font-medium">Average Cohort Score</span>
              <strong className="text-xl font-bold text-teal-700">88.2%</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Passed Trainees</span>
              <strong className="text-xl font-bold text-emerald-600">
                {Math.round((selectedAssessment?.submissionsCount || 110) * 0.94)}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Need Retest</span>
              <strong className="text-xl font-bold text-rose-500">6</strong>
            </div>
          </div>

          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 leading-relaxed">
            <span className="font-bold block mb-1">Faculty Academic Performance Notice:</span>
            94% of submitted civil officers achieved the mandated 75% benchmark on their first attempt. Top performing department: Digital India Mission & Infrastructure.
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type="success"
        title="Assessment Updated"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

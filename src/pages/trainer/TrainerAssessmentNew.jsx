import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Toast from "../../components/Toast";
import { mockCourses } from "../../data/mockData";
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Calendar,
  BookOpen,
  Send,
  Save,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function TrainerAssessmentNew() {
  const navigate = useNavigate();

  // Top Form Metadata
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Digital Governance");
  const [course, setCourse] = useState(mockCourses[0]?.title || "");
  const [deadline, setDeadline] = useState("2026-11-20T17:00");
  const [duration, setDuration] = useState(45);

  // Dynamic Question Builder List
  const [questions, setQuestions] = useState([
    {
      id: "q-init-1",
      questionText: "What is the primary role of the Open API Policy in government digital infrastructure?",
      options: [
        "To restrict data exchange exclusively to intranet connections",
        "To encourage inter-departmental interoperability and rapid service composition",
        "To bypass multi-factor authentication protocols for civil servants",
        "To replace relational databases with flat spreadsheet files",
      ],
      correctOption: 1, // index 0, 1, 2, 3
    },
    {
      id: "q-init-2",
      questionText: "Which architecture principle mandates continuous identity and device verification?",
      options: [
        "Perimeter Network Defense",
        "Zero-Trust Network Architecture (ZTNA)",
        "Demilitarized Zone (DMZ) Routing",
        "Single Sign-On Bypass Protocol",
      ],
      correctOption: 1,
    },
  ]);

  const [toast, setToast] = useState({ show: false, message: "" });

  const subjects = [
    "Digital Governance",
    "Cloud & Infrastructure",
    "Data & Analytics",
    "Cybersecurity",
    "Administration & Finance",
    "Emerging Technologies",
  ];

  // Add new blank question card
  const handleAddQuestion = () => {
    const newQ = {
      id: `q-dynamic-${Date.now()}`,
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0,
    };
    setQuestions([...questions, newQ]);
  };

  // Delete question card
  const handleDeleteQuestion = (idToDelete) => {
    if (questions.length <= 1) {
      setToast({
        show: true,
        message: "An assessment must contain at least one evaluation question.",
      });
      return;
    }
    setQuestions(questions.filter((q) => q.id !== idToDelete));
  };

  // Update question text
  const handleQuestionTextChange = (id, text) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, questionText: text } : q))
    );
  };

  // Update specific option text
  const handleOptionChange = (qId, optIdx, text) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== qId) return q;
        const newOptions = [...q.options];
        newOptions[optIdx] = text;
        return { ...q, options: newOptions };
      })
    );
  };

  // Mark correct option
  const handleSetCorrectOption = (qId, optIdx) => {
    setQuestions(
      questions.map((q) => (q.id === qId ? { ...q, correctOption: optIdx } : q))
    );
  };

  // Save as Draft
  const handleSaveDraft = (e) => {
    e.preventDefault();
    setToast({
      show: true,
      message: `Draft "${title || "Untitled Assessment"}" saved to your faculty workspace.`,
    });
  };

  // Publish
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setToast({
        show: true,
        message: "Please enter an assessment title before publishing.",
      });
      return;
    }

    setToast({
      show: true,
      message: `Assessment "${title}" published successfully to enrolled cohorts!`,
    });

    // Short delay and redirect back to assessments list
    setTimeout(() => {
      navigate("/trainer/assessments");
    }, 1500);
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
      {/* Header with Back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/trainer/assessments")}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
          title="Back to Assessments"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <PageHeader
          title="Create New Assessment"
          subtitle="Define evaluation parameters, schedule deadlines, and dynamically author multiple-choice questions."
          badgeText="Blueprint Authoring"
          badgeVariant="primary"
          className="mb-0 pb-0 border-b-0 flex-1"
        />
      </div>

      {/* Main Metadata Configuration Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-soft space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Evaluation Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Assessment Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mid-Term Evaluation: Citizen Service Gateways & APIs"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Subject Category
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Linked Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              {mockCourses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Date-Time Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Deadline Date & Time</span>
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Duration in Minutes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Duration (Minutes)</span>
            </label>
            <input
              type="number"
              min={10}
              max={180}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="45"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Question Builder Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Question Builder ({questions.length} Questions)
            </h3>
            <p className="text-xs text-slate-500">
              Author question text, provide 4 options, and select the radio button corresponding to the correct answer.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-brand-teal" />
            <span>Add Question</span>
          </button>
        </div>

        {/* List of Dynamic Question Cards */}
        <div className="space-y-4">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-soft space-y-4"
            >
              {/* Question Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                    Q{qIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Single Choice Objective
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Prompt
                </label>
                <textarea
                  rows={2}
                  value={q.questionText}
                  onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                  placeholder="Enter the examination question or problem statement..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-2.5 pt-1">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Multiple Choice Options (Select radio for correct answer)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = q.correctOption === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-colors ${
                          isCorrect
                            ? "bg-teal-50/60 border-teal-300"
                            : "bg-slate-50/60 border-slate-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={isCorrect}
                          onChange={() => handleSetCorrectOption(q.id, optIdx)}
                          className="text-teal-600 focus:ring-teal-500 cursor-pointer"
                          title="Mark as correct answer"
                        />

                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isCorrect
                              ? "bg-teal-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {letter}
                        </span>

                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(q.id, optIdx, e.target.value)
                          }
                          placeholder={`Option ${letter}`}
                          className="flex-1 bg-transparent border-0 text-xs text-slate-800 focus:outline-none placeholder-slate-400"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Question Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-brand-teal" />
            <span>Add Another Question</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-soft flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/trainer/assessments")}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-md shadow-teal-500/10 active:scale-[0.98] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Assessment</span>
          </button>
        </div>
      </div>

      {/* Success / Feedback Toast */}
      <Toast
        show={toast.show}
        type="success"
        title="Assessment Authoring"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

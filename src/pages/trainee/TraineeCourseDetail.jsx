import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import {
  mockCourses,
  mockResources,
  mockAssessments,
} from "../../data/mockData";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  User,
  Star,
  FileText,
  Video,
  Presentation,
  Download,
  Play,
  FileCheck2,
  Calendar,
  MessageSquareQuote,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";

export default function TraineeCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find course or fallback to first course
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];

  // Tabs: "overview" | "resources" | "assessments"
  const [activeTab, setActiveTab] = useState("overview");

  // Feedback Modal State
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  // Filter resources for this course (or show related ones)
  const courseResources = mockResources.filter(
    (r) => r.course.toLowerCase() === course.title.toLowerCase()
  );
  // If none match exactly, show representative items
  const displayResources =
    courseResources.length > 0 ? courseResources : mockResources.slice(0, 3);

  // Filter assessments for this course
  const courseAssessments = mockAssessments.filter(
    (a) => a.course.toLowerCase() === course.title.toLowerCase()
  );
  const displayAssessments =
    courseAssessments.length > 0 ? courseAssessments : [mockAssessments[0]];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setIsFeedbackOpen(false);
    setToast({
      show: true,
      message: `Thank you! Your ${rating}-star review for "${course.title}" has been registered.`,
    });
    setComment("");
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-rose-500" />;
      case "ppt":
        return <Presentation className="w-4 h-4 text-amber-500" />;
      case "pdf":
      default:
        return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  // Mock Modules list
  const syllabusModules = [
    { number: "01", title: "Foundations & Institutional Architecture", duration: "45 mins", completed: true },
    { number: "02", title: "Statutory Standards & Citizen-Centric Metrics", duration: "60 mins", completed: true },
    { number: "03", title: "Applied Case Studies & Real-World Implementations", duration: "90 mins", completed: course.progress > 50 },
    { number: "04", title: "Security Governance & Best Practices", duration: "50 mins", completed: false },
    { number: "05", title: "Final Capstone Evaluation & Review", duration: "45 mins", completed: false },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/trainee/courses")}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
          title="Back to Courses"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <PageHeader
          title={course.title}
          subtitle={`Program code: ${course.id.toUpperCase()} • Lead Instructor: ${course.trainer}`}
          badgeText={course.category}
          badgeVariant="primary"
          className="mb-0 pb-0 border-b-0 flex-1"
        >
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <MessageSquareQuote className="w-4 h-4 text-brand-orange" />
            <span>Give Feedback</span>
          </button>
        </PageHeader>
      </div>

      {/* Course Hero Banner */}
      <div className={`relative rounded-2xl bg-gradient-to-r ${course.thumbnailColor} p-6 sm:p-8 text-white shadow-soft overflow-hidden`}>
        {/* Decorative blur shapes */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent-gradient text-slate-950 uppercase shadow-xs">
                {course.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-2xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-slate-100 font-medium">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-slate-200" />
              <span>{course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <User className="w-3.5 h-3.5 text-slate-200" />
              <span>{course.trainer}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{course.rating} / 5.0 Rating</span>
            </div>
          </div>
        </div>

        {/* Hero Progress Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/20 max-w-xl">
          <ProgressBar
            value={course.progress}
            size="md"
            showLabel
            label="Curriculum Progress"
            className="text-white"
          />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview & Syllabus", count: `${syllabusModules.length} Modules` },
            { id: "resources", label: "Learning Resources", count: `${displayResources.length} Files` },
            { id: "assessments", label: "Assessments & Tests", count: `${displayAssessments.length} Tests` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Syllabus Modules */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-soft">
              <h3 className="text-base font-bold text-slate-900 mb-2">Curriculum Syllabus</h3>
              <p className="text-xs text-slate-500 mb-5">
                Complete all course milestones to qualify for the national end-term evaluation.
              </p>

              <div className="space-y-3">
                {syllabusModules.map((mod) => (
                  <div
                    key={mod.number}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          mod.completed
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {mod.completed ? "✓" : mod.number}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{mod.title}</h4>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Duration: {mod.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setToast({
                          show: true,
                          message: `Launching learning session for Module ${mod.number}: ${mod.title}`,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shrink-0"
                    >
                      {mod.completed ? "Review" : "Launch"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Instructor Info & Key Takeaways */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-3">
                COURSE INSTRUCTOR
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-700 font-bold text-base">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{course.trainer}</h4>
                  <p className="text-xs text-slate-500">Program Lead & Senior Faculty</p>
                  <p className="text-[11px] text-teal-600 font-semibold mt-0.5">
                    Capacity Building Commission
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-3">
                PROGRAM SPECIFICATIONS
              </span>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Total Duration:</span>
                  <strong className="text-slate-800">{course.duration}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Category Stream:</span>
                  <strong className="text-slate-800">{course.category}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Passing Threshold:</span>
                  <strong className="text-slate-800">75% Score</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Accreditation:</span>
                  <strong className="text-emerald-700">Digital Badge Issued</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Resources */}
      {activeTab === "resources" && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pedagogical Materials</h3>
              <p className="text-xs text-slate-500">
                Handouts, standard operating procedures, and lecture recordings
              </p>
            </div>
            <span className="text-xs text-slate-400">
              {displayResources.length} Assets Available
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {displayResources.map((res) => (
              <div
                key={res.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 mt-0.5">
                    {getFileIcon(res.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{res.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Uploaded: {res.uploadedDate} • {res.fileSize || res.duration || "Verified Asset"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {res.type === "video" ? (
                    <button
                      onClick={() =>
                        setToast({
                          show: true,
                          message: `Playing video stream: ${res.title}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Play Lecture</span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setToast({
                          show: true,
                          message: `Downloading document: ${res.title}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-600" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Assessments */}
      {activeTab === "assessments" && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Course Evaluations</h3>
              <p className="text-xs text-slate-500">
                Periodic quizzes and end-term certification tests
              </p>
            </div>
            <Badge variant="warning" size="sm">
              Mandatory Requirements
            </Badge>
          </div>

          <div className="divide-y divide-slate-100">
            {displayAssessments.map((asm) => (
              <div
                key={asm.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-xl transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{asm.subject}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Deadline: {asm.deadline}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FileCheck2 className="w-3 h-3 text-slate-400" />
                      {asm.numberOfQuestions} Multiple Choice Items
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {asm.status === "completed" ? (
                    <Badge variant="success" size="md">
                      Score: {asm.score}% (Passed)
                    </Badge>
                  ) : (
                    <button
                      onClick={() => navigate(`/trainee/assessments/${asm.id}`)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
                    >
                      Start Assessment →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Give Feedback Modal */}
      <Modal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        title="Course Evaluation & Feedback"
        subtitle={`Rate "${course.title}" and provide constructive inputs for syllabus enhancement`}
        footer={
          <>
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleFeedbackSubmit}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Submit Feedback
            </button>
          </>
        }
      >
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Overall Course Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 rounded transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Feedback & Course Comments
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share insights on content relevance, instructor delivery, and practical applicability in government workflows..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type="success"
        title="Action Complete"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

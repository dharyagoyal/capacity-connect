import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Toast from "../../components/Toast";
import { mockCourses } from "../../data/mockData";
import {
  MessageSquare,
  Star,
  Send,
  Sparkles,
  CheckCircle2,
  BookOpen,
  User,
  ThumbsUp,
} from "lucide-react";

export default function TraineeFeedback() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].title);
  const [trainerRating, setTrainerRating] = useState(5);
  const [contentRating, setContentRating] = useState(5);
  const [platformRating, setPlatformRating] = useState(5);
  const [comments, setComments] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Clear Explanations", "Actionable Exercises"]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const quickTags = [
    "Clear Explanations",
    "Actionable Exercises",
    "Practical Case Studies",
    "High Audio Quality",
    "Pacing Needs Adjustment",
    "Excellent Reference PDFs",
  ];

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({
      show: true,
      message: `Feedback for "${selectedCourse}" submitted to the Capacity Building Commission review panel!`,
    });
    setComments("");
  };

  const renderStarPicker = (currentVal, setter) => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setter(star)}
            className="p-1 rounded transition-transform hover:scale-110"
          >
            <Star
              className={`w-5 h-5 ${
                currentVal >= star
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-slate-700 ml-2">
          {currentVal} / 5 Stars
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl mx-auto">
      <PageHeader
        title="Training Feedback & Evaluation"
        subtitle="Provide anonymous and constructive inputs to help faculty improve curriculum design and public administration competencies."
        badgeText="Continuous Quality"
        badgeVariant="lavender"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Capacity Building Program
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {mockCourses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title} ({c.trainer})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ratings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Trainer Delivery & Clarity
              </span>
              {renderStarPicker(trainerRating, setTrainerRating)}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Syllabus & Material Quality
              </span>
              {renderStarPicker(contentRating, setContentRating)}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                LMS Platform Usability
              </span>
              {renderStarPicker(platformRating, setPlatformRating)}
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Highlight Key Impressions
            </label>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-teal-50 text-teal-800 border-teal-300 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comments Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Detailed Comments & Suggestions
            </label>
            <textarea
              rows={4}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What worked best in this program? Where can instructor explanations or case study references be enhanced?"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Submissions are compiled for academic quality audits
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-md shadow-teal-500/10 active:scale-[0.98] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>

      <Toast
        show={toast.show}
        type="success"
        title="Feedback Recorded"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

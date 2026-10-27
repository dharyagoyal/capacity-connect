import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import CourseCard from "../../components/CourseCard";
import Toast from "../../components/Toast";
import { mockCourses } from "../../data/mockData";
import { Search, Filter, BookOpen, Compass, CheckCircle2 } from "lucide-react";

export default function TraineeCourses() {
  const navigate = useNavigate();

  // Active Tab: "my-courses" | "browse-all"
  const [activeTab, setActiveTab] = useState("my-courses");

  // Search and Category Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Enrolled courses state (initialized with first 4 courses as enrolled)
  const [enrolledIds, setEnrolledIds] = useState(new Set(["crs-01", "crs-02", "crs-03", "crs-05"]));

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "" });

  const categories = [
    "All",
    "Digital Governance",
    "Cloud & Infrastructure",
    "Data & Analytics",
    "Cybersecurity",
    "Administration & Finance",
    "Emerging Technologies",
  ];

  const handleEnroll = (course) => {
    setEnrolledIds((prev) => {
      const updated = new Set(prev);
      updated.add(course.id);
      return updated;
    });

    setToast({
      show: true,
      message: `Enrolled successfully in "${course.title}". Added to your curriculum!`,
    });
  };

  // Filter courses based on tab, search term, and category
  const filteredCourses = mockCourses.filter((course) => {
    // Tab filtering
    if (activeTab === "my-courses" && !enrolledIds.has(course.id)) {
      return false;
    }

    // Category filtering
    if (categoryFilter !== "All" && course.category !== categoryFilter) {
      return false;
    }

    // Search term filtering
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      const matchTrainer = course.trainer.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTrainer) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="Courses & Capacity Building Programs"
        subtitle="Explore accredited curriculum streams, continue learning modules in progress, or enroll in new programs."
        badgeText={`${enrolledIds.size} Enrolled`}
        badgeVariant="primary"
      />

      {/* Tabs & Search / Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-soft space-y-4">
        {/* Top Row: Segmented Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex rounded-xl bg-slate-100 p-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("my-courses")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "my-courses"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4 text-brand-teal" />
              <span>My Courses ({enrolledIds.size})</span>
            </button>

            <button
              onClick={() => setActiveTab("browse-all")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "browse-all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Compass className="w-4 h-4 text-brand-orange" />
              <span>Browse All ({mockCourses.length})</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Showing {filteredCourses.length} programs
          </span>
        </div>

        {/* Bottom Row: Search Bar & Category Dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course title, keyword, or trainer name..."
              className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative w-full sm:w-64 shrink-0">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.has(course.id);

            return (
              <CourseCard
                key={course.id}
                course={course}
                showProgress={activeTab === "my-courses"}
                actionVariant={
                  activeTab === "browse-all"
                    ? isEnrolled
                      ? "enrolled"
                      : "enroll"
                    : "default"
                }
                actionLabel={
                  activeTab === "my-courses"
                    ? course.progress === 100
                      ? "Review Material"
                      : "Continue Learning"
                    : undefined
                }
                onAction={() => {
                  if (activeTab === "browse-all" && !isEnrolled) {
                    handleEnroll(course);
                  } else {
                    navigate(`/trainee/courses/${course.id}`);
                  }
                }}
                onClick={() => navigate(`/trainee/courses/${course.id}`)}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-soft">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different subject category.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Enrollment Toast */}
      <Toast
        show={toast.show}
        type="success"
        title="Course Enrollment"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

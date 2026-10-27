import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { mockCourses } from "../../data/mockData";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Settings,
  Plus,
  ArrowRight,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";

export default function TrainerCourses() {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "" });

  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Digital Governance",
    duration: "4 Weeks (16 Hours)",
    description: "",
  });

  const categories = [
    "All",
    "Digital Governance",
    "Cloud & Infrastructure",
    "Data & Analytics",
    "Cybersecurity",
    "Administration & Finance",
    "Emerging Technologies",
  ];

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    const created = {
      id: `crs-${Date.now()}`,
      title: newCourse.title,
      description: newCourse.description || "Course syllabus configured for public sector capacity development.",
      trainer: "Dr. Priya Venkatesh",
      duration: newCourse.duration,
      category: newCourse.category,
      progress: 0,
      thumbnailColor: "from-indigo-600 to-purple-800",
      modulesCount: 5,
      rating: 5.0,
      enrolledCount: 0,
      badge: "New Release",
    };

    setCourses([created, ...courses]);
    setIsCreateModalOpen(false);
    setNewCourse({ title: "", category: "Digital Governance", duration: "4 Weeks (16 Hours)", description: "" });
    setToast({
      show: true,
      message: `Course "${created.title}" published successfully to the faculty catalog.`,
    });
  };

  const filteredCourses = courses.filter((c) => {
    if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      <PageHeader
        title="My Courses & Curriculum"
        subtitle="Manage the capacity building programs you lead, track cohort enrollment counts, and inspect syllabus completion rates."
        badgeText={`${courses.length} Active Courses`}
        badgeVariant="primary"
      >
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add Course</span>
        </button>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your courses..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-56 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const enrolledCount = course.enrolledCount || 142;
          const completionRate = course.progress || 65;

          return (
            <div
              key={course.id}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Header Banner */}
              <div
                className={`relative h-36 bg-gradient-to-br ${
                  course.thumbnailColor || "from-blue-600 to-indigo-800"
                } p-5 flex flex-col justify-between text-white overflow-hidden`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <Badge
                    variant="dark"
                    size="sm"
                    className="bg-black/30 backdrop-blur-md text-white border-white/20"
                  >
                    {course.category}
                  </Badge>
                  {course.badge && (
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-accent-gradient text-slate-950 shadow-sm">
                      {course.badge}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-200" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
                    <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                    {course.rating || 4.9}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Trainee Count & Cohort Completion % */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      Enrolled Trainees
                    </span>
                    <strong className="text-slate-900 font-bold">
                      {enrolledCount} Officers
                    </strong>
                  </div>

                  <div>
                    <ProgressBar
                      value={completionRate}
                      size="sm"
                      showLabel
                      label="Cohort Completion Rate"
                      variant={completionRate >= 80 ? "emerald" : "gradient"}
                    />
                  </div>
                </div>

                {/* Manage Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors shadow-xs"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-600" />
                    <span>Manage Course</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Course Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
        subtitle={`Course Code: ${selectedCourse?.id?.toUpperCase()} • Stream: ${selectedCourse?.category}`}
        footer={
          <>
            <button
              onClick={() => setSelectedCourse(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                setToast({
                  show: true,
                  message: `Settings updated for "${selectedCourse?.title}".`,
                });
                setSelectedCourse(null);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95"
            >
              Save Course Settings
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Enrolled Roster</span>
              <strong className="text-slate-900 text-sm">
                {selectedCourse?.enrolledCount || 142} Officers
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Completion Rate</span>
              <strong className="text-teal-700 text-sm">
                {selectedCourse?.progress || 65}%
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Modules</span>
              <strong className="text-slate-900 text-sm">
                {selectedCourse?.modulesCount || 6} Sections
              </strong>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Curriculum Description
            </label>
            <textarea
              rows={3}
              defaultValue={selectedCourse?.description}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-xl text-teal-900">
            <span className="font-bold block">Faculty Advisory</span>
            <p className="mt-0.5 text-[11px] text-teal-700">
              Changes to active modules notify all 148 enrolled officers via the central LMS notice feed.
            </p>
          </div>
        </div>
      </Modal>

      {/* Add New Course Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Capacity Building Course"
        subtitle="Configure syllabus specifications and enrollment parameters"
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCourse}
              disabled={!newCourse.title}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 disabled:opacity-40"
            >
              Publish Program
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Course Title
            </label>
            <input
              type="text"
              required
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              placeholder="e.g. Enterprise Blockchain for Land Records Governance"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Category Stream
              </label>
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              >
                <option value="Digital Governance">Digital Governance</option>
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Administration & Finance">Administration & Finance</option>
                <option value="Emerging Technologies">Emerging Technologies</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Description & Learning Outcomes
            </label>
            <textarea
              rows={3}
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              placeholder="Summary of syllabus, target officers, and practical case studies..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
            />
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type="success"
        title="Curriculum Catalog"
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

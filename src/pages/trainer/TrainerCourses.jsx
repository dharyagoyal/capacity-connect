import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CourseCard from "../../components/CourseCard";
import Modal from "../../components/Modal";
import { mockCourses } from "../../data/mockData";
import { Plus, Edit3, Users } from "lucide-react";

export default function TrainerCourses() {
  const [courses, setCourses] = useState(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Digital Governance",
    duration: "4 Weeks (16 Hours)",
    description: "",
  });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const created = {
      id: `crs-${Date.now()}`,
      title: newCourse.title,
      description: newCourse.description,
      trainer: "Dr. Priya Venkatesh",
      duration: newCourse.duration,
      category: newCourse.category,
      progress: 0,
      thumbnailColor: "from-indigo-600 to-purple-800",
      modulesCount: 5,
      rating: 5.0,
      enrolledCount: 1,
      badge: "Draft",
    };
    setCourses([created, ...courses]);
    setIsModalOpen(false);
    setNewCourse({ title: "", category: "Digital Governance", duration: "4 Weeks (16 Hours)", description: "" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Curriculum Management"
        subtitle="Design syllabus, configure module milestones, and manage enrollment parameters."
        badgeText={`${courses.length} Curriculum Units`}
        badgeVariant="primary"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Add New Course</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            showProgress={false}
            actionLabel="Manage Syllabus"
            onAction={(c) => alert(`Editing curriculum for: ${c.title}`)}
          />
        ))}
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Training Program"
        subtitle="Define course metadata and learning competencies"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
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
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Course Title
            </label>
            <input
              type="text"
              required
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              placeholder="e.g., Enterprise Blockchain for Land Records"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
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
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Course Overview & Objectives
            </label>
            <textarea
              rows={3}
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              placeholder="Describe learning outcomes, target officer grade, and prerequisites..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

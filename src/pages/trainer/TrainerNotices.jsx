import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import { mockNotices } from "../../data/mockData";
import { Bell, Plus, Calendar, AlertCircle } from "lucide-react";

export default function TrainerNotices() {
  const [notices, setNotices] = useState(mockNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    category: "Announcement",
    priority: "Normal",
    summary: "",
  });

  const handlePostNotice = (e) => {
    e.preventDefault();
    const item = {
      id: `not-${Date.now()}`,
      title: newNotice.title,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: newNotice.category,
      priority: newNotice.priority,
      summary: newNotice.summary,
      author: "Dr. Priya Venkatesh (Program Lead)",
    };
    setNotices([item, ...notices]);
    setIsModalOpen(false);
    setNewNotice({ title: "", category: "Announcement", priority: "Normal", summary: "" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departmental Bulletins & Notices"
        subtitle="Broadcast administrative announcements, live lecture reschedule alerts, and examination circulars."
        badgeText={`${notices.length} Broadcasts`}
        badgeVariant="primary"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Publish Notice</span>
        </button>
      </PageHeader>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-soft"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    notice.priority === "Urgent"
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-teal-50 text-teal-600 border border-teal-200"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {notice.date}
                    </span>
                    <span>•</span>
                    <span>{notice.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={notice.priority === "Urgent" ? "danger" : "lavender"}
                  size="sm"
                >
                  {notice.priority}
                </Badge>
                <Badge variant="default" size="sm">
                  {notice.category}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-4">
              {notice.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Publish Notice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Broadcast New Circular"
        subtitle="Notify enrolled officers across all ministerial departments"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handlePostNotice}
              disabled={!newNotice.title}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 disabled:opacity-40"
            >
              Broadcast Now
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Notice Headline
            </label>
            <input
              type="text"
              required
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              placeholder="e.g., Mandatory Cyber Simulation Session on Friday"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={newNotice.category}
                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="Announcement">Announcement</option>
                <option value="Training Update">Training Update</option>
                <option value="Curriculum">Curriculum</option>
                <option value="Urgent Directive">Urgent Directive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Priority
              </label>
              <select
                value={newNotice.priority}
                onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Notice Text
            </label>
            <textarea
              rows={3}
              value={newNotice.summary}
              onChange={(e) => setNewNotice({ ...newNotice, summary: e.target.value })}
              placeholder="Enter official circular details..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

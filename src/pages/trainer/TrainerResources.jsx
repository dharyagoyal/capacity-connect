import React, { useState, useMemo, useRef } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { mockResources, mockCourses } from "../../data/mockData";
import {
  FileText,
  Video,
  Presentation,
  UploadCloud,
  Download,
  Trash2,
  Plus,
  Calendar,
  Clock,
  HardDrive,
  CheckCircle2,
  FolderOpen,
  Search,
  X,
  FileCheck,
} from "lucide-react";

export default function TrainerResources() {
  const [resources, setResources] = useState(mockResources);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [newAsset, setNewAsset] = useState({
    title: "",
    type: "pdf",
    course: mockCourses[0]?.title || "Digital Governance & Public Service Delivery",
  });

  // Filter chips: All, Videos, Presentations, Study Material
  const filterChips = [
    { label: "All", value: "All" },
    { label: "Videos", value: "video" },
    { label: "Presentations", value: "ppt" },
    { label: "Study Material", value: "pdf" },
  ];

  // Filtered resources based on chip and search
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchFilter =
        activeFilter === "All" ? true : item.type === activeFilter;
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [resources, activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      All: resources.length,
      video: resources.filter((r) => r.type === "video").length,
      ppt: resources.filter((r) => r.type === "ppt").length,
      pdf: resources.filter((r) => r.type === "pdf").length,
    };
  }, [resources]);

  const getTypeConfig = (type) => {
    switch (type) {
      case "video":
        return {
          icon: Video,
          label: "Video",
          badgeVariant: "danger",
          iconBg: "bg-rose-50 text-rose-600 border-rose-200",
        };
      case "ppt":
        return {
          icon: Presentation,
          label: "Presentation",
          badgeVariant: "warning",
          iconBg: "bg-amber-50 text-amber-600 border-amber-200",
        };
      case "pdf":
      default:
        return {
          icon: FileText,
          label: "Study Material",
          badgeVariant: "primary",
          iconBg: "bg-teal-50 text-teal-600 border-teal-200",
        };
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!newAsset.title) {
        setNewAsset((prev) => ({ ...prev, title: file.name }));
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!newAsset.title) {
        setNewAsset((prev) => ({ ...prev, title: file.name }));
      }
    }
  };

  const handleSaveResource = (e) => {
    e.preventDefault();
    if (!newAsset.title.trim()) return;

    const createdResource = {
      id: `res-${Date.now()}`,
      title: newAsset.title.trim(),
      type: newAsset.type,
      course: newAsset.course,
      fileSize:
        newAsset.type === "video"
          ? undefined
          : selectedFile
          ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
          : "4.5 MB",
      duration: newAsset.type === "video" ? "35 mins" : undefined,
      uploadedDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };

    setResources([createdResource, ...resources]);
    setIsModalOpen(false);
    setSelectedFile(null);
    setNewAsset({
      title: "",
      type: "pdf",
      course: mockCourses[0]?.title || "Digital Governance & Public Service Delivery",
    });

    setToast({
      show: true,
      message: `"${createdResource.title}" has been uploaded and published to the cohort.`,
      type: "success",
    });
  };

  const handleDelete = (id, title) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setToast({
      show: true,
      message: `"${title}" removed from repository.`,
      type: "info",
    });
  };

  const handleDownload = (title) => {
    setToast({
      show: true,
      message: `Downloading "${title}"...`,
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Resource Library"
        subtitle="Upload and administer pedagogical materials, lecture recordings, presentations, and policy handbooks for enrolled trainees."
        badgeText={`${resources.length} Assets`}
        badgeVariant="primary"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Upload Resource</span>
        </button>
      </PageHeader>

      {/* Filter Row: Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterChips.map((chip) => {
            const count = counts[chip.value];
            const isActive = activeFilter === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-slate-800 text-[#a99bf0]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      {/* Grid of Uploaded Resources */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((item) => {
            const typeConfig = getTypeConfig(item.type);
            const IconComponent = typeConfig.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-soft hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top card row: icon, type badge, file size/duration */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${typeConfig.iconBg}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={typeConfig.badgeVariant} size="sm">
                        {typeConfig.label}
                      </Badge>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        {item.type === "video" ? (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>{item.duration || "40 mins"}</span>
                          </>
                        ) : (
                          <>
                            <HardDrive className="w-3 h-3" />
                            <span>{item.fileSize || "3.5 MB"}</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Resource Title */}
                  <h4
                    className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug"
                    title={item.title}
                  >
                    {item.title}
                  </h4>

                  {/* Course Tag */}
                  <div className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="truncate" title={item.course}>
                      {item.course}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Footer: Upload date, downloads count & buttons */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{item.uploadedDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(item.title)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                      title="Download resource"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete resource"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-soft">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No resources found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No resources match "${searchQuery}". Try adjusting your keywords.`
              : "No media assets uploaded yet for this filter category."}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Upload First Asset</span>
          </button>
        </div>
      )}

      {/* Upload Resource Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
        }}
        title="Upload Pedagogical Resource"
        subtitle="Add study materials, video recordings, or presentations to course repositories."
        footer={
          <>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveResource}
              disabled={!newAsset.title.trim()}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 disabled:opacity-40 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Publish</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveResource} className="space-y-4">
          {/* Drag & Drop Style Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Select or Drop File
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-teal-500 bg-teal-50/40"
                  : selectedFile
                  ? "border-emerald-400 bg-emerald-50/20"
                  : "border-slate-300 bg-slate-50/50 hover:bg-slate-100/60 hover:border-slate-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.mp4,.ppt,.pptx,.doc,.docx"
                onChange={handleFileChange}
              />

              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[220px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2 border border-teal-100">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag and drop files here
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Supports PDF, MP4, PPT, PPTX (up to 50 MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Resource Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newAsset.title}
              onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
              placeholder="e.g. Smart City Cloud Standards & Best Practices v2.0"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>

          {/* Type Dropdown & Course Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Resource Type
              </label>
              <select
                value={newAsset.type}
                onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="pdf">Study Material (PDF)</option>
                <option value="video">Video Lecture (MP4)</option>
                <option value="ppt">Presentation (PPT / PPTX)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Associated Course
              </label>
              <select
                value={newAsset.course}
                onChange={(e) => setNewAsset({ ...newAsset, course: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              >
                {mockCourses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "success" })}
      />
    </div>
  );
}

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import { mockResources } from "../../data/mockData";
import { FileText, Video, Presentation, Upload, Plus } from "lucide-react";

export default function TrainerResources() {
  const [resources, setResources] = useState(mockResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    title: "",
    type: "pdf",
    course: "Digital Governance & Public Service Delivery",
  });

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

  const handleAddAsset = (e) => {
    e.preventDefault();
    const item = {
      id: `res-${Date.now()}`,
      title: newAsset.title,
      type: newAsset.type,
      course: newAsset.course,
      fileSize: "5.2 MB",
      uploadedDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };
    setResources([item, ...resources]);
    setIsModalOpen(false);
    setNewAsset({ title: "", type: "pdf", course: "Digital Governance & Public Service Delivery" });
  };

  const columns = [
    {
      key: "title",
      label: "Course Material",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
            {getFileIcon(row.type)}
          </div>
          <div>
            <span className="font-bold text-slate-900 block">{val}</span>
            <span className="text-[11px] text-slate-400">{row.course}</span>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Format",
      render: (val) => (
        <Badge
          variant={val === "pdf" ? "primary" : val === "video" ? "danger" : "warning"}
          size="sm"
        >
          {val.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "downloadCount",
      label: "Officer Downloads",
      align: "right",
      render: (val) => <span className="font-bold text-slate-800">{val} downloads</span>,
    },
    {
      key: "uploadedDate",
      label: "Date Added",
      render: (val) => <span className="text-slate-500">{val}</span>,
    },
    {
      key: "actions",
      label: "Manage",
      align: "right",
      render: () => (
        <button
          onClick={() => alert("Asset options...")}
          className="text-xs font-bold text-teal-700 hover:text-teal-900"
        >
          Edit / Unpublish
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Repository & Digital Assets"
        subtitle="Upload pedagogical material, recorded lecture feeds, and standard operating procedures."
        badgeText={`${resources.length} Assets`}
        badgeVariant="primary"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-accent-gradient hover:opacity-95 shadow-sm transition-all"
        >
          <Upload className="w-4 h-4 text-slate-950" />
          <span>Upload New Asset</span>
        </button>
      </PageHeader>

      <DataTable
        title="Master Media Inventory"
        subtitle="Hosted materials accessible by enrolled cohorts"
        columns={columns}
        data={resources}
        searchKey="title"
        searchPlaceholder="Filter assets..."
        itemsPerPage={10}
      />

      {/* Upload Asset Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Publish Course Resource"
        subtitle="Upload educational artifact to the portal repository"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAsset}
              disabled={!newAsset.title}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-accent-gradient rounded-lg shadow-sm hover:opacity-95 disabled:opacity-40"
            >
              Publish to Cohort
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Asset Title / File Name
            </label>
            <input
              type="text"
              required
              value={newAsset.title}
              onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
              placeholder="e.g., GFR-2017 Procurement Rules Handbook.pdf"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Format
              </label>
              <select
                value={newAsset.type}
                onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="pdf">PDF Document</option>
                <option value="video">MP4 Video Recording</option>
                <option value="ppt">PPT Slide Deck</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Linked Course
              </label>
              <select
                value={newAsset.course}
                onChange={(e) => setNewAsset({ ...newAsset, course: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="Digital Governance & Public Service Delivery">Digital Governance</option>
                <option value="Modern Cloud Architecture for Smart Cities">Cloud Architecture</option>
                <option value="Data-Driven Policy Making & Public Analytics">Data-Driven Policy</option>
                <option value="Cybersecurity & Information Integrity in Public Systems">Cybersecurity</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import Badge from "../../components/Badge";
import { mockResources } from "../../data/mockData";
import { FileText, Video, Presentation, Download } from "lucide-react";

export default function TraineeResources() {
  const [filterType, setFilterType] = useState("all");

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

  const filteredResources = mockResources.filter(
    (r) => filterType === "all" || r.type === filterType
  );

  const columns = [
    {
      key: "title",
      label: "Document / Asset",
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
      key: "fileSize",
      label: "Size / Duration",
      render: (val, row) => (
        <span className="text-slate-600 font-medium">
          {val || row.duration || "N/A"}
        </span>
      ),
    },
    {
      key: "uploadedDate",
      label: "Uploaded",
      render: (val) => <span className="text-slate-500">{val}</span>,
    },
    {
      key: "action",
      label: "Download",
      align: "right",
      render: (_, row) => (
        <button
          onClick={() => alert(`Downloading: ${row.title}`)}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Download asset"
        >
          <Download className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Hub & Resources"
        subtitle="Reference manuals, recorded lectures, lecture presentations, and SOP guidelines."
        badgeText={`${mockResources.length} Materials`}
        badgeVariant="primary"
      />

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2">
        {["all", "pdf", "video", "ppt"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === type
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {type === "all" ? "All Media" : type}
          </button>
        ))}
      </div>

      <DataTable
        title="Curriculum Assets"
        subtitle="Curated by lead faculty for offline study"
        columns={columns}
        data={filteredResources}
        searchKey="title"
        searchPlaceholder="Search materials..."
        itemsPerPage={8}
      />
    </div>
  );
}

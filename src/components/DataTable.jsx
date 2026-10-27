import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  searchKey = "name",
  searchPlaceholder = "Search records...",
  itemsPerPage = 5,
  title,
  subtitle,
  actionButton,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered dataset
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter((item) => {
      if (searchKey && item[searchKey]) {
        return String(item[searchKey]).toLowerCase().includes(lower);
      }
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lower)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-soft overflow-hidden ${className}`}>
      {/* Table Header / Toolbar */}
      {(title || searchPlaceholder || actionButton) && (
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
            {actionButton}
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/75 border-b border-slate-200/70 text-slate-600 uppercase font-bold tracking-wider text-[11px]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`py-3.5 px-4 ${col.align === "right" ? "text-right" : ""} ${
                    col.headerClassName || ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {currentData.length > 0 ? (
              currentData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.key || colIdx}
                      className={`py-3.5 px-4 ${
                        col.align === "right" ? "text-right" : ""
                      } ${col.className || ""}`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium text-slate-600">No records found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredData.length > itemsPerPage && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
          <span>
            Showing <strong className="text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
            <strong className="text-slate-800">
              {Math.min(currentPage * itemsPerPage, filteredData.length)}
            </strong>{" "}
            of <strong className="text-slate-800">{filteredData.length}</strong> entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 font-bold text-slate-700 bg-white border border-slate-200 rounded-md shadow-xs">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

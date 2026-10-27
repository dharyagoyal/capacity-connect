import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export default function Toast({
  show = false,
  onClose,
  type = "success",
  title,
  message,
  duration = 4000,
}) {
  useEffect(() => {
    if (!show || !duration) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 bg-white",
    error: "border-rose-200 bg-white",
    warning: "border-amber-200 bg-white",
    info: "border-sky-200 bg-white",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl border shadow-xl max-w-sm w-full ${
            borders[type] || borders.info
          }`}
        >
          {icons[type] || icons.info}
          <div className="flex-1 pr-2">
            {title && (
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {title}
              </h4>
            )}
            {message && <p className="text-xs text-slate-600 mt-0.5">{message}</p>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

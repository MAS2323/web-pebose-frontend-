import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: AlertCircle,
};

const styles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

export const AdminToast = ({
  type = "info",
  message,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const Icon = icons[type];

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} z-50`}
    >
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

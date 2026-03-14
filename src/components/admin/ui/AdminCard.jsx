import React from "react";

export const AdminCard = ({
  children,
  title,
  icon: Icon,
  className = "",
  actions = null,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
    >
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-[#5D1A1A]" />}
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

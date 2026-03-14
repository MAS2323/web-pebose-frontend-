import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export const AdminTable = ({
  columns,
  data,
  onSort,
  sortConfig,
  isLoading = false,
  emptyMessage = "No hay datos",
  actions = null,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D1A1A]" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  {col.title}
                  {col.sortable &&
                    sortConfig?.key === col.key &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr key={item.id || idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

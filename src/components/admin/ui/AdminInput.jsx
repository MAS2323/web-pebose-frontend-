import React, { forwardRef } from "react";

export const AdminInput = forwardRef(
  (
    { label, error, helperText, icon: Icon = null, className = "", ...props },
    ref,
  ) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`
            block w-full rounded-lg border-gray-300 shadow-sm
            focus:border-[#5D1A1A] focus:ring-[#5D1A1A]
            ${Icon ? "pl-10" : "pl-3"}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
            py-2 pr-3
          `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

AdminInput.displayName = "AdminInput";

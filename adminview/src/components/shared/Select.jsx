import React from "react";
import { cn } from "../../lib/utils";

export function Select({
    label,
    error,
    className,
    children,
    required = false,
    ...props
}) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                className={cn(
                    "w-full border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent transition-colors cursor-pointer",
                    error && "border-red-500 focus:border-red-500",
                    className
                )}
                {...props}
            >
                {children}
            </select>
            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
}

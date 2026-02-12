import React from "react";
import { cn } from "../../lib/utils";

export function Textarea({
    label,
    error,
    className,
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
            <textarea
                className={cn(
                    "w-full border border-gray-200 rounded-sm p-4 focus:border-black outline-none resize-none text-sm leading-relaxed transition-colors",
                    error && "border-red-500 focus:border-red-500",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
}

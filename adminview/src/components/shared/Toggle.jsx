import React from "react";
import { cn } from "../../lib/utils";

export function Toggle({ label, checked, onChange, className }) {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={cn(
                    "w-10 h-6 rounded-full p-1 cursor-pointer transition-colors",
                    checked ? "bg-black" : "bg-gray-200"
                )}
            >
                <div
                    className={cn(
                        "w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
                        checked ? "translate-x-4" : ""
                    )}
                />
            </button>
            {label && (
                <span className="text-sm font-medium text-gray-700">{label}</span>
            )}
        </div>
    );
}

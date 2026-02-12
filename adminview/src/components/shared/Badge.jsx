import { cn } from "../../lib/utils";

export function Badge({ children, variant = "default", className }) {
    const variants = {
        default: "bg-gray-100 text-gray-800 border-gray-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        error: "bg-rose-50 text-rose-700 border-rose-200",
        outline: "bg-transparent border-gray-300 text-gray-600",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

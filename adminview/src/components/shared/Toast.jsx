import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "../../lib/utils";

export function Toast({ message, type = "success", isVisible, onClose, duration = 3000 }) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
        error: <XCircle className="w-5 h-5 text-red-600" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-600" />,
    };

    const styles = {
        success: "bg-emerald-50 border-emerald-200 text-emerald-900",
        error: "bg-red-50 border-red-200 text-red-900",
        warning: "bg-amber-50 border-amber-200 text-amber-900",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -20, x: "-50%" }}
                    className="fixed top-8 left-1/2 z-[100] pointer-events-auto"
                >
                    <div
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-sm border shadow-lg min-w-[300px]",
                            styles[type]
                        )}
                    >
                        {icons[type]}
                        <span className="flex-1 text-sm font-medium">{message}</span>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-black/5 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook for managing toast state
export function useToast() {
    const [toast, setToast] = React.useState({
        isVisible: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({ isVisible: true, message, type });
    };

    const hideToast = () => {
        setToast((prev) => ({ ...prev, isVisible: false }));
    };

    return { toast, showToast, hideToast };
}

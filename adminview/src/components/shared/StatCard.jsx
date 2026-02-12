import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function StatCard({ label, value, trend, trendUp, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                {label}
            </div>
            <div className="flex items-end justify-between">
                <div className="text-3xl font-mono font-medium tracking-tight text-gray-900">
                    {value}
                </div>
                {trend && (
                    <div
                        className={cn(
                            "text-xs font-medium mb-1",
                            trendUp ? "text-emerald-600" : "text-rose-600"
                        )}
                    >
                        {trend}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

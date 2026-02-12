import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { StatCard } from "../shared/StatCard";
import { Badge } from "../shared/Badge";
import { Toast, useToast } from "../shared/Toast";
import { motion } from "framer-motion";
import { Users, Clock, Calendar, ChevronRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AdminOverview() {
    const { toast, showToast, hideToast } = useToast();
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [stats, setStats] = useState([
        { label: "Company Attendance", value: "88%", trend: "+2%", trendUp: true },
        { label: "On Leave Today", value: "14", trend: null },
        { label: "Pending Requests", value: "5", trend: null },
    ]);

    const [activities, setActivities] = useState([
        { id: 1, user: "John Doe", action: "requested Annual Leave", time: "2 hours ago", type: "leave", route: "/admin/leaves" },
        { id: 2, user: "Jane Smith", action: "clocked in late", time: "3 hours ago", type: "attendance", route: "/admin/employees" },
        { id: 3, user: "System", action: "Monthly report generated", time: "5 hours ago", type: "system", route: null },
        { id: 4, user: "Sarah Connor", action: "updated profile", time: "Yesterday", type: "profile", route: "/admin/employees" },
    ]);

    // Simulate data refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            // Simulate updated data
            setStats([
                { label: "Company Attendance", value: "89%", trend: "+3%", trendUp: true },
                { label: "On Leave Today", value: "12", trend: "-2", trendUp: false },
                { label: "Pending Requests", value: "3", trend: "-2", trendUp: false },
            ]);
            setIsRefreshing(false);
            showToast("Data refreshed successfully", "success");
        }, 1000);
    };

    // Navigate to activity detail
    const handleActivityClick = (activity) => {
        if (activity.route) {
            navigate(activity.route);
        }
    };

    // Navigate to pending items
    const handlePendingClick = (type) => {
        if (type === "leaves") {
            navigate("/admin/leaves");
        } else if (type === "timesheets") {
            navigate("/admin/schedules");
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <AdminLayout
            title="Overview"
            description="At-a-glance health of attendance and key admin actions."
            actions={
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 text-sm text-gray-600 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            }
        >
            <Toast {...toast} onClose={hideToast} />

            {/* Top Row: Snapshot & Action Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* Today's Snapshot */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 sm:p-8 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-between h-64"
                >
                    <div>
                        <h3 className="text-lg font-serif font-medium mb-1">Today's Snapshot</h3>
                        <p className="text-sm text-gray-500">Real-time workforce data</p>
                    </div>
                    <div className="flex items-end gap-8 sm:gap-12">
                        <div>
                            <div className="text-3xl sm:text-4xl font-mono font-medium">124</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Total Employees</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-mono font-medium text-emerald-600">108</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Present</div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Center */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-6 sm:p-8 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col h-64 relative overflow-hidden group hover:border-black/50 transition-colors"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock className="w-32 h-32" />
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-serif font-medium mb-1">Action Center</h3>
                            <p className="text-sm text-gray-500">Pending tasks requiring attention</p>
                        </div>
                        <Badge variant="warning">5 Pending</Badge>
                    </div>

                    <div className="space-y-3 mt-auto relative z-10">
                        <div
                            onClick={() => handlePendingClick("leaves")}
                            className="flex items-center justify-between text-sm py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                        >
                            <span>Leave Requests</span>
                            <span className="font-mono">3</span>
                        </div>
                        <div
                            onClick={() => handlePendingClick("timesheets")}
                            className="flex items-center justify-between text-sm py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                        >
                            <span>Timesheet Corrections</span>
                            <span className="font-mono">2</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Strip */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
            >
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} delay={0.2 + idx * 0.1} />
                ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-xl font-serif mb-6">Recent Activity</h3>
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm divide-y divide-gray-100">
                    {activities.map((act) => (
                        <div
                            key={act.id}
                            onClick={() => handleActivityClick(act)}
                            className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 transition-colors group gap-2 ${act.route ? "cursor-pointer" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-mono flex-shrink-0">
                                    {act.user.charAt(0)}
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    <span className="font-medium text-sm">{act.user}</span>
                                    <span className="text-gray-500 text-sm mx-1">{act.action}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 pl-12 sm:pl-0">
                                <span>{act.time}</span>
                                {act.route && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </AdminLayout>
    );
}

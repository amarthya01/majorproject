import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "../shared/Badge";
import { Toast, useToast } from "../shared/Toast";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";

export function AdminSchedules() {
    const { toast, showToast, hideToast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState("Engineering");
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [editingCell, setEditingCell] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const teams = ["Engineering", "Product", "Design", "People"];

    const [schedules, setSchedules] = useState({
        Engineering: [
            { name: "John Doe", schedule: ["09:00 - 17:00", "09:00 - 17:00", "WFH", "09:00 - 17:00", "09:00 - 16:00", "Off", "Off"] },
            { name: "Charlie Wilson", schedule: ["09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "WFH", "09:00 - 17:00", "Off", "Off"] },
            { name: "Sarah Johnson", schedule: ["10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "Off", "Off"] },
        ],
        Product: [
            { name: "Jane Smith", schedule: ["WFH", "WFH", "09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "Off", "Off"] },
            { name: "Mike Brown", schedule: ["09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "Off", "Off"] },
        ],
        Design: [
            { name: "Bob Johnson", schedule: ["10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "10:00 - 18:00", "Off", "Off"] },
        ],
        People: [
            { name: "Alice Brown", schedule: ["09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "09:00 - 17:00", "09:00 - 16:00", "Off", "Off"] },
        ],
    });

    // Get current week dates
    const getWeekDates = (offset) => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1 + (offset * 7));

        const dates = [];
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            dates.push(`${days[i]} ${date.getDate()}`);
        }

        return dates;
    };

    const getWeekRange = (offset) => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1 + (offset * 7));

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const formatDate = (date) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${months[date.getMonth()]} ${date.getDate()}`;
        };

        return `${formatDate(monday)} - ${formatDate(sunday)}`;
    };

    const days = getWeekDates(currentWeekOffset);
    const weekRange = getWeekRange(currentWeekOffset);

    // Update schedule cell
    const updateSchedule = (empIndex, dayIndex, value) => {
        const updatedSchedules = { ...schedules };
        updatedSchedules[selectedTeam][empIndex].schedule[dayIndex] = value;
        setSchedules(updatedSchedules);
        setHasUnsavedChanges(true);
        setEditingCell(null);
    };

    // Cycle through shift types
    const cycleShiftType = (empIndex, dayIndex) => {
        const currentValue = schedules[selectedTeam][empIndex].schedule[dayIndex];
        let nextValue;

        if (currentValue === "Off") {
            nextValue = "09:00 - 17:00";
        } else if (currentValue === "WFH") {
            nextValue = "Off";
        } else {
            nextValue = "WFH";
        }

        updateSchedule(empIndex, dayIndex, nextValue);
    };

    // Publish changes
    const handlePublish = () => {
        setHasUnsavedChanges(false);
        showToast("Schedule changes published successfully", "success");
    };

    // Discard changes
    const handleDiscard = () => {
        if (window.confirm("Are you sure you want to discard all changes?")) {
            // In a real app, you'd reload from saved state
            setHasUnsavedChanges(false);
            showToast("Changes discarded", "success");
        }
    };

    // Jump to today
    const jumpToToday = () => {
        setCurrentWeekOffset(0);
    };

    return (
        <AdminLayout title="Schedules" description="Manage team shifts and individual working hours.">
            <Toast {...toast} onClose={hideToast} />

            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50 gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                        {/* Team Selector */}
                        <select
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-sm text-sm font-serif bg-white"
                        >
                            {teams.map(team => (
                                <option key={team} value={team}>{team} Team</option>
                            ))}
                        </select>

                        {/* Week Navigator */}
                        <div className="flex gap-1 bg-white border border-gray-200 rounded p-1">
                            <button
                                onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-2 text-sm font-mono self-center whitespace-nowrap">{weekRange}</span>
                            <button
                                onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={jumpToToday}
                            className="flex-1 sm:flex-none px-3 py-1.5 text-xs uppercase tracking-wider border border-gray-300 rounded-sm hover:border-black transition-colors"
                        >
                            Today
                        </button>
                        {hasUnsavedChanges && (
                            <button
                                onClick={handleDiscard}
                                className="flex-1 sm:flex-none px-3 py-1.5 text-xs uppercase tracking-wider border border-gray-300 rounded-sm hover:border-red-500 hover:text-red-600 transition-colors"
                            >
                                Discard
                            </button>
                        )}
                        <button
                            onClick={handlePublish}
                            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-colors ${hasUnsavedChanges
                                ? "bg-black text-white hover:opacity-90"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!hasUnsavedChanges}
                        >
                            Publish Changes
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-r border-gray-100 bg-gray-50 w-48 sticky left-0 z-10 font-medium text-xs uppercase tracking-widest text-gray-500">
                                    Employee
                                </th>
                                {days.map(day => (
                                    <th key={day} className="p-4 border-b border-gray-100 min-w-[140px] font-medium text-xs uppercase tracking-widest text-gray-500 text-center">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {schedules[selectedTeam].map((emp, empIdx) => (
                                <tr key={empIdx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 border-r border-gray-100 bg-white sticky left-0 z-10 font-serif font-medium shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] group-hover:bg-gray-50 transition-colors">
                                        {emp.name}
                                    </td>
                                    {emp.schedule.map((shift, dayIdx) => (
                                        <td
                                            key={dayIdx}
                                            onClick={() => cycleShiftType(empIdx, dayIdx)}
                                            className="p-2 border-r border-gray-50 border-b border-gray-50 relative h-20 text-center align-middle hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            {editingCell?.empIdx === empIdx && editingCell?.dayIdx === dayIdx ? (
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={shift}
                                                        onChange={(e) => updateSchedule(empIdx, dayIdx, e.target.value)}
                                                        onBlur={() => setEditingCell(null)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") setEditingCell(null);
                                                            if (e.key === "Escape") setEditingCell(null);
                                                        }}
                                                        autoFocus
                                                        className="w-full px-2 py-1 text-xs text-center border border-black rounded outline-none font-mono"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    {shift !== "Off" ? (
                                                        <div
                                                            className={`text-xs inline-flex flex-col items-center gap-1 px-2 py-1.5 rounded border ${shift === "WFH"
                                                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                                                : "bg-white text-gray-700 border-gray-200 shadow-sm"
                                                                }`}
                                                            onDoubleClick={() => setEditingCell({ empIdx, dayIdx })}
                                                        >
                                                            <span className="font-mono">{shift}</span>
                                                            {shift === "WFH" && <MapPin className="w-3 h-3" />}
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-300 text-xs">-</div>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                    <p><strong>Tip:</strong> Click a cell to cycle through shift types (Office → WFH → Off). Double-click to edit time manually.</p>
                </div>
            </div>
        </AdminLayout>
    );
}

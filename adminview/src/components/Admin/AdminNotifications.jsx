import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "../shared/Badge";
import { Input } from "../shared/Input";
import { Textarea } from "../shared/Textarea";
import { Toast, useToast } from "../shared/Toast";
import { motion } from "framer-motion";
import { Send, Trash2 } from "lucide-react";

export function AdminNotifications() {
    const { toast, showToast, hideToast } = useToast();
    const [audience, setAudience] = useState("All Employees");
    const [selectedTeam, setSelectedTeam] = useState("Engineering");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [isHighPriority, setIsHighPriority] = useState(false);
    const [errors, setErrors] = useState({});

    const [announcements, setAnnouncements] = useState([
        { id: 1, title: "Office Renovation Update", author: "Admin", time: "2 hours ago", audience: "All Employees", status: "Active", message: "The office renovation will begin next week." },
        { id: 2, title: "New Leave Policy", author: "HR", time: "Yesterday", audience: "All Employees", status: "Active", message: "Please review the updated leave policy." },
        { id: 3, title: "Engineering All-Hands", author: "CTO", time: "3 days ago", audience: "Engineering", status: "Archived", message: "Quarterly engineering meeting scheduled." },
    ]);

    const [drafts, setDrafts] = useState([]);

    const teams = ["Engineering", "Product", "Design", "People"];

    // Publish announcement
    const handlePublish = () => {
        const validationErrors = {};
        if (!title.trim()) validationErrors.title = "Title is required";
        if (!message.trim()) validationErrors.message = "Message is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newAnnouncement = {
            id: Date.now(),
            title,
            message,
            author: "Admin",
            time: "Just now",
            audience: audience === "Specific Team" ? selectedTeam : audience,
            status: "Active",
            priority: isHighPriority,
        };

        setAnnouncements([newAnnouncement, ...announcements]);
        resetForm();
        showToast("Announcement published successfully", "success");
    };

    // Save draft
    const handleSaveDraft = () => {
        if (!title.trim() && !message.trim()) {
            showToast("Cannot save empty draft", "error");
            return;
        }

        const draft = {
            id: Date.now(),
            title,
            message,
            audience: audience === "Specific Team" ? selectedTeam : audience,
            priority: isHighPriority,
            savedAt: new Date().toLocaleString(),
        };

        setDrafts([draft, ...drafts]);
        resetForm();
        showToast("Draft saved", "success");
    };

    // Load draft
    const loadDraft = (draft) => {
        setTitle(draft.title);
        setMessage(draft.message);
        setAudience(teams.includes(draft.audience) ? "Specific Team" : draft.audience);
        if (teams.includes(draft.audience)) {
            setSelectedTeam(draft.audience);
        }
        setIsHighPriority(draft.priority || false);
        setDrafts(drafts.filter(d => d.id !== draft.id));
        showToast("Draft loaded", "success");
    };

    // Load announcement for editing
    const loadAnnouncement = (announcement) => {
        setTitle(announcement.title);
        setMessage(announcement.message);
        setAudience(teams.includes(announcement.audience) ? "Specific Team" : announcement.audience);
        if (teams.includes(announcement.audience)) {
            setSelectedTeam(announcement.audience);
        }
        setIsHighPriority(announcement.priority || false);
    };

    // Archive announcement
    const handleArchive = (id) => {
        setAnnouncements(announcements.map(a =>
            a.id === id ? { ...a, status: a.status === "Active" ? "Archived" : "Active" } : a
        ));
        showToast("Announcement status updated", "success");
    };

    // Delete announcement
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            setAnnouncements(announcements.filter(a => a.id !== id));
            showToast("Announcement deleted", "success");
        }
    };

    // Reset form
    const resetForm = () => {
        setTitle("");
        setMessage("");
        setAudience("All Employees");
        setSelectedTeam("Engineering");
        setIsHighPriority(false);
        setErrors({});
    };

    return (
        <AdminLayout title="Notifications" description="Broadcast company-wide announcements and updates.">
            <Toast {...toast} onClose={hideToast} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
                {/* Compose Area */}
                <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 h-fit">
                    <h3 className="text-xl font-serif mb-6">New Announcement</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                            <div className="flex flex-wrap gap-2">
                                {["All Employees", "Specific Team", "Individuals"].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setAudience(opt)}
                                        className={`px-4 py-2 border rounded-sm text-sm transition-colors ${audience === opt
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {audience === "Specific Team" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Team</label>
                                <div className="flex flex-wrap gap-2">
                                    {teams.map(team => (
                                        <button
                                            key={team}
                                            onClick={() => setSelectedTeam(team)}
                                            className={`px-3 py-1.5 border rounded-sm text-sm transition-colors ${selectedTeam === team
                                                ? "bg-gray-100 border-gray-300"
                                                : "bg-white border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {team}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Input
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={errors.title}
                            placeholder="e.g. Q1 Town Hall"
                            className="font-serif text-lg"
                        />

                        <Textarea
                            label="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            error={errors.message}
                            rows={6}
                            placeholder="Write your announcement here..."
                        />

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="urgent"
                                    checked={isHighPriority}
                                    onChange={(e) => setIsHighPriority(e.target.checked)}
                                    className="accent-black"
                                />
                                <label htmlFor="urgent" className="text-sm text-gray-600">Mark as High Priority</label>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleSaveDraft}
                                    className="flex-1 sm:flex-none px-4 py-2 text-sm text-gray-500 hover:text-black transition-colors"
                                >
                                    Save Draft
                                </button>
                                <button
                                    onClick={handlePublish}
                                    className="flex-1 sm:flex-none px-6 py-2 bg-black text-white text-sm uppercase tracking-wider rounded-sm hover:opacity-90 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-3 h-3" />
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Broadcasts & Drafts */}
                <div className="space-y-6">
                    {/* Drafts */}
                    {drafts.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Drafts ({drafts.length})</h3>
                            <div className="space-y-3">
                                {drafts.map((draft) => (
                                    <div
                                        key={draft.id}
                                        className="bg-amber-50 border border-amber-200 p-4 rounded-sm cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => loadDraft(draft)}
                                    >
                                        <h4 className="font-serif text-base mb-1">{draft.title || "Untitled Draft"}</h4>
                                        <p className="text-xs text-gray-500">Saved {draft.savedAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Broadcasts */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Recent Broadcasts</h3>

                        <div className="space-y-4">
                            {announcements.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-gray-200 p-4 sm:p-6 rounded-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4
                                            onClick={() => loadAnnouncement(item)}
                                            className="font-serif text-base sm:text-lg cursor-pointer hover:underline decoration-1 underline-offset-4"
                                        >
                                            {item.title}
                                        </h4>
                                        <div className={`w-2 h-2 rounded-full ${item.status === 'Active' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                    </div>
                                    <p className="text-xs text-gray-400 mb-4">Published by {item.author} · {item.time}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2 flex-wrap">
                                            <Badge variant="outline" className="text-[10px]">{item.audience}</Badge>
                                            {item.status === 'Active' && <Badge variant="success" className="text-[10px]">Live</Badge>}
                                            {item.priority && <Badge variant="warning" className="text-[10px]">High Priority</Badge>}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleArchive(item.id)}
                                                className="text-xs text-gray-500 hover:text-black"
                                            >
                                                {item.status === "Active" ? "Archive" : "Activate"}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

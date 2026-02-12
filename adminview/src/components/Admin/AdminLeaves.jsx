import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Badge } from "../shared/Badge";
import { Modal } from "../shared/Modal";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { Toggle } from "../shared/Toggle";
import { Toast, useToast } from "../shared/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, RotateCcw, Trash2 } from "lucide-react";

export function AdminLeaves() {
    const { toast, showToast, hideToast } = useToast();
    const [selectedType, setSelectedType] = useState("annual");
    const [isAddLeaveTypeModalOpen, setIsAddLeaveTypeModalOpen] = useState(false);
    const [isAddAdHocModalOpen, setIsAddAdHocModalOpen] = useState(false);
    const [editingLeaveType, setEditingLeaveType] = useState(null);

    const [leaveTypes, setLeaveTypes] = useState([
        { id: "annual", name: "Annual Leave", quota: 24, paid: true, carryForward: true, category: "Paid Leave" },
        { id: "sick", name: "Sick Leave", quota: 12, paid: true, carryForward: false, category: "Paid Leave" },
        { id: "unpaid", name: "Unpaid Leave", quota: 0, paid: false, carryForward: false, category: "Unpaid Leave" },
        { id: "maternity", name: "Maternity Leave", quota: 180, paid: true, carryForward: false, category: "Special Leave" },
    ]);

    const [adHocLeaves, setAdHocLeaves] = useState([
        { id: 1, employee: "Alice Cooper", type: "Bereavement", dates: "Feb 10 - Feb 12", days: 3, status: "Approved" },
        { id: 2, employee: "Bob Marley", type: "Conference", dates: "Mar 05", days: 1, status: "Pending" },
    ]);

    const [newLeaveType, setNewLeaveType] = useState({
        name: "",
        category: "Paid Leave",
        quota: 0,
        carryForward: false,
    });

    const [newAdHocLeave, setNewAdHocLeave] = useState({
        employee: "",
        type: "",
        dates: "",
        days: 1,
        status: "Pending",
    });

    const [errors, setErrors] = useState({});

    // Get current selected leave type data
    const currentLeaveType = leaveTypes.find(t => t.id === selectedType);

    // Add new leave type
    const handleAddLeaveType = () => {
        const validationErrors = {};
        if (!newLeaveType.name.trim()) validationErrors.name = "Name is required";
        if (newLeaveType.quota < 0) validationErrors.quota = "Quota must be 0 or greater";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newType = {
            id: newLeaveType.name.toLowerCase().replace(/\s+/g, '-'),
            ...newLeaveType,
            paid: newLeaveType.category !== "Unpaid Leave",
        };

        setLeaveTypes([...leaveTypes, newType]);
        setIsAddLeaveTypeModalOpen(false);
        setNewLeaveType({ name: "", category: "Paid Leave", quota: 0, carryForward: false });
        setErrors({});
        showToast("Leave type added successfully", "success");
    };

    // Update leave type
    const handleUpdateLeaveType = () => {
        if (!editingLeaveType) return;

        const validationErrors = {};
        if (!editingLeaveType.name.trim()) validationErrors.name = "Name is required";
        if (editingLeaveType.quota < 0) validationErrors.quota = "Quota must be 0 or greater";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLeaveTypes(leaveTypes.map(lt =>
            lt.id === editingLeaveType.id ? { ...editingLeaveType, paid: editingLeaveType.category !== "Unpaid Leave" } : lt
        ));
        setEditingLeaveType(null);
        setErrors({});
        showToast("Leave type updated successfully", "success");
    };

    // Delete leave type
    const handleDeleteLeaveType = (id) => {
        if (window.confirm("Are you sure you want to delete this leave type?")) {
            setLeaveTypes(leaveTypes.filter(lt => lt.id !== id));
            if (selectedType === id) {
                setSelectedType(leaveTypes[0]?.id || null);
            }
            showToast("Leave type deleted", "success");
        }
    };

    // Add ad-hoc leave
    const handleAddAdHocLeave = () => {
        const validationErrors = {};
        if (!newAdHocLeave.employee.trim()) validationErrors.employee = "Employee name is required";
        if (!newAdHocLeave.type.trim()) validationErrors.type = "Leave type is required";
        if (!newAdHocLeave.dates.trim()) validationErrors.dates = "Dates are required";
        if (newAdHocLeave.days < 1) validationErrors.days = "Days must be at least 1";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newLeave = {
            id: Date.now(),
            ...newAdHocLeave,
        };

        setAdHocLeaves([...adHocLeaves, newLeave]);
        setIsAddAdHocModalOpen(false);
        setNewAdHocLeave({ employee: "", type: "", dates: "", days: 1, status: "Pending" });
        setErrors({});
        showToast("Ad-hoc leave added successfully", "success");
    };

    // Delete ad-hoc leave
    const handleDeleteAdHocLeave = (id) => {
        if (window.confirm("Are you sure you want to delete this ad-hoc leave?")) {
            setAdHocLeaves(adHocLeaves.filter(leave => leave.id !== id));
            showToast("Ad-hoc leave deleted", "success");
        }
    };

    // Toggle ad-hoc leave status
    const toggleAdHocStatus = (id) => {
        setAdHocLeaves(adHocLeaves.map(leave => {
            if (leave.id === id) {
                const statuses = ["Pending", "Approved", "Rejected"];
                const currentIndex = statuses.indexOf(leave.status);
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                return { ...leave, status: nextStatus };
            }
            return leave;
        }));
    };

    // Start editing a leave type
    const startEditingLeaveType = (leaveType) => {
        setEditingLeaveType({ ...leaveType });
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingLeaveType(null);
        setErrors({});
    };

    const isEditing = editingLeaveType?.id === selectedType;

    return (
        <AdminLayout
            title="Leave Policies"
            description="Define company-wide leave types and handle exceptions."
        >
            <Toast {...toast} onClose={hideToast} />

            {/* Standard Leave Types Panel */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 lg:mb-16">
                {/* Left: List */}
                <div className="w-full lg:w-1/3 space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Leave Types</h3>
                    <div className="space-y-3">
                        {leaveTypes.map((type) => (
                            <motion.button
                                key={type.id}
                                onClick={() => {
                                    setSelectedType(type.id);
                                    cancelEditing();
                                }}
                                className={`w-full text-left p-4 sm:p-6 border rounded-sm transition-all duration-200 group ${selectedType === type.id
                                    ? "border-black bg-gray-50 ring-1 ring-black/5"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`font-serif font-medium text-base sm:text-lg ${selectedType === type.id ? "text-black" : "text-gray-700"
                                        }`}>
                                        {type.name}
                                    </span>
                                    {selectedType === type.id && <div className="w-1.5 h-1.5 bg-black rounded-full mt-2" />}
                                </div>
                                <div className="text-xs text-gray-500 font-mono">
                                    {type.paid ? "Paid" : "Unpaid"} · {type.quota > 0 ? `${type.quota} days/yr` : "No limit"}
                                </div>
                            </motion.button>
                        ))}

                        <button
                            onClick={() => setIsAddLeaveTypeModalOpen(true)}
                            className="w-full py-4 border border-dashed border-gray-300 rounded-sm text-gray-400 hover:text-black hover:border-black transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                        >
                            <Plus className="w-4 h-4" />
                            New Leave Type
                        </button>
                    </div>
                </div>

                {/* Right: Details Form */}
                <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 h-fit">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b border-gray-100 pb-6 gap-4">
                        <h3 className="text-xl font-serif">
                            {isEditing ? `Edit ${currentLeaveType?.name}` : `Configure ${currentLeaveType?.name}`}
                        </h3>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={cancelEditing}
                                        className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleUpdateLeaveType}
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm hover:bg-gray-800 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleDeleteLeaveType(currentLeaveType?.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => startEditingLeaveType(currentLeaveType)}
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm hover:bg-gray-800 transition-colors"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <Input
                            label="Leave Name"
                            value={isEditing ? editingLeaveType.name : currentLeaveType?.name}
                            onChange={(e) => isEditing && setEditingLeaveType({ ...editingLeaveType, name: e.target.value })}
                            disabled={!isEditing}
                            error={errors.name}
                            className="font-serif text-lg"
                        />

                        <Select
                            label="Category"
                            value={isEditing ? editingLeaveType.category : currentLeaveType?.category}
                            onChange={(e) => isEditing && setEditingLeaveType({ ...editingLeaveType, category: e.target.value })}
                            disabled={!isEditing}
                        >
                            <option>Paid Leave</option>
                            <option>Unpaid Leave</option>
                            <option>Special Leave</option>
                        </Select>

                        <Input
                            label="Yearly Quota (Days)"
                            type="number"
                            value={isEditing ? editingLeaveType.quota : currentLeaveType?.quota}
                            onChange={(e) => isEditing && setEditingLeaveType({ ...editingLeaveType, quota: parseInt(e.target.value) || 0 })}
                            disabled={!isEditing}
                            error={errors.quota}
                        />

                        <div className="flex items-end pb-2">
                            <Toggle
                                label="Allow Carry Forward"
                                checked={isEditing ? editingLeaveType.carryForward : currentLeaveType?.carryForward}
                                onChange={(checked) => isEditing && setEditingLeaveType({ ...editingLeaveType, carryForward: checked })}
                                className={!isEditing ? "opacity-50 pointer-events-none" : ""}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Unprecedented / Ad-hoc Leaves */}
            <div className="border-t border-gray-200 pt-12 lg:pt-16">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-serif mb-2">Unplanned & One-off Leaves</h2>
                        <p className="text-sm text-gray-500">Record and regularize leaves that fall outside standard policies.</p>
                    </div>
                    <button
                        onClick={() => setIsAddAdHocModalOpen(true)}
                        className="px-6 py-3 bg-white border border-gray-300 text-black text-xs tracking-widest uppercase rounded-sm hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Create Ad-hoc Leave
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-widest">
                                <th className="p-4 sm:p-6 font-medium">Employee</th>
                                <th className="p-4 sm:p-6 font-medium">Type / Reason</th>
                                <th className="p-4 sm:p-6 font-medium">Dates</th>
                                <th className="p-4 sm:p-6 font-medium">Status</th>
                                <th className="p-4 sm:p-6 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {adHocLeaves.map((leave) => (
                                <tr key={leave.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-4 sm:p-6 font-medium font-serif">{leave.employee}</td>
                                    <td className="p-4 sm:p-6 text-sm text-gray-600">{leave.type}</td>
                                    <td className="p-4 sm:p-6 font-mono text-sm text-gray-500">
                                        {leave.dates} <span className="text-gray-300 mx-2">|</span> {leave.days} day(s)
                                    </td>
                                    <td className="p-4 sm:p-6">
                                        <button onClick={() => toggleAdHocStatus(leave.id)}>
                                            <Badge variant={leave.status === "Approved" ? "success" : leave.status === "Rejected" ? "error" : "warning"}>
                                                {leave.status}
                                            </Badge>
                                        </button>
                                    </td>
                                    <td className="p-4 sm:p-6 text-right">
                                        <button
                                            onClick={() => handleDeleteAdHocLeave(leave.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Leave Type Modal */}
            <Modal
                isOpen={isAddLeaveTypeModalOpen}
                onClose={() => {
                    setIsAddLeaveTypeModalOpen(false);
                    setNewLeaveType({ name: "", category: "Paid Leave", quota: 0, carryForward: false });
                    setErrors({});
                }}
                title="Add New Leave Type"
                size="md"
            >
                <div className="space-y-6">
                    <Input
                        label="Leave Name"
                        value={newLeaveType.name}
                        onChange={(e) => setNewLeaveType({ ...newLeaveType, name: e.target.value })}
                        error={errors.name}
                        required
                        placeholder="e.g. Compassionate Leave"
                    />

                    <Select
                        label="Category"
                        value={newLeaveType.category}
                        onChange={(e) => setNewLeaveType({ ...newLeaveType, category: e.target.value })}
                        required
                    >
                        <option>Paid Leave</option>
                        <option>Unpaid Leave</option>
                        <option>Special Leave</option>
                    </Select>

                    <Input
                        label="Yearly Quota (Days)"
                        type="number"
                        value={newLeaveType.quota}
                        onChange={(e) => setNewLeaveType({ ...newLeaveType, quota: parseInt(e.target.value) || 0 })}
                        error={errors.quota}
                        required
                        placeholder="0 for unlimited"
                    />

                    <Toggle
                        label="Allow Carry Forward"
                        checked={newLeaveType.carryForward}
                        onChange={(checked) => setNewLeaveType({ ...newLeaveType, carryForward: checked })}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => {
                                setIsAddLeaveTypeModalOpen(false);
                                setNewLeaveType({ name: "", category: "Paid Leave", quota: 0, carryForward: false });
                                setErrors({});
                            }}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddLeaveType}
                            className="px-6 py-2 bg-black text-white text-sm rounded-sm hover:opacity-90 transition-opacity"
                        >
                            Add Leave Type
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add Ad-hoc Leave Modal */}
            <Modal
                isOpen={isAddAdHocModalOpen}
                onClose={() => {
                    setIsAddAdHocModalOpen(false);
                    setNewAdHocLeave({ employee: "", type: "", dates: "", days: 1, status: "Pending" });
                    setErrors({});
                }}
                title="Create Ad-hoc Leave"
                size="md"
            >
                <div className="space-y-6">
                    <Input
                        label="Employee Name"
                        value={newAdHocLeave.employee}
                        onChange={(e) => setNewAdHocLeave({ ...newAdHocLeave, employee: e.target.value })}
                        error={errors.employee}
                        required
                        placeholder="e.g. John Doe"
                    />

                    <Input
                        label="Leave Type / Reason"
                        value={newAdHocLeave.type}
                        onChange={(e) => setNewAdHocLeave({ ...newAdHocLeave, type: e.target.value })}
                        error={errors.type}
                        required
                        placeholder="e.g. Bereavement, Conference"
                    />

                    <Input
                        label="Dates"
                        value={newAdHocLeave.dates}
                        onChange={(e) => setNewAdHocLeave({ ...newAdHocLeave, dates: e.target.value })}
                        error={errors.dates}
                        required
                        placeholder="e.g. Feb 10 - Feb 12"
                    />

                    <Input
                        label="Number of Days"
                        type="number"
                        value={newAdHocLeave.days}
                        onChange={(e) => setNewAdHocLeave({ ...newAdHocLeave, days: parseInt(e.target.value) || 1 })}
                        error={errors.days}
                        required
                    />

                    <Select
                        label="Status"
                        value={newAdHocLeave.status}
                        onChange={(e) => setNewAdHocLeave({ ...newAdHocLeave, status: e.target.value })}
                    >
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </Select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => {
                                setIsAddAdHocModalOpen(false);
                                setNewAdHocLeave({ employee: "", type: "", dates: "", days: 1, status: "Pending" });
                                setErrors({});
                            }}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddAdHocLeave}
                            className="px-6 py-2 bg-black text-white text-sm rounded-sm hover:opacity-90 transition-opacity"
                        >
                            Create Leave
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}

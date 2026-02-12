import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function NotificationCard({ notifications, onAdd, onDelete }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-sans">
                    Notifications
                </h3>
                <button
                    onClick={onAdd}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group"
                    aria-label="Add notification"
                >
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
                </button>
            </div>

            <div className="space-y-5">
                {notifications.map((note) => (
                    <div key={note.id} className="flex gap-3 items-start group cursor-pointer">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform
              ${note.type === 'success' ? 'bg-green-500' :
                                note.type === 'warning' ? 'bg-yellow-500' :
                                    note.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}
            `}></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-gray-100 mb-1 font-sans group-hover:text-black dark:group-hover:text-white transition-colors">
                                {note.text}
                            </p>
                            <p className="text-xs text-gray-400 font-mono">
                                {note.time}
                            </p>
                        </div>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
                            aria-label="Delete notification"
                        >
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

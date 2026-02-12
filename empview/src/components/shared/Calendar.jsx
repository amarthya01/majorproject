import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calendar() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Mock calendar data for Feb 2024 (starting on Thu)
    // Feb 2024: 1st is Thursday. 29 days.
    const firstDayOffset = 3; // Mon=0, Tue=1, Wed=2, Thu=3
    const totalDays = 29;

    const calendarDays = Array.from({ length: 35 }, (_, i) => {
        const dayNum = i - firstDayOffset + 1;
        if (dayNum > 0 && dayNum <= totalDays) return dayNum;
        return null;
    });

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-8 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-serif font-bold dark:text-white">February 2024</h2>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-black dark:hover:text-white">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-black dark:hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4 gap-x-1 sm:gap-x-2">
                {/* Day headers */}
                {days.map(day => (
                    <div key={day} className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-sans font-medium text-center uppercase tracking-wider">
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                    <div key={index} className="aspect-square flex items-center justify-center relative">
                        {day && (
                            <button className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-sans rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                ${day === 12 ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100' : 'text-gray-600 dark:text-gray-300'}
              `}>
                                {day}
                                {/* Status indicator dot example */}
                                {/* Randomly adding dots for demo */}
                                {[2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16].includes(day) && (
                                    <span className={`absolute bottom-0.5 sm:bottom-1 w-1 h-1 rounded-full ${day === 12 ? 'bg-white dark:bg-black' : 'bg-green-500'}`}></span>
                                )}
                                {[19].includes(day) && (
                                    <span className="absolute bottom-0.5 sm:bottom-1 w-1 h-1 bg-yellow-500 rounded-full"></span>
                                )}
                                {[20].includes(day) && (
                                    <span className="absolute bottom-0.5 sm:bottom-1 w-1 h-1 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-700 justify-center">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-400 font-sans">Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-xs text-gray-400 font-sans">Absent</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-xs text-gray-400 font-sans">Leave</span>
                </div>
            </div>
        </motion.div>
    );
}

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function StatCard({ label, value, trend, trendLabel, suffix = '' }) {
    // Animation for numbers
    // Note: For simple strings like "9:15 AM", we just display them.
    // For numbers, we could animate them. simple version for now.
    const isNumber = typeof value === 'number';

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:shadow-md transition-all cursor-default"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            {/* Label */}
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 font-sans font-medium">
                {label}
            </p>

            {/* Value */}
            <p className="text-3xl sm:text-4xl font-mono font-medium mb-2 text-black dark:text-white">
                {value}{suffix}
            </p>

            {/* Trend Indicator */}
            {(trend || trendLabel) && (
                <div className="flex items-center gap-2">
                    {trend && (
                        <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                    )}
                    {trendLabel && (
                        <span className="text-gray-400 text-xs font-sans">{trendLabel}</span>
                    )}
                </div>
            )}
        </motion.div>
    );
}

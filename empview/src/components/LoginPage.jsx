import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Dark Mode Toggle - Mobile */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-50 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors lg:hidden"
                aria-label="Toggle dark mode"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Left Panel - Brand/Editorial */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-800 flex-col justify-between p-16 relative overflow-hidden border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="z-10 flex justify-between items-start">
                    <div className="text-xl font-serif font-bold tracking-tight dark:text-white">Company</div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                <div className="z-10 max-w-lg">
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-8 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Time well tracked is work well done.
                    </motion.h1>
                    <p className="text-gray-400 font-sans text-base lg:text-lg">
                        Efficiency is the refined essence of productivity.
                    </p>
                </div>

                <div className="z-10">
                    <p className="text-xs text-gray-400 font-mono">© 2024 INC.</p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/10 dark:from-black/10 to-transparent"></div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="text-xl font-serif font-bold tracking-tight dark:text-white">Company</div>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2 dark:text-white">Welcome back</h2>
                        <p className="text-gray-400 text-sm font-sans">Sign in to access your workspace</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6 sm:space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide font-sans">
                                Employee ID
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md text-base font-sans
                           bg-white dark:bg-gray-800 text-black dark:text-white
                           focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all
                           placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                placeholder="EMP001"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide font-sans">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md text-base font-sans
                           bg-white dark:bg-gray-800 text-black dark:text-white
                           focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all
                           placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                placeholder="••••••••"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 sm:py-4 rounded-md text-sm font-bold
                         hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-200
                         uppercase tracking-widest font-sans"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="#" className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors font-sans border-b border-transparent hover:border-black dark:hover:border-white pb-0.5">
                            Forgot your password?
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

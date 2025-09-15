import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, User, Target } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Habit Builder";
  });

  const [dailyGoal, setDailyGoal] = useState(() => {
    return parseInt(localStorage.getItem("dailyGoal")) || 5;
  });

  // Apply dark mode to HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Save username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  };

  // Save daily goal
  const handleGoalChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setDailyGoal(value);
      localStorage.setItem("dailyGoal", value);
    }
  };

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl space-y-8 transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ⚙️ Settings
      </motion.h1>

      {/* Dark Mode Toggle */}
      <motion.div
        className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md cursor-pointer"
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center gap-2">
          {darkMode ? (
            <Moon className="text-yellow-400" />
          ) : (
            <Sun className="text-orange-400" />
          )}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Dark Mode
          </span>
        </div>
        <input
          type="checkbox"
          checked={darkMode}
          readOnly
          className="w-6 h-6 accent-violet-500"
        />
      </motion.div>

      {/* Username */}
      <motion.div
        className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <User className="text-violet-500" size={28} />
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your name"
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-gray-100"
        />
      </motion.div>

      {/* Daily Habit Goal */}
      <motion.div
        className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Target className="text-green-500" size={28} />
        <input
          type="number"
          value={dailyGoal}
          onChange={handleGoalChange}
          min={1}
          className="w-20 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
        />
        <span className="text-gray-700 dark:text-gray-200 font-medium">
          Daily Habit Goal
        </span>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-gray-500 dark:text-gray-400 text-center mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        All your settings are saved automatically 🌟
      </motion.p>
    </motion.div>
  );
};

export default Settings;

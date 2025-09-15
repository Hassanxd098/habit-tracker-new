import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

const TimeSpent = ({ taskName = "Habit Task", onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Format time (hh:mm:ss)
  const formatTime = (secs) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${hrs}:${mins}:${s}`;
  };

  // Start/Stop the timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          const updated = prev + 1;
          if (onTimeUpdate) onTimeUpdate(updated); // send update to dashboard
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  // Reset the timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setSeconds(0);
    setIsActive(false);
    if (onTimeUpdate) onTimeUpdate(0);
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Clock className="w-6 h-6" /> Time Tracker
      </div>

      {/* Task Name */}
      <p className="text-sm font-medium opacity-80">{taskName}</p>

      {/* Timer */}
      <motion.div
        className="text-4xl font-mono font-bold tracking-wide"
        key={seconds}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {formatTime(seconds)}
      </motion.div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="p-3 rounded-full bg-green-500 hover:bg-green-600 shadow-md"
          >
            <Play className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsActive(false)}
            className="p-3 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-md"
          >
            <Pause className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 shadow-md"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TimeSpent;

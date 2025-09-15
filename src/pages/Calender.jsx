import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabits } from "../context/HabitContext";
import {
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
  addMonths,
  subMonths,
  isAfter,
  endOfToday,
} from "date-fns";

const AnimatedProgressCircle = ({ percentage }) => {
  return (
    <motion.div className="relative w-10 h-10 sm:w-12 sm:h-12">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="16"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 100 - percentage }}
          transition={{ duration: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
        {percentage}%
      </span>
    </motion.div>
  );
};

const HabitCalendar = () => {
  const { habits, toggleHabit, getDailyCompletion } = useHabits();
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
    setCalendarDays(days);
  }, [currentMonth]);

  const handleDayClick = (day) => {
    if (isAfter(day, endOfToday())) return;
    setSelectedDay(day);
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-400 rounded-3xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <motion.h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <Star className="text-yellow-400" /> Habit Calendar
        </motion.h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <ChevronLeft />
          </button>
          <span className="font-bold text-base sm:text-lg text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
        {calendarDays.map((day, idx) => {
          const stats = getDailyCompletion(day);
          const percentage = stats.percentage;
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          const isFuture = isAfter(day, endOfToday());

          return (
            <motion.div
              key={idx}
              className={`relative flex flex-col items-center p-2 rounded-xl shadow-md cursor-pointer transition ${
                isFuture
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => !isFuture && handleDayClick(day)}
            >
              <span className="text-xs sm:text-sm font-semibold">
                {format(day, "dd")}
              </span>
              <AnimatedProgressCircle percentage={percentage} />
              {percentage === 100 && !isFuture && (
                <CheckCircle2
                  className="absolute top-2 right-2 text-green-500"
                  size={14}
                />
              )}
              {isFuture && (
                <Lock
                  className="absolute top-2 right-2 text-gray-500"
                  size={14}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Day Details */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            key={format(selectedDay, "yyyy-MM-dd")}
            className="mt-6 p-4 bg-white rounded-2xl shadow-lg"
          >
            <h3 className="text-base sm:text-lg font-semibold">
              {format(selectedDay, "EEEE, MMM dd, yyyy")}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Completion:{" "}
              <strong>{getDailyCompletion(selectedDay).percentage}%</strong>
            </p>

            <div className="mt-4 space-y-2">
              {habits.length ? (
                habits.map((habit) => {
                  const key = format(selectedDay, "yyyy-MM-dd");
                  const done = !!habit.history?.[key];
                  const disabled = isAfter(selectedDay, endOfToday());
                  return (
                    <div
                      key={habit.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        done ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={done}
                        disabled={disabled}
                        onChange={() => toggleHabit(habit.id, key)}
                      />
                      <span
                        className={done ? "line-through text-green-700" : ""}
                      >
                        {habit.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No habits yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitCalendar;

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useHabits } from "../context/HabitContext";
import {
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
} from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  subMonths,
} from "date-fns";

const HabitProgress = () => {
  const { habits, getDailyCompletion, getWeeklyData } = useHabits();
  const [todayPct, setTodayPct] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [monthComparison, setMonthComparison] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const todayStats = getDailyCompletion(new Date());
    setTodayPct(todayStats.percentage);
    controls.start({
      strokeDashoffset: 100 - todayStats.percentage,
      transition: { duration: 0.8 },
    });

    // Weekly
    const week = getWeeklyData(new Date(), 1);
    setWeeklyData(week);

    // Last 6 months data
    const monthsData = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(new Date(), i);
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);
      const days = eachDayOfInterval({ start, end });

      const avg =
        days.reduce((sum, d) => sum + getDailyCompletion(d).percentage, 0) /
        (days.length || 1);

      monthsData.push({
        label: format(monthDate, "MMM"),
        percentage: Math.round(avg),
      });
    }
    setMonthlyTrend(monthsData);

    // Compare last 2 months
    if (monthsData.length >= 2) {
      const thisMonth = monthsData[monthsData.length - 1].percentage;
      const lastMonth = monthsData[monthsData.length - 2].percentage;
      setMonthComparison(thisMonth - lastMonth);
    }
  }, [habits]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-purple-200 to-purple-500 rounded-3xl shadow-2xl">
      {/* Day Circle */}
      <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Activity className="text-purple-600" /> Today's Progress
        </h3>
        <div className="w-36 h-36 relative">
          <svg className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="62"
              stroke="#E5E7EB"
              strokeWidth="14"
              fill="none"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="62"
              stroke="#7C3AED"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="100"
              animate={controls}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <CheckCircle2 className="text-green-500 animate-pulse" size={28} />
            <div className="text-2xl font-bold mt-1">{todayPct}%</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-3">
          {getDailyCompletion(new Date()).completedCount}/
          {getDailyCompletion(new Date()).totalCount} habits
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Calendar className="text-blue-600" /> Weekly Progress
        </h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyData.map((d, i) => (
            <motion.div
              key={i}
              className="bg-purple-500 rounded-md w-full"
              initial={{ height: 0 }}
              animate={{ height: `${d.percentage}%` }}
              transition={{ duration: 0.8 }}
              title={`${d.percentage}%`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {weeklyData.map((d) => (
            <span key={d.label}>{d.label}</span>
          ))}
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold mb-2">Last 6 Months</h3>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`text-xl font-bold mt-2 flex items-center gap-2 ${
              monthComparison >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {monthComparison >= 0 ? <TrendingUp /> : <TrendingDown />}{" "}
            {Math.abs(monthComparison)}%
          </motion.div>
        </div>
        <div className="flex items-end justify-between h-32 gap-2">
          {monthlyTrend.map((m, i) => (
            <motion.div
              key={i}
              className={`rounded-md w-full ${
                monthComparison >= 0 ? "bg-green-500" : "bg-red-500"
              }`}
              initial={{ height: 0 }}
              animate={{ height: `${m.percentage}%` }}
              transition={{ duration: 0.8 }}
              title={`${m.percentage}%`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {monthlyTrend.map((m) => (
            <span key={m.label}>{m.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitProgress;

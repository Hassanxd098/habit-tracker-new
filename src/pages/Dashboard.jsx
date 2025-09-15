import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Activity,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useHabits } from "../context/HabitContext.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { habits } = useHabits();

  const totalHabits = habits.length || 1;
  const completedHabits = habits.filter((h) => h.completed).length;
  const completionPercentage = Math.round(
    (completedHabits / totalHabits) * 100
  );

  const streakDays = 12;
  const weeklyGoalPercent = completionPercentage;

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const staticWeeklyTotal = "8h 00m";

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Habit Completion",
        data: [completedHabits, totalHabits - completedHabits],
        backgroundColor: ["#7C3AED", "#D8B4FE"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  const cards = [
    {
      id: 1,
      title: "Today's Habits",
      value: `${completedHabits} / ${totalHabits}`,
      icon: <CalendarCheck size={28} className="text-violet-600" />,
      color: "from-violet-200 to-violet-400",
    },
    {
      id: 2,
      title: "Streak",
      value: `${streakDays} Days`,
      icon: <Activity size={28} className="text-green-600" />,
      color: "from-green-200 to-green-400",
    },
    {
      id: 3,
      title: "Weekly Goal",
      value: `${weeklyGoalPercent}%`,
      icon: <Target size={28} className="text-blue-600" />,
      color: "from-blue-200 to-blue-400",
    },
    {
      id: 4,
      title: "Time Spent",
      icon: <Clock size={28} className="text-orange-600" />,
      color: "from-orange-200 to-orange-400",
      type: "timer",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Header */}
      <motion.h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        👋 Welcome Back!{" "}
        <span className="text-violet-600">Let’s build your habits today</span>
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`p-4 rounded-xl shadow-md bg-gradient-to-br ${card.color} text-gray-800 flex flex-col justify-between h-36 sm:h-40`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-white rounded-lg shadow">{card.icon}</div>
              <CheckCircle className="text-gray-600" size={18} />
            </div>

            <h2 className="text-base font-semibold">{card.title}</h2>

            {card.type === "timer" ? (
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">{formatTime(seconds)}</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setRunning((r) => !r)}
                    className={`px-2 py-0.5 text-xs rounded-md text-white ${
                      running ? "bg-yellow-500" : "bg-green-600"
                    }`}
                  >
                    {running ? "Pause" : "Start"}
                  </button>
                  <button
                    onClick={() => {
                      setRunning(false);
                      setSeconds(0);
                    }}
                    className="px-2 py-0.5 text-xs rounded-md bg-red-500 text-white"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-xs text-gray-700">
                  Weekly:{" "}
                  <span className="font-semibold">{staticWeeklyTotal}</span>
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold">{card.value}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Doughnut Chart */}
      <motion.div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Habit Completion
        </h2>
        <div className="w-40 h-40 sm:w-64 sm:h-64">
          <Doughnut data={doughnutData} />
        </div>
        <p className="mt-4 text-gray-600 text-base sm:text-lg font-medium">
          You have completed {completedHabits} out of {totalHabits} habits today
          🎯
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;

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

  // ✅ Live Time & Date
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const completedHabitNames = habits
    .filter((h) => h.completed)
    .map((h) => h.name);
  const remainingHabitNames = habits
    .filter((h) => !h.completed)
    .map((h) => h.name);

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

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            context.label === "Completed"
              ? `Completed: ${
                  completedHabitNames.length
                    ? completedHabitNames.join(", ")
                    : "None"
                }`
              : `Remaining: ${
                  remainingHabitNames.length
                    ? remainingHabitNames.join(", ")
                    : "None"
                }`,
        },
      },
      legend: { position: "bottom" },
    },
    maintainAspectRatio: false,
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
      title: "Current Time",
      icon: <Clock size={28} className="text-orange-600" />,
      color: "from-orange-200 to-orange-400",
      type: "datetime",
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 p-4 shadow-md">
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          👋 Welcome Back!{" "}
          <span className="text-violet-600">Let's build your habits today</span>
        </motion.h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`p-4 rounded-2xl shadow-lg bg-gradient-to-br ${card.color} flex flex-col justify-between h-36 sm:h-44`}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-white rounded-lg shadow">
                  {card.icon}
                </div>
                <CheckCircle className="text-gray-600" size={18} />
              </div>

              <h2 className="text-sm sm:text-base font-semibold mt-2">
                {card.title}
              </h2>

              {card.type === "datetime" ? (
                <div className="flex flex-col gap-1">
                  <p className="text-lg sm:text-xl font-bold">
                    {currentTime.toLocaleTimeString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {currentTime.toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ) : (
                <p className="text-xl sm:text-2xl font-bold mt-2">
                  {card.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Doughnut Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-full md:w-3/4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Habit Completion
          </h2>
          <div className="w-48 h-48 sm:w-64 sm:h-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base text-center font-medium">
            You have completed {completedHabits} out of {totalHabits} habits
            today 🎯
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

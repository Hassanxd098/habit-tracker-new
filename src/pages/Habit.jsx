import React, { useState } from "react";
import { Plus, CheckCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabits } from "../context/HabitContext.jsx";

const Habit = () => {
  const { habits, setHabits } = useHabits();
  const [input, setInput] = useState("");

  // Add new habit
  const addHabit = () => {
    if (input.trim() === "") return;
    setHabits([...habits, { id: Date.now(), name: input, completed: false }]);
    setInput("");
  };

  // Toggle habit
  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  // Delete habit
  const deleteHabit = (id) => {
    if (id <= 4) return;
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <motion.div
      className="p-4 sm:p-6 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-violet-700 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        🌱 My Habits
      </motion.h1>

      {/* Input + Add Button */}
      <motion.div
        className="flex flex-col sm:flex-row gap-2 mb-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new habit..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-violet-400 w-full"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addHabit}
          className="bg-violet-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-violet-600 w-full sm:w-auto"
        >
          <Plus size={20} /> Add
        </motion.button>
      </motion.div>

      {/* Habit List */}
      <ul className="space-y-3">
        <AnimatePresence>
          {habits.map((habit) => (
            <motion.li
              key={habit.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm gap-2"
            >
              <motion.div
                onClick={() => toggleHabit(habit.id)}
                className={`flex items-center gap-2 cursor-pointer ${
                  habit.completed ? "line-through text-gray-500" : ""
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    scale: habit.completed ? [1, 1.3, 1] : 1,
                    rotate: habit.completed ? 360 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle
                    size={22}
                    className={
                      habit.completed ? "text-green-500" : "text-gray-400"
                    }
                  />
                </motion.div>
                <span>{habit.name}</span>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.2, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteHabit(habit.id)}
                className={`text-red-500 hover:text-red-700 ${
                  habit.id <= 4 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <Trash2 size={20} />
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default Habit;

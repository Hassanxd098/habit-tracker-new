import React, { createContext, useContext, useState, useEffect } from "react";
import { format, startOfWeek, addDays } from "date-fns";

const HabitContext = createContext();

const todayKey = (date = new Date()) => format(date, "yyyy-MM-dd");

const migrateOldHabit = (h) => {
  
  if (h.history && typeof h.history === "object") return h;
  const migrated = {
    id: h.id ?? Date.now(),
    name: h.name ?? h.title ?? "Untitled Habit",
    history: {},
  };
 
  if (typeof h.completed === "boolean") migrated.history[todayKey()] = !!h.completed;
  return migrated;
};

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem("habits");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
    
      return parsed.map(migrateOldHabit);
    } catch (e) {
      console.error("Failed parsing habits from localStorage", e);
      localStorage.removeItem("habits");
      return [];
    }
  });

  
  useEffect(() => {
    try {
      localStorage.setItem("habits", JSON.stringify(habits));
    } catch (e) {
      console.error("Failed to save habits", e);
    }
  }, [habits]);

  
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      history: { [todayKey()]: false },
    };
    setHabits((prev) => [...prev, newHabit]);
  };


  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

 
  const toggleHabit = (id, date = new Date()) => {
    const key = typeof date === "string" ? date : todayKey(date);
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, history: { ...h.history, [key]: !h.history?.[key] } }
          : h
      )
    );
  };

 
  const setHabitForDay = (id, date, value) => {
    const key = typeof date === "string" ? date : todayKey(date);
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, history: { ...h.history, [key]: !!value } } : h))
    );
  };

  
  const getDailyCompletion = (date = new Date()) => {
    const key = typeof date === "string" ? date : todayKey(date);
    const total = habits.length;
    if (!total) return { completedCount: 0, totalCount: 0, percentage: 0 };
    const completedCount = habits.reduce((acc, h) => (h.history?.[key] ? acc + 1 : acc), 0);
    const percentage = Math.round((completedCount / total) * 100);
    return { completedCount, totalCount: total, percentage, date: key };
  };

  
  const getWeeklyData = (date = new Date(), weekStartsOn = 1) => {
    const start = startOfWeek(date, { weekStartsOn });
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = addDays(start, i);
      const key = todayKey(d);
      const total = habits.length || 1;
      const completed = habits.reduce((acc, h) => (h.history?.[key] ? acc + 1 : acc), 0);
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
      return {
        date: key,
        label: format(d, "EEE"),
        completed,
        total,
        percentage,
      };
    });
    return days;
  };

 
  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        addHabit,
        removeHabit,
        toggleHabit,
        setHabitForDay,
        getDailyCompletion,
        getWeeklyData,
        todayKey,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);

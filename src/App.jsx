import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Dashboard from "./pages/Dashboard";
import Habit from "./pages/Habit";
import Progress from "./pages/Progress";
import Calender from "./pages/Calender";
import Settings from "./pages/Settings";
import Layout from "./Component/Layout";
import Login from "./Login/Login";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // auth check finished
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Login onLogin={(email) => setUser(email)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="habit" element={<Habit />} />
          <Route path="progress" element={<Progress />} />
          <Route path="calender" element={<Calender />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;

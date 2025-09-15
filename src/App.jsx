

import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Habit from "./pages/Habit";
import Progress from "./pages/Progress";
import Calender from "./pages/Calender";
import Layout from "./Component/Layout";
import Login from "./Login/Login"; 
import { useState } from "react";
import Settings from "./pages/Settings";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen">
      <Routes>

        <Route
          path="/login"
          element={<Login onLogin={(email) => setUser(email)} />}
        />

      
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" />}
        >
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

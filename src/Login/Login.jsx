import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

     
      if (typeof onLogin === "function") {
        onLogin(email);
        navigate("/dashboard");
      } else {
        console.error("onLogin is not provided");
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 bg-violet-500 rounded-full"
              animate={{ y: ["0%", "-100%", "0%"] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2, 
              }}
            />
          ))}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-violet-600">
            Habit Tracker Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-violet-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-violet-400"
          />

          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 transition"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { ScanFace } from "lucide-react";

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
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-300 via-white to-violet-100">
      {loading ? (
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 bg-violet-600 rounded-full"
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          {/* Logo / Heading */}
          <div className="flex flex-col items-center mb-6">
           <div>
           <ScanFace />
           </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Sign in to Habit Tracker
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Continue with your account
            </p>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-6 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Email + Password Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-lg shadow-lg hover:bg-violet-700 transition font-semibold"
            >
              Sign In
            </motion.button>
          </form>

          {/* Bottom Link */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-violet-600 font-medium cursor-pointer hover:underline">
              Create one
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Login;

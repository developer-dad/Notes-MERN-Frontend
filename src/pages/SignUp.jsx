import React, { useState } from "react";
import BACKEND_URL from "../api/url";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await BACKEND_URL.post("/user/signup", {
        name: name.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
      });
      localStorage.setItem("token", res.data.accessToken);
      window.location.href = "/dashboard"
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-1"
          >
            <label className="text-sm text-gray-600">Fullname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fullname"
              className="border rounded-md px-3 py-2 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-1"
          >
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md px-3 py-2 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-1 mb-2.5"
          >
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border rounded-md px-3 py-2 w-full pr-10 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </span>
            </div>
          </motion.div>

          {/* ERROR MESSAGE */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center mb-2.5"
            >
              {error}
            </motion.p>
          )}

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-900" : "bg-blue-500"
            } hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition disabled:opacity-50`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 cursor-pointer underline"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
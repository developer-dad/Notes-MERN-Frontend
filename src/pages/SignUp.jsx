import React, { useState } from "react";
import BACKEND_URL from "../api/url";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Fullname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fullname"
              className="border rounded-md px-3 py-2 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md px-3 py-2 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 mb-2.5">
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-md px-3 py-2 w-full pr-10 placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
            </span>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm text-center mb-2.5">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-900" : "bg-blue-500"} hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition disabled:opacity-50`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
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
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import BACKEND_URL from "../api/url";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otpField, setOtpField] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // STEP 1 → Send OTP
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await BACKEND_URL.post("/user/forget-password", {
        email,
      });

      setOtpField(true); // ONLY after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Change Password
  const changePassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await BACKEND_URL.post("/user/reset-password", {
        email,
        otp,
        password,
      });
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

        <form
          className="space-y-5"
          onSubmit={otpField ? changePassword : handleForgetPassword}
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Enter Email
            </label>
            <input
              type="email"
              value={email}
              disabled={otpField}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OTP + NEW PASSWORD */}
          {otpField && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter your OTP"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              </div>
            </>
          )}

          {/* ERROR */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-md font-semibold transition`}
          >
            {loading
              ? "Processing..."
              : otpField
                ? "Reset Password"
                : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;

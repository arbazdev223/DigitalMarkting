import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthStatusIdle } from "../store/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { handleSendOtp, handleVerifyOtp } from "../utils/otpUtils";
const AuthFormCard = ({
  activeTab,
  setActiveTab,
  handleSignup,
  handleSignin,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const currentAction = useSelector((state) => state.auth.currentAction);
  const [otpSent, setOtpSent] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
 const [otpLoading, setOtpLoading] = useState(false);
const [otpCode, setOtpCode] = useState("");
const [phone, setPhone] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleInputChange = () => {
    if (status !== "idle") {
      dispatch(setAuthStatusIdle());
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
      <div className="flex justify-between mb-6 border-b">
        <button
          className={`w-1/2 py-2 font-semibold transition ${
            activeTab === "signup"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={`w-1/2 py-2 font-semibold transition ${
            activeTab === "signin"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-primary font-opensans">
          {activeTab === "signup" ? "Create an Account" : "Enter Your Details"}
        </h2>
        <p className="text-sm text-gray-500 font-nunito mt-1">
          {activeTab === "signup"
            ? "Sign up to access all features and manage your account."
            : "Welcome back! Please enter your credentials to continue."}
        </p>
      </div>
      {activeTab === "signup" ? (
        <form className="space-y-4 animate-fade-in" onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
            onChange={handleInputChange}
          />
  <div className="flex gap-2">
<input
  type="tel"
  name="phone"
  value={phone}
  placeholder="Phone number with country code"
  pattern="^\+?[0-9]{10,15}$"
  title="Enter a valid phone number with country code"
  className="w-full px-4 py-2 border rounded-md focus:outline-none"
  required
  onChange={(e) => {
    handleInputChange();
    setPhone(e.target.value);
  }}
/>

<button
  type="button"
  onClick={async () => {
    try {
      setOtpLoading(true);
      const success = await handleSendOtp(dispatch, phone);
      setOtpLoading(false);
      setOtpSent(success);
      if (success) toast.success("OTP sent successfully!");
      else toast.error("Failed to send OTP.");
    } catch (err) {
      setOtpLoading(false);
      toast.error("Error sending OTP");
    }
  }}
  className="bg-primary text-white px-4 py-2 text-xs rounded-md"
  disabled={otpLoading}
>
  {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
</button>

  </div>
  {otpSent && (
    <div className="flex gap-2">
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
      />
<button
  type="button"
  onClick={async () => {
    try {
      setOtpLoading(true);
      const verified = await handleVerifyOtp(dispatch, phone, otpCode);
      setOtpLoading(false);
      setOtpVerified(verified);
      if (verified) toast.success("OTP verified successfully!");
      else toast.error("Invalid OTP");
    } catch (err) {
      setOtpLoading(false);
      toast.error("OTP verification failed");
    }
  }}
  className="bg-green-600 text-white px-4 py-2 rounded-md"
  disabled={otpVerified || otpLoading}
>
  {otpVerified ? "Verified ✅" : "Verify OTP"}
</button>
    </div>
  )}
          <div className="relative">
            <input
              type={passwordVisibility.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none pr-10"
              required
              onChange={handleInputChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("password")}
            >
              {passwordVisibility.password ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none pr-10"
              required
              onChange={handleInputChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {passwordVisibility.confirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button
  type="submit"
  className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-[#0d2f6c] transition"
  disabled={status === "loading" || !otpVerified}
>
  {status === "loading" && currentAction === "signup"
    ? "Signing up..."
    : "Sign Up"}
</button>
        </form>
      ) : (
        <form className="space-y-4 animate-fade-in" onSubmit={handleSignin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
            onChange={handleInputChange}
          />
          <div className="relative">
            <input
              type={passwordVisibility.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none pr-10"
              required
              onChange={handleInputChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("password")}
            >
              {passwordVisibility.password ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-[#0d2f6c] transition"
            disabled={status === "loading"}
          >
            {status === "loading" && currentAction === "signin"
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthFormCard;
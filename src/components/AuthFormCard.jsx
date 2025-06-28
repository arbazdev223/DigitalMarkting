import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthFormCard = ({
  activeTab,
  setActiveTab,
  handleSignup,
  handleSignin,
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
      <div className="flex justify-between mb-6 border-b">
        <button
          className={`w-1/2 py-2 font-semibold transition ${
            activeTab === "signup"
              ? "text-[#0e3477] border-b-2 border-[#0e3477]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={`w-1/2 py-2 font-semibold transition ${
            activeTab === "signin"
              ? "text-[#0e3477] border-b-2 border-[#0e3477]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-[#0e3477] font-opensans">
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
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#0e3477] text-white py-2 rounded-md font-semibold hover:bg-[#0d2f6c] transition"
          >
            Sign Up
          </button>
        </form>
      ) : (
        <form className="space-y-4 animate-fade-in" onSubmit={handleSignin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#0e3477] text-white py-2 rounded-md font-semibold hover:bg-[#0d2f6c] transition"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthFormCard;

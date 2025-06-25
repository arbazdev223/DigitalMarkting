import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";


const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const dispatch = useDispatch();
  const dummyStudent = {
    email: "student@example.com",
    password: "student123",
    name: "Student User",
    role: "student",
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(login({ role: "student", name: "Student User" }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    // Dummy student authentication
    if (email === dummyStudent.email && password === dummyStudent.password) {
      dispatch(login({ role: "student", name: dummyStudent.name }));
    } else if (email.includes("admin")) {
      dispatch(login({ role: "admin", name: "Admin User" }));
    } else {
      alert("Invalid credentials. Try student@example.com / student123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
            {activeTab === "signup"
              ? "Create an Account"
              : "Enter Your Details"}
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
    </div>
  );
};

export default AuthTabs;

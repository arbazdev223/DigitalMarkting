import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthFormCard from "./AuthFormCard";
import { signup, signin, loadUser, clearError } from "../store/authSlice";
import { toast } from "react-toastify";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSignup = async (e) => {
  e.preventDefault();
  
  const name = e.target.elements[0].value.trim();
  const email = e.target.elements[1].value.trim();
  const phone = e.target.elements[2].value.trim(); 
  const password = e.target.elements[3].value;
  const confirmPassword = e.target.elements[4].value;

  if (!name || !email || !phone || !password || !confirmPassword) {
    toast.error("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const resultAction = await dispatch(
      signup({ name, email, phone, password, confirmPassword })
    );
    if (signup.fulfilled.match(resultAction)) {
      toast.success("Signup successful!");
      setActiveTab("signin");
    } else {
      toast.error(resultAction.payload || "Signup failed");
    }
  } catch (error) {
    toast.error("Signup failed");
  }
};

  const onSignin = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value.trim();
    const password = e.target.elements[1].value;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const resultAction = await dispatch(signin({ email, password }));
      if (signin.fulfilled.match(resultAction)) {
        toast.success("Signin successful!");
        await dispatch(loadUser());
      } else {
        toast.error(resultAction.payload || "Signin failed");
      }
    } catch (error) {
      toast.error("Signin failed");
    }
  };

  return (
    <div className="sm:min-h-[70%] h-[60%] flex items-center justify-center bg-gray-100 p-4">
      <AuthFormCard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleSignup={onSignup}
        handleSignin={onSignin}
      />
    </div>
  );
};

export default AuthTabs;

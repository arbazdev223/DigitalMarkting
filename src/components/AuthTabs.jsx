import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthFormCard from "./AuthFormCard";
import { handleSignin, handleSignup } from "../store/authSlice";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const dispatch = useDispatch();

  const onSignup = (e) => {
    e.preventDefault();
    dispatch(handleSignup());
  };

  const onSignin = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    dispatch(handleSignin(email, password));
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

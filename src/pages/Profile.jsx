import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "../components/ProfileForm";

const tabs = ["Profile", "Course", "Test", "Payment", "Certificate"];

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#0e3477]">
          Student Dashboard
        </h2>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                  activeTab === tab
                    ? "bg-[#0e3477] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                } transition`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{activeTab}</h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          {activeTab === "Profile" && <ProfileForm user={user} />}

          {activeTab !== "Profile" && (
            <p className="text-gray-600">
              This is the {activeTab} section (Coming Soon).
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

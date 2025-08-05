import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileForm from "../components/ProfileForm";
import CourseList from "../components/CourseList";
import { courseData } from "../../data";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import TestPage from "./TestPage";
import CertificatePage from "./CertificatePage";
import { loadUser } from "../store/authSlice";
import PaymentForm from "../components/PaymentForm";

const tabs = ["Profile", "Course", "Test", "Payment", "Certificate"];

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isLoggedIn && token && !user) {
      dispatch(loadUser());
    }
  }, [isLoggedIn, token, user, dispatch]);

  const [activeTab, setActiveTab] = useState("Profile");
  const [showTabs, setShowTabs] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowTabs(false);
  };
  const tabComponents = {
    Profile: <ProfileForm user={user} />,
    Course: <CourseList courses={courseData} />,
    // Test: <TestPage onCertificateEarned={() => setActiveTab("Certificate")} />,
    Payment: <PaymentForm />,
    Certificate: <CertificatePage />,
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 relative">
          <aside className="hidden md:block w-full md:w-1/4 bg-white border-r p-4 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Student Dashboard
            </h2>
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                      activeTab === tab
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    } transition`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <button
            className="md:hidden fixed z-50 bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg focus:outline-none"
            onClick={() => setShowTabs((prev) => !prev)}
            aria-label="Open dashboard menu"
          >
            {showTabs ? <HiX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
          {showTabs && (
            <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40 flex items-end">
              <div className="w-full bg-white rounded-t-lg pb-10 shadow-lg max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white pt-6 pb-2 z-10">
                  <h2 className="text-xl font-semibold mb-4 text-primary px-6">
                    Student Dashboard
                  </h2>
                  <ul className="space-y-2 px-6">
                    {tabs.map((tab) => (
                      <li key={tab}>
                        <button
                          onClick={() => handleTabClick(tab)}
                          className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                            activeTab === tab
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          } transition`}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <main className="flex-1 p-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4 text-primary">{activeTab}</h1>
              {tabComponents[activeTab] || (
                <p className="text-gray-600">
                  This is the {activeTab} section (Coming Soon).
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;

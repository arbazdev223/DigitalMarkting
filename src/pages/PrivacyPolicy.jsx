import React, { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { privacyTabs } from "../../data";
import { transformHTML } from "../utlis/transformHTML";

const PrivacyPolicy = () => {
  const [activeTabKey, setActiveTabKey] = useState(
    privacyTabs[0].children[0].key
  );
  const [showTabs, setShowTabs] = useState(false);

  const getActiveContent = () => {
    for (let section of privacyTabs) {
      for (let child of section.children) {
        if (child.key === activeTabKey) {
          return { title: child.title, content: child.content };
        }
      }
    }
    return null;
  };

  const activeContent = getActiveContent();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 relative">
          <aside className="hidden md:block w-full md:w-1/4 bg-white border-r p-4 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[#0e3477]">
              Privacy & Legal
            </h2>
            <ul className="space-y-4">
              {privacyTabs.map((section) => (
                <li key={section.key}>
                  <p className="text-sm font-bold text-[#0e3477] mb-1">
                    {section.title}
                  </p>
                  <ul className="space-y-1 pl-2 border-l">
                    {section.children.map((child) => (
                      <li key={child.key}>
                        <button
                          onClick={() => setActiveTabKey(child.key)}
                          className={`text-left text-sm px-2 py-1 rounded-md w-full ${
                            activeTabKey === child.key
                              ? "bg-[#0e3477] text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {child.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </aside>
          <button
            className="md:hidden fixed z-50 bottom-6 right-6 bg-[#0e3477] text-white p-3 rounded-full shadow-lg"
            onClick={() => setShowTabs((prev) => !prev)}
          >
            {showTabs ? <HiX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
          {showTabs && (
            <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40 flex items-end">
              <div className="w-full bg-white rounded-t-lg pb-10 shadow-lg max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white pt-6 pb-2 z-10 px-6">
                  <h2 className="text-xl font-semibold mb-4 text-[#0e3477]">
                    Privacy & Legal
                  </h2>
                  <ul className="space-y-4">
                    {privacyTabs.map((section) => (
                      <li key={section.key}>
                        <p className="text-sm font-bold text-[#0e3477] mb-1">
                          {section.title}
                        </p>
                        <ul className="space-y-1 pl-2 border-l">
                          {section.children.map((child) => (
                            <li key={child.key}>
                              <button
                                onClick={() => {
                                  setActiveTabKey(child.key);
                                  setShowTabs(false);
                                }}
                                className={`text-left text-sm px-2 py-1 rounded-md w-full ${
                                  activeTabKey === child.key
                                    ? "bg-[#0e3477] text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {child.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
         <main className="flex-1 p-0">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4 text-[#0e3477]">
      {activeContent?.title}
    </h1>
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: transformHTML(activeContent?.content || "") }}
    />
  </div>
</main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

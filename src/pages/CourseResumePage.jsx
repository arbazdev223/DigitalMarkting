import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { courseData } from "../../data";
import { useSelector } from "react-redux";
import {
  selectTotalHours,
  selectTotalModules,
  selectTotalLessons,
  selectLevels,
} from "../store/courseSlice";

const CourseResumePage = () => {
  const { id } = useParams();
  const course = courseData.find((c) => String(c.id) === String(id));
  const [activeModule, setActiveModule] = useState(null);

  const totalHours = useSelector(selectTotalHours);
  const totalModules = useSelector(selectTotalModules);
  const totalLessons = useSelector(selectTotalLessons);
  const levels = useSelector(selectLevels);

  if (!course) {
    return (
      <div className="bg-[#001932] text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
      </div>
    );
  }

  const progressPercent =
    course.totalHours && course.watchedHours
      ? Math.round((course.watchedHours / course.totalHours) * 100)
      : 0;

  const getProgressColor = (percent) => {
    if (percent < 60) return "text-red-500 border-red-500";
    if (percent < 85) return "text-yellow-400 border-yellow-400";
    return "text-green-400 border-green-400";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#001932] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-gray-700 px-3 py-1 text-xs rounded-full mb-2 inline-block">
              BLENDED
            </span>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-gray-200">
              {course.description || "No description available."}
            </p>
            <div className="flex gap-4 flex-wrap mt-4 text-sm text-gray-300">
              <span>⏱️ {Math.round(totalHours)}+ hours</span>
              <span>📝 {totalModules * 2} Assessments</span>
              <span>📎 {courseData.length} Assignments</span>
              <span>💻 {totalLessons * 2} Hands-On</span>
              <span>⚡ {[...levels].join(" - ")}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">
              Your Performance Status
            </p>
            <div
              className={`w-24 h-24 rounded-full border-[6px] flex items-center justify-center ${getProgressColor(
                progressPercent
              )}`}
            >
              <div className="text-lg font-bold">
                {progressPercent}%
                <p className="text-xs font-normal text-white">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4 bg-white border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          {course.modules?.map((mod, idx) => (
            <div key={idx} className="mb-2">
              <button
                className={`w-full text-left font-medium py-2 px-3 rounded 
                  ${
                    activeModule === idx
                      ? "bg-blue-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                onClick={() => setActiveModule(idx)}
              >
                {mod.title} {mod.completed && "✅"}
              </button>
              {activeModule === idx && (
                <ul className="pl-4 mt-2 space-y-1 text-sm text-gray-700">
                  {mod.lessons.map((lesson, i) => (
                    <li key={i} className="list-disc">
                      {lesson}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="w-full lg:w-3/4 bg-white rounded p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          {activeModule !== null ? (
            <div>
              <h3 className="text-lg font-bold">
                {course.modules[activeModule].title}
              </h3>
              <p className="mt-2 text-gray-700">
                {course.modules[activeModule].description ||
                  "Module details not available."}
              </p>
            </div>
          ) : (
            <p>Select a module to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseResumePage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { courseData } from "../../data";
import {
  FaCheckCircle,
  FaFilePdf,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
} from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  selectTotalHours,
  selectTotalModules,
  selectTotalLessons,
  selectLevels,
} from "../store/courseSlice";
import TestPage from "./TestPage"; 

const getContentIcon = (type) => {
  switch (type) {
    case "video":
      return <FaFileVideo className="text-blue-500 mr-2" />;
    case "pdf":
      return <FaFilePdf className="text-red-500 mr-2" />;
    case "image":
      return <FaFileImage className="text-green-500 mr-2" />;
    case "audio":
      return <FaFileAudio className="text-purple-500 mr-2" />;
    default:
      return <span className="mr-2">📄</span>;
  }
};

const CourseResumePage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [openTopic, setOpenTopic] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const { id } = useParams();
  const course = courseData.find((c) => String(c.id) === String(id));

  const totalHours = useSelector(selectTotalHours);
  const totalModules = useSelector(selectTotalModules);
  const totalLessons = useSelector(selectTotalLessons);
  const levels = useSelector(selectLevels);
  const isTopicCompleted = (topic) =>
    topic.contents?.length &&
    topic.contents.every((content) => content.completed);
  const isModuleCompleted = (mod) =>
    mod.topics?.length &&
    mod.topics.every((topic) => topic.completed || isTopicCompleted(topic));

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

  const handleModuleClick = (index) => {
    setActiveModule(index === activeModule ? null : index);
    setOpenTopic({});
    setSelectedTopic(null);
    setSelectedContent(null);
  };

  const handleTopicAccordion = (topicIdx) => {
    setOpenTopic((prev) => ({
      ...prev,
      [topicIdx]: !prev[topicIdx],
    }));
  };

  const handleTopicSelect = (topicIdx) => {
    setSelectedTopic(topicIdx);
    setSelectedContent(0);
  };

  const activeMod = course.modules?.[activeModule];
  const selectedTopicObj =
    activeMod && selectedTopic !== null
      ? activeMod.topics[selectedTopic]
      : null;
  const selectedContentObj =
    selectedTopicObj && selectedContent !== null
      ? selectedTopicObj.contents?.[selectedContent]
      : null;
  const getModuleProgress = (mod) => {
    const totalFiles = mod.topics.reduce(
      (sum, t) => sum + (t.contents?.length || 0),
      0
    );
    const completedFiles = mod.topics.reduce(
      (sum, t) => sum + (t.contents?.filter((c) => c.completed).length || 0),
      0
    );
    return totalFiles === 0
      ? 0
      : Math.round((completedFiles / totalFiles) * 100);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#001932] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-gray-700 px-3 py-1 text-xs rounded-full mb-2 inline-block">
              {course.badge}
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
        <div className="w-full lg:w-1/3 bg-white border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          <div className="space-y-2">
            {course.modules?.map((mod, mIdx) => (
              <div key={mIdx} className="mb-2">
                <button
                  className={`w-full flex justify-between items-center text-left font-medium py-2 px-3 rounded transition ${
                    activeModule === mIdx
                      ? "bg-blue-100 text-[#0e3477]"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setActiveModule(mIdx);
                    setOpenTopic({});
                    setSelectedTopic(null);
                    setSelectedContent(null);
                  }}
                >
                  <span>
                    {mod.moduleTitle}{" "}
                    {isModuleCompleted(mod) && (
                      <FaCheckCircle className="inline ml-1 text-green-500" />
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-20 h-2 bg-gray-200 rounded overflow-hidden mr-2">
                      <span
                        className="block h-2 bg-blue-500 rounded"
                        style={{ width: `${getModuleProgress(mod)}%` }}
                      ></span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {getModuleProgress(mod)}%
                    </span>
                    {activeModule === mIdx ? (
                      <HiChevronUp />
                    ) : (
                      <HiChevronDown />
                    )}
                  </span>
                </button>
                {activeModule === mIdx && mod.topics && (
                  <ul className="pl-2 mt-2 space-y-1 text-sm">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx}>
                        <div>
                          <button
                            onClick={() => {
                              setOpenTopic((prev) => ({
                                ...prev,
                                [tIdx]: !prev[tIdx],
                              }));
                            }}
                            className={`w-full flex justify-between items-center py-1 px-2 rounded transition ${
                              openTopic[tIdx]
                                ? "bg-blue-50 text-blue-800 font-semibold"
                                : "hover:bg-gray-200"
                            }`}
                          >
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTopicSelect(tIdx);
                              }}
                              className={`flex-1 text-left cursor-pointer ${
                                selectedTopic === tIdx
                                  ? "underline font-bold"
                                  : ""
                              }`}
                            >
                              {topic.topicTitle}
                              {topic.completed && (
                                <FaCheckCircle className="inline ml-1 text-green-500" />
                              )}
                            </span>
                            <span>
                              {openTopic[tIdx] ? (
                                <HiChevronUp />
                              ) : (
                                <HiChevronDown />
                              )}
                            </span>
                          </button>
                          {openTopic[tIdx] && (
                            <ul className="pl-4 py-1">
                              {topic.contents?.map((content, cIdx) => (
                                <li
                                  key={cIdx}
                                  className={`flex items-center text-xs text-gray-600 py-1 cursor-pointer ${
                                    selectedTopic === tIdx &&
                                    selectedContent === cIdx
                                      ? "font-bold underline text-blue-700"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    handleTopicSelect(tIdx);
                                    setSelectedContent(cIdx);
                                  }}
                                >
                                  {getContentIcon(content.type)}
                                  <span>{content.name}</span>
                                  {content.completed && (
                                    <FaCheckCircle className="ml-1 text-green-500 text-[10px]" />
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3 bg-white rounded p-6 shadow min-h-[300px]">
          {activeMod && selectedTopicObj && selectedContentObj ? (
            <div>
              <h3 className="text-lg font-bold mb-2">
                {selectedTopicObj.topicTitle}
              </h3>
              <div className="mb-4">
                <span className="font-semibold">Content: </span>
                <span>{selectedContentObj.name}</span>
              </div>
              <div className="border rounded p-4 shadow-sm bg-gray-50">
                {selectedContentObj.type === "test" ? (
                  <TestPage
                    testQuestions={selectedContentObj.questions}
                  />
                ) : (
                  <>
                    {getContentIcon(selectedContentObj.type)}
                    <div>
                      <div className="font-medium">
                        {selectedContentObj.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        {selectedContentObj.duration && (
                          <>Duration: {selectedContentObj.duration}</>
                        )}
                      </div>
                      {selectedContentObj.type === "video" && (
                        <video
                          src={selectedContentObj.url}
                          controls
                          className="w-full max-w-md my-2"
                          onEnded={() => {
                            if (
                              selectedTopicObj.contents &&
                              selectedContent <
                                selectedTopicObj.contents.length - 1
                            ) {
                              setSelectedContent(selectedContent + 1);
                            }
                          }}
                        />
                      )}
                      {selectedContentObj.type === "pdf" && (
                        <a
                          href={selectedContentObj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 text-sm hover:underline"
                        >
                          View PDF →
                        </a>
                      )}
                      {selectedContentObj.type === "image" && (
                        <img
                          src={selectedContentObj.url}
                          alt={selectedContentObj.name}
                          className="w-40 my-2 rounded"
                        />
                      )}
                      {selectedContentObj.type === "audio" && (
                        <audio
                          controls
                          src={selectedContentObj.url}
                          className="mt-2 w-full"
                          onEnded={() => {
                            if (
                              selectedTopicObj.contents &&
                              selectedContent <
                                selectedTopicObj.contents.length - 1
                            ) {
                              setSelectedContent(selectedContent + 1);
                            }
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              Select a topic and content to view its details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseResumePage;

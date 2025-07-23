import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPurchasedEnrolledCoursesByUser,
  resetCourseStudentState,
  getCourseResume,
  updateCourseResume,
  selectStudentCourseById,
  selectResumeData,
} from "../store/courseStudentSlice";
import QuizContainer from "../components/QuizContainer";
import TestPage from "./TestPage";
import { useBlobUrl } from "../utils/useBlobUrl";
import {
  FaFilePdf,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
} from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { debounce } from "lodash";
// Helpers
const getProgressColor = (percent) => {
  if (percent >= 80) return "border-green-500 text-green-500";
  if (percent >= 50) return "border-yellow-500 text-yellow-500";
  if (percent > 0) return "border-orange-500 text-orange-500";
  return "border-gray-400 text-gray-400";
};

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
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const course = useSelector((state) =>
    selectStudentCourseById(state, courseId)
  );
  const resume = useSelector((state) => selectResumeData(state)[courseId]);

  const [resumeFetched, setResumeFetched] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [openTopic, setOpenTopic] = useState({});
  const [completedContent, setCompletedContent] = useState({});
  const fetched = useRef(false);
  useEffect(() => {
    if (token && isLoggedIn && !fetched.current) {
      dispatch(getPurchasedEnrolledCoursesByUser());
      fetched.current = true;
    } else if (!isLoggedIn) {
      dispatch(resetCourseStudentState());
      fetched.current = false;
    }
  }, [dispatch, token, isLoggedIn]);

  useEffect(() => {
    if (token && courseId && course) {
      dispatch(getCourseResume(courseId)).finally(() => setResumeFetched(true));
    }
  }, [dispatch, token, courseId, course]);

  useEffect(() => {
    if (resumeFetched && resume) {
      const { lastWatched, completedContent: completed = [] } = resume;
      if (lastWatched) {
        setActiveModule(lastWatched.moduleIndex);
        setSelectedTopic(lastWatched.topicIndex);
        setSelectedContent(lastWatched.contentIndex);
      }
      const map = {};
      completed.forEach((key) => (map[key] = true));
      setCompletedContent(map);
    }
  }, [resumeFetched, resume]);



const debouncedResumeUpdate = debounce((payload) => {
  dispatch(updateCourseResume(payload));
}, 1000); 

const markContentComplete = (mIdx, tIdx, cIdx) => {
  const key = `${mIdx}-${tIdx}-${cIdx}`;
  if (completedContent[key]) return;

  const watchedHours = resume?.watchedHours || 0;
  const prevCompleted = resume?.completedContent || [];

  const updatedCompleted = [...new Set([...prevCompleted, key])];

  debouncedResumeUpdate({
    courseId,
    lastWatched: { moduleIndex: mIdx, topicIndex: tIdx, contentIndex: cIdx },
    watchedHours: watchedHours + 0.25,
    completedContent: updatedCompleted,
  });

  setCompletedContent((prev) => ({ ...prev, [key]: true }));
};


  const isContentCompleted = (mIdx, tIdx, cIdx) =>
    !!completedContent[`${mIdx}-${tIdx}-${cIdx}`];

  const getModuleProgress = (mIdx) => {
    const mod = course?.modules?.[mIdx];
    const total = mod?.topics?.reduce(
      (sum, t) => sum + (t.contents?.length || 0),
      0
    );
    const completed = mod?.topics?.reduce(
      (sum, t, tIdx) =>
        sum +
        (t.contents?.filter((_, cIdx) =>
          isContentCompleted(mIdx, tIdx, cIdx)
        )?.length || 0),
      0
    );
    return total ? Math.round((completed / total) * 100) : 0;
  };

  const activeMod = course?.modules?.[activeModule];
  const selectedTopicObj = activeMod?.topics?.[selectedTopic];
  const selectedContentObj = selectedTopicObj?.contents?.[selectedContent];
  const blobUrl = useBlobUrl(selectedContentObj?.url);

  const {
    watchedHours = 0,
    testsCount = 0,
    assignmentsCount = 0,
    questionsCount = 0,
    progressPercent = 0,
  } = resume || {};

  if (!token) return <div className="p-6 text-red-600">Unauthorized. Token missing.</div>;
  if (!course) return <div className="p-6">Loading course...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#001932] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="bg-gray-700 px-3 py-1 text-xs rounded-full mb-2 inline-block">
              {course.badge}
            </span>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-gray-200">
              {course.description || "No description available."}
            </p>
            <div className="flex gap-4 flex-wrap mt-4 text-sm text-gray-300">
              <span>⏱️ {Math.round(course.totalHours || 0)}+ hours</span>
              <span>📝 {testsCount} Assessments</span>
              <span>📎 {assignmentsCount} Assignments</span>
              <span>❓ {questionsCount} Questions</span>
              <span>⚡ {course.level || "Beginner"}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Your Performance</p>
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

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 bg-white border rounded p-4">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          {course.modules?.map((mod, mIdx) => (
            <div key={mIdx} className="mb-2">
              <button
                className={`w-full flex justify-between items-center text-left font-medium py-2 px-3 rounded ${
                  activeModule === mIdx
                    ? "bg-blue-100 text-primary"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveModule(mIdx);
                  setOpenTopic({});
                  setSelectedTopic(null);
                  setSelectedContent(null);
                }}
              >
                <span>{mod.moduleTitle}</span>
                <span className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="w-20 h-2 bg-gray-300 rounded overflow-hidden">
                    <span
                      className="block h-2 bg-blue-500"
                      style={{ width: `${getModuleProgress(mIdx)}%` }}
                    ></span>
                  </span>
                  {getModuleProgress(mIdx)}%
                  {activeModule === mIdx ? <HiChevronUp /> : <HiChevronDown />}
                </span>
              </button>
              {activeModule === mIdx &&
                mod.topics?.map((topic, tIdx) => (
                  <div key={tIdx} className="pl-3 mt-1">
                    <button
                      onClick={() =>
                        setOpenTopic((prev) => ({
                          ...prev,
                          [tIdx]: !prev[tIdx],
                        }))
                      }
                      className={`w-full flex justify-between items-center py-1 px-2 rounded ${
                        openTopic[tIdx]
                          ? "bg-blue-50 text-blue-800 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(tIdx);
                          setSelectedContent(0);
                        }}
                        className={`cursor-pointer flex-1 text-left ${
                          selectedTopic === tIdx ? "underline font-bold" : ""
                        }`}
                      >
                        {topic.topicTitle}
                      </span>
                      {openTopic[tIdx] ? <HiChevronUp /> : <HiChevronDown />}
                    </button>
                    {openTopic[tIdx] && (
                      <ul className="pl-4">
                        {topic.contents?.map((content, cIdx) => (
                          <li
                            key={cIdx}
                            className={`flex items-center text-xs py-1 cursor-pointer ${
                              selectedTopic === tIdx &&
                              selectedContent === cIdx
                                ? "text-blue-700 font-semibold"
                                : "text-gray-600"
                            }`}
                            onClick={() => {
                              setSelectedTopic(tIdx);
                              setSelectedContent(cIdx);
                            }}
                          >
                            {getContentIcon(content.type)}
                            {content.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="w-full lg:w-2/3 bg-white p-6 shadow rounded min-h-[300px]">
          {selectedContentObj ? (
            <div>
              <h3 className="text-lg font-bold mb-2">{selectedContentObj.name}</h3>
              {selectedContentObj.type === "test" ? (
                selectedContentObj.isFinalTest ? (
                  <TestPage
                    finalTestQuestions={selectedContentObj.questions}
                    courseTitle={course.title}
                    isFinalTest={true}
                  />
                ) : (
                  <QuizContainer
                    quizId={`quiz-${selectedContentObj.name}`}
                    quizName={selectedContentObj.name}
                    testQuestions={selectedContentObj.questions}
                    userId={user?.email || "guest"}
                  />
                )
              ) : (
                <>
                  {selectedContentObj.type === "video" && blobUrl && (
                    <video
                      src={blobUrl}
                      controls
                      controlsList="nodownload"
                      className="w-full h-[400px] rounded"
                      onEnded={() =>
                        markContentComplete(
                          activeModule,
                          selectedTopic,
                          selectedContent
                        )
                      }
                    />
                  )}
                  {selectedContentObj.type === "audio" && blobUrl && (
                    <audio
                      src={blobUrl}
                      controls
                      controlsList="nodownload"
                      className="w-full h-[400px] rounded"
                      onEnded={() =>
                        markContentComplete(
                          activeModule,
                          selectedTopic,
                          selectedContent
                        )
                      }
                    />
                  )}
                  {selectedContentObj.type === "pdf" && blobUrl && (
                    <iframe
                      src={blobUrl}
                      title={selectedContentObj.name}
                      className="w-full h-[400px]  border rounded"
                      onLoad={() =>
                        markContentComplete(
                          activeModule,
                          selectedTopic,
                          selectedContent
                        )
                      }
                    />
                  )}
                  {selectedContentObj.type === "image" && blobUrl && (
                    <img
                      src={blobUrl}
                      alt={selectedContentObj.name}
                      className="w-full h-[400px] rounded"
                      onLoad={() =>
                        markContentComplete(
                          activeModule,
                          selectedTopic,
                          selectedContent
                        )
                      }
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Select a topic and content to view it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseResumePage;

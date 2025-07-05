import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaCheckCircle, FaFilePdf, FaFileImage, FaFileAudio, FaFileVideo
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourseStudents,
  selectCourseStudents
} from "../store/courseStudentSlice";
import QuizContainer from "../components/QuizContainer";
import { useBlobUrl } from "../utils/useBlobUrl";

// Utility to render correct icon
const getContentIcon = (type) => {
  switch (type) {
    case "video": return <FaFileVideo className="text-blue-500 mr-2" />;
    case "pdf": return <FaFilePdf className="text-red-500 mr-2" />;
    case "image": return <FaFileImage className="text-green-500 mr-2" />;
    case "audio": return <FaFileAudio className="text-purple-500 mr-2" />;
    default: return <span className="mr-2">📄</span>;
  }
};
const selectStudentCourseById = (state, courseId) => {
  const students = selectCourseStudents(state);
  for (const student of students) {
    const match = student.enrolledCourses?.find(c => String(c.courseId) === String(courseId));
    if (match) return match;
  }
  return null;
};

const CourseResumePage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const course = useSelector((state) => selectStudentCourseById(state, courseId));

  const [activeModule, setActiveModule] = useState(null);
  const [openTopic, setOpenTopic] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [completedContent, setCompletedContent] = useState({});

  useEffect(() => {
    dispatch(fetchAllCourseStudents());
  }, [dispatch]);

  if (!course || !course.modules) {
    return <div className="text-center py-10 text-gray-500">Course not found or not enrolled.</div>;
  }

  const markContentComplete = (mIdx, tIdx, cIdx) => {
    const key = `${mIdx}-${tIdx}-${cIdx}`;
    setCompletedContent((prev) => ({ ...prev, [key]: true }));
  };

  const isContentCompleted = (mIdx, tIdx, cIdx) => completedContent[`${mIdx}-${tIdx}-${cIdx}`];

  const getModuleProgress = (mIdx) => {
    const module = course.modules[mIdx];
    const total = module.topics.reduce((sum, t) => sum + (t.contents?.length || 0), 0);
    const done = module.topics.reduce(
      (sum, t, tIdx) =>
        sum + t.contents.filter((_, cIdx) => isContentCompleted(mIdx, tIdx, cIdx)).length,
      0
    );
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const progressPercent = course.totalHours && course.watchedHours
    ? Math.round((course.watchedHours / course.totalHours) * 100)
    : 0;

  const getProgressColor = (percent) => {
    if (percent < 60) return "text-red-500 border-red-500";
    if (percent < 85) return "text-yellow-400 border-yellow-400";
    return "text-green-400 border-green-400";
  };

  const activeMod = course.modules?.[activeModule];
  const selectedTopicObj = activeMod?.topics?.[selectedTopic];
  const selectedContentObj = selectedTopicObj?.contents?.[selectedContent];
  const blobUrl = useBlobUrl(selectedContentObj?.url);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#001932] text-white py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-sm text-gray-300">{course.level} • {course.duration}</p>
          </div>
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full border-[6px] flex items-center justify-center ${getProgressColor(progressPercent)}`}>
              <div className="text-lg font-bold">{progressPercent}%</div>
            </div>
            <p className="text-xs">Progress</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          {course.modules.map((mod, mIdx) => (
            <div key={mIdx} className="mb-2">
              <button
                className={`w-full flex justify-between items-center p-3 border rounded ${activeModule === mIdx ? "bg-blue-100" : "bg-white"}`}
                onClick={() => {
                  setActiveModule(mIdx);
                  setOpenTopic({});
                  setSelectedTopic(null);
                  setSelectedContent(null);
                }}
              >
                <span>{mod.moduleTitle}</span>
                <span className="text-xs text-gray-500">{getModuleProgress(mIdx)}%</span>
              </button>

              {activeModule === mIdx && mod.topics.map((topic, tIdx) => (
                <div key={tIdx} className="pl-4 mt-1">
                  <button
                    className="w-full text-left text-sm font-medium py-1"
                    onClick={() => {
                      setOpenTopic((prev) => ({ ...prev, [tIdx]: !prev[tIdx] }));
                      setSelectedTopic(tIdx);
                      setSelectedContent(0);
                    }}
                  >
                    {topic.topicTitle}
                  </button>
                  {openTopic[tIdx] && (
                    <ul className="pl-4">
                      {topic.contents.map((content, cIdx) => (
                        <li
                          key={cIdx}
                          className="cursor-pointer text-xs py-1 text-gray-700 flex items-center"
                          onClick={() => setSelectedContent(cIdx)}
                        >
                          {getContentIcon(content.type)}
                          {content.name}
                          {isContentCompleted(mIdx, tIdx, cIdx) && (
                            <FaCheckCircle className="ml-1 text-green-500 text-[10px]" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full lg:w-2/3 bg-white rounded shadow p-4">
          {selectedContentObj ? (
            <>
              <h3 className="font-semibold mb-2">{selectedContentObj.name}</h3>
              {selectedContentObj.type === "video" && blobUrl && (
                <video
                  src={blobUrl}
                  controls
                  className="w-full rounded"
                  onEnded={() => markContentComplete(activeModule, selectedTopic, selectedContent)}
                />
              )}
              {selectedContentObj.type === "image" && blobUrl && (
                <img
                  src={blobUrl}
                  alt="Preview"
                  className="w-full rounded"
                  onLoad={() => markContentComplete(activeModule, selectedTopic, selectedContent)}
                />
              )}
              {selectedContentObj.type === "pdf" && blobUrl && (
                <iframe
                  src={blobUrl}
                  className="w-full h-[500px] border rounded"
                  title={selectedContentObj.name}
                  onLoad={() => markContentComplete(activeModule, selectedTopic, selectedContent)}
                />
              )}
              {selectedContentObj.type === "test" && (
                <QuizContainer
                  quizId={`quiz-${course.courseId}-${activeModule}-${selectedTopic}-${selectedContent}`}
                  quizName={selectedContentObj.name}
                  testQuestions={selectedContentObj.questions}
                  userId={user?.email || user?.id || "guest"}
                />
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">Select a topic and content to begin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseResumePage;

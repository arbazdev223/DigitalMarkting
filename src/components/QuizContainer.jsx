import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTestQuestion from "./DynamicTestQuestion";
import {
  setUserAnswers,
  setScore,
  addAttempt,
  saveTestData,
  selectAttempts,
  selectMaxScore,
  selectScore,
  selectUserAnswers,
  selectAttemptCount,
  selectCorrect,
  selectIncorrect,
  selectPercent,
  getTestData,
} from "../store/testSlice";
import { selectStudentCourseById } from "../store/courseStudentSlice";

const QuizContainer = ({
  quizId,
  courseId,
  quizName,
  testQuestions,
  userId,
  passPercentage = 80,
  maxAttempts = 3,
}) => {
  const dispatch = useDispatch();
  const attempts = useSelector((state) => selectAttempts(state, quizId));
  const maxScore = useSelector((state) => selectMaxScore(state, quizId));
  const score = useSelector((state) => selectScore(state, quizId));
  const userAnswers = useSelector((state) => selectUserAnswers(state, quizId));
  const attemptCount = useSelector((state) => selectAttemptCount(state, quizId));
  const quizReports = useSelector((state) => state.test.quizReports);
  const course = useSelector((state) => selectStudentCourseById(state, courseId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const timerRef = useRef();

  const totalQuestions = testQuestions.length;
  const attemptsLeft = maxAttempts - (attempts?.length || 0);


  
useEffect(() => {
  dispatch(getTestData({ userId }));
}, [dispatch, userId,]);
  useEffect(() => {
    if (showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [showResult]);
const handleSubmit = () => {
  clearInterval(timerRef.current);

  const currentUserAnswers = { ...(userAnswers || {}) };
  let newScore = 0;

  testQuestions.forEach((q, idx) => {
    const correctAnswer = Array.isArray(q.answer)
      ? [...q.answer].sort().join(",")
      : (q.answer ?? "");
    const userAnswerRaw = currentUserAnswers[q.id || idx];
    const userAnswer = Array.isArray(userAnswerRaw)
      ? [...userAnswerRaw].sort().join(",")
      : (userAnswerRaw ?? "");

    if (correctAnswer === userAnswer) {
      newScore += 1;
    }
  });

  const total = Number.isFinite(totalQuestions) && totalQuestions > 0
    ? totalQuestions
    : testQuestions.length;

  const correct = newScore;
  const incorrect = total - correct;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  const previousReport = quizReports?.[quizId] ?? {};
  const previousAttempts = Array.isArray(previousReport.attempts)
    ? previousReport.attempts.slice(-3)
    : [];

  if (previousAttempts.length >= 3) {
    console.warn("⛔ Max attempts reached");
    return;
  }

  const newAttempt = {
    score: newScore,
    timestamp: new Date().toISOString(),
    userAnswers: currentUserAnswers,
  };

  const updatedAttempts = [...previousAttempts, newAttempt];

  const updatedReport = {
    quizName: quizName || "Untitled Quiz",
    totalQuestions: total,
    attempts: updatedAttempts,
    maxScore: Math.max(previousReport.maxScore ?? 0, newScore),
    lastScore: newScore,
    lastUserAnswers: currentUserAnswers,
    correct,
    incorrect,
    percent,
  };

  dispatch(setUserAnswers({ quizId, answers: currentUserAnswers }));
  dispatch(setScore({ quizId, score: newScore }));
  dispatch(addAttempt({
    quizId,
    score: newScore,
    userAnswers: currentUserAnswers,
    quizName,
    totalQuestions: total,
  }));

  dispatch(
    saveTestData({
      userId,
      courseId,
      quizId,
      score: newScore,
      userAnswers: currentUserAnswers,
      attemptCount: updatedAttempts.length,
      quizReport: updatedReport,
    })
  ).then((res) => {
    if (res.error) {
      console.error("❌ Failed to save test data:", res.error);
    } else {
      console.log("✅ Test data saved successfully");
    }
  });

  setShowResult(true);
};

  const handleOptionChange = (option) => {
    const q = testQuestions[currentQuestionIndex];
    const id = q.id || currentQuestionIndex;
    const existing = userAnswers?.[id] || [];
    const updated =
      q.type === "multi"
        ? existing.includes(option)
          ? existing.filter((o) => o !== option)
          : [...existing, option]
        : [option];
    dispatch(setUserAnswers({ quizId, answers: { ...userAnswers, [id]: updated } }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      clearInterval(timerRef.current);
      setTimeLeft(90);
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  const totalDurationMins = Math.ceil((totalQuestions * 90) / 60);

  const InfoBar = () => (
    <div className="w-full mb-6 bg-white rounded-lg shadow p-0 overflow-hidden">
      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x">
        <div className="flex flex-col items-center flex-1 min-w-[150px] p-4">
          <span className="text-2xl mb-1">⏱️</span>
          <span className="text-xs text-gray-500">Test Duration</span>
          <span className="font-bold text-base">{totalDurationMins} Mins</span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[150px] p-4">
          <span className="text-2xl mb-1">📝</span>
          <span className="text-xs text-gray-500">No of Questions</span>
          <span className="font-bold text-base">{totalQuestions}</span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[150px] p-4">
          <span className="text-2xl mb-1">🎯</span>
          <span className="text-xs text-gray-500">Pass Percentage</span>
          <span className="font-bold text-base">{passPercentage}%</span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-[150px] p-4">
          <span className="text-2xl mb-1">📄</span>
          <span className="text-xs text-gray-500">Attempt Left</span>
          <span className="font-bold text-base">
            {attemptsLeft}/{maxAttempts}
          </span>
          {attempts.length > 0 && (
            <button
              className="text-xs text-blue-700 underline mt-1"
              onClick={() => setShowReport(true)}
            >
              View Report
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ReportScreen = () => {
    const correct = score;
    const incorrect = totalQuestions - score;
    const percent = totalQuestions
      ? Math.round((score / totalQuestions) * 100)
      : 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const correctStroke = (correct / totalQuestions) * circumference;
    const incorrectStroke = circumference - correctStroke;

    return (
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-[#0e2237] p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-white text-xl font-bold mb-1">
              {quizName} - Report
            </div>
            <div className="text-gray-300 text-sm">
              Attempt: <span className="font-semibold">{attempts.length}</span>{" "}
              / {maxAttempts}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-xs text-gray-300 mb-1">
              Your Performance Status
            </div>
            <div className="flex items-center gap-2">
              <div className="w-48 h-3 bg-gray-700 rounded-full overflow-hidden relative">
                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
                <div
                  className="absolute left-0 top-0 h-3 border-l-2 border-yellow-400"
                  style={{ left: `${passPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-white ml-2">{percent}%</span>
              <span className="text-xs text-yellow-300 ml-2">
                Pass: {passPercentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 p-6 bg-gray-50">
          <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Attempts</div>
            <div className="font-bold text-lg">{attempts.length}</div>
          </div>
          <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Highest Score</div>
            <div className="font-bold text-lg">
              {maxScore} / {totalQuestions}
            </div>
          </div>
          <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Last Score</div>
            <div className="font-bold text-lg">
              {score} / {totalQuestions}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="font-semibold mb-4">Answer Breakdown</div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="16"
                  strokeDasharray={circumference}
                  strokeDashoffset="0"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="16"
                  strokeDasharray={`${correctStroke} ${incorrectStroke}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="bold"
                  fill="#222"
                >
                  {totalQuestions}
                </text>
                <text
                  x="60"
                  y="80"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  Total
                </text>
              </svg>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1"></span>
                  Correct: {correct}
                </span>
                <span className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                  Incorrect: {incorrect}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-2">All Attempts:</div>
              <ul className="list-disc pl-6 text-gray-700">
                {attempts.map((a, i) => (
                  <li key={i}>
                    Attempt {i + 1}: {a} / {totalQuestions}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {attempts.length > 0 && (
          <div className="p-6 pt-0 flex justify-end">
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              onClick={() => setShowReport(false)}
            >
              Back to Quiz
            </button>
          </div>
        )}
      </div>
    );
  };

  const StatsBar = () => {
    const correct = score;
    const incorrect = totalQuestions - score;
    // const percent = totalQuestions
    //   ? Math.round((score / totalQuestions) * 100)
    //   : 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const correctStroke = (correct / totalQuestions) * circumference;
    const incorrectStroke = circumference - correctStroke;

    return (
      <div className="flex flex-wrap gap-6 p-6 bg-gray-50 justify-center">
        <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Attempts</div>
          <div className="font-bold text-lg">{attempts.length}</div>
        </div>
        <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Highest Score</div>
          <div className="font-bold text-lg">
            {maxScore} / {totalQuestions}
          </div>
        </div>
        <div className="flex-1 min-w-[160px] bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Last Score</div>
          <div className="font-bold text-lg">
            {score} / {totalQuestions}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-w-[180px]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#facc15"
              strokeWidth="16"
              strokeDasharray={circumference}
              strokeDashoffset="0"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#4ade80"
              strokeWidth="16"
              strokeDasharray={`${correctStroke} ${incorrectStroke}`}
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#222"
              dominantBaseline="middle"
            >
              {score}
            </text>
            <text
              x="60"
              y="85"
              textAnchor="middle"
              fontSize="12"
              fill="#666"
              dominantBaseline="middle"
            >
              / {totalQuestions}
            </text>
          </svg>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1"></span>
              Correct: {correct}
            </span>
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
              Incorrect: {incorrect}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (showReport) {
    return (
      <div className="p-4">
        <InfoBar />
        <ReportScreen />
        {attemptsLeft > 0 && (
          <div className="flex justify-end mt-4">
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              onClick={() => setShowReport(false)}
            >
              Back to Quiz
            </button>
          </div>
        )}
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="p-4">
        <InfoBar />
        {attemptsLeft > 0 ? (
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
  dispatch(setUserAnswers({ quizId, answers: {} }));
  dispatch(setScore({ quizId, score: 0 }));
  setShowResult(false);
  setShowReport(false);
  setCurrentQuestionIndex(0);
  setTimeLeft(90);
}}
          >
            Start Test Again
          </button>
        ) : (
          <div className="mt-4 text-red-600 font-semibold">
            No more attempts left.
          </div>
        )}
      </div>
    );
  }

  if (attemptsLeft > 0) {
    return (
      <div>
        <DynamicTestQuestion
          currentQuestionIndex={currentQuestionIndex}
          testQuestions={testQuestions}
          currentQuestion={testQuestions[currentQuestionIndex]}
          userAnswers={userAnswers}
          handleOptionChange={handleOptionChange}
          goToNextQuestion={goToNextQuestion}
          handleSubmit={handleSubmit}
          timeLeft={timeLeft}
        />
      </div>
    );
  }

  return (
    <div>
      <InfoBar />
    </div>
  );
};

export default QuizContainer;

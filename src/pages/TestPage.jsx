import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setScore,
  decrementAttempts,
  addCertificate,
} from "../store/testSlice";

import confetti from "canvas-confetti";
import QuizResult from "../components/QuizResult";

const TestPage = (props) => {
  const {
    quizzes = [],
    allModulesCompleted = false,
    finalTestQuestions = [],
    showUserInfo = true,
    courseTitle,
    onCertificateEarned,
    onTestComplete,
    isFinalTest = false,
  } = props;

  const quizReports = useSelector((state) => state.test.quizReports || {});
  const quizIds = Object.keys(quizReports);
  const [selectedQuizId, setSelectedQuizId] = useState(quizIds[0] || "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90);
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const dispatch = useDispatch();
  const score = useSelector((state) => state.test.score);
  const attempts = useSelector((state) => state.test.attempts);

  const currentQuestion = allModulesCompleted
    ? finalTestQuestions[currentQuestionIndex]
    : (quizzes.find((q) => q.id === selectedQuizId)?.questions || [])[
        currentQuestionIndex
      ];

  useEffect(() => {
    if (timeLeft > 0 && !submitted && allModulesCompleted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && allModulesCompleted) {
      goToNextQuestion();
    }
  }, [timeLeft, submitted, allModulesCompleted]);

  useEffect(() => {
    const totalQ = allModulesCompleted
      ? finalTestQuestions.length
      : quizzes.find((q) => q.id === selectedQuizId)?.questions.length || 1;
    const percent = Math.round((score / totalQ) * 100);
    if (submitted && percent >= 95) {
      setShowCelebration(true);
      confetti({ spread: 160, particleCount: 300, origin: { y: 0.6 } });

      const timer = setTimeout(() => {}, 4000);

      return () => clearTimeout(timer);
    }
  }, [
    submitted,
    score,
    // navigate,
    allModulesCompleted,
    finalTestQuestions.length,
    quizzes,
    selectedQuizId,
  ]);

  const handleOptionChange = (option) => {
    if (!currentQuestion) return;
    const isMulti = currentQuestion.type === "multi";
    const current = userAnswers[currentQuestion.id] || [];

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: isMulti
        ? current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option]
        : [option],
    }));
  };

  const goToNextQuestion = () => {
    setTimeLeft(90);
    if (allModulesCompleted) {
      if (currentQuestionIndex < finalTestQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => {
          const nextIndex = prev + 1;
          const nextQuestionId = finalTestQuestions[nextIndex].id;
          setUserAnswers((prevAnswers) => {
            const updated = { ...prevAnswers };
            updated[nextQuestionId] = [];
            return updated;
          });
          return nextIndex;
        });
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    let total = 0;
    const questions = allModulesCompleted
      ? finalTestQuestions
      : quizzes.find((q) => q.id === selectedQuizId)?.questions || [];
    questions.forEach((q) => {
      const userAns = userAnswers[q.id] || [];
      const correct = q.correctAnswers;
      const isCorrect =
        userAns.length === correct.length &&
        userAns.every((ans) => correct.includes(ans));
      if (isCorrect) total += 1;
    });

    dispatch(setScore(total));
    dispatch(decrementAttempts());
    setSubmitted(true);

    const percent = Math.round((total / questions.length) * 100);
    if (percent >= 95 && isFinalTest && allModulesCompleted) {
      const cert = {
        name: username,
        course: courseTitle,
        date: new Date().toLocaleDateString(),
        id: Date.now(),
      };
      dispatch(addCertificate(cert));
      if (onCertificateEarned) {
        onCertificateEarned();
      }
    }
    if (onTestComplete) onTestComplete(percent);
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(90);
    setSubmitted(false);
    dispatch(setScore(0));
    setShowCelebration(false);
  };
  if (submitted) {
    const totalQ = allModulesCompleted
      ? finalTestQuestions.length
      : quizzes.find((q) => q.id === selectedQuizId)?.questions.length || 1;
    const percent = Math.round((score / totalQ) * 100);

    return (
      <div className="max-w-3xl mx-auto p-6 text-center relative">
        <h2 className="text-2xl font-bold mb-4 text-[#0e3477]">Test Result</h2>
        <p className="text-lg mb-4 text-gray-700">
          You got <strong>{score}</strong> out of <strong>{totalQ}</strong>{" "}
          correct (<strong>{percent}%</strong>).
        </p>

        {percent >= 95 && showCelebration && (
          <div className="text-green-600 font-bold text-xl mb-2 animate-bounce">
            🎉 Congratulations! You're eligible for the certificate!
          </div>
        )}

        {percent < 95 && attempts > 0 && (
          <button
            onClick={resetTest}
            className="bg-[#0e3477] text-white px-4 py-2 rounded shadow hover:bg-[#092963]"
          >
            Retry Test ({attempts} attempt{attempts > 1 ? "s" : ""} left)
          </button>
        )}

        {percent < 95 && attempts === 0 && (
          <p className="text-red-600 font-semibold">No more attempts left.</p>
        )}
      </div>
    );
  }

  const isAnswered = !!userAnswers[currentQuestion?.id]?.length;

  if (!props.allModulesCompleted) {
    if (quizIds.length === 0) {
      return (
        <div className="text-center text-gray-500 py-12">
          No quiz reports found.
          <br />
          <span className="text-sm">
            Try attempting a quiz to see your report here.
          </span>
        </div>
      );
    }
    const selectedQuiz = quizReports[selectedQuizId];
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Quiz Reports</h2>
        <div className="mb-4 flex items-center gap-2">
          <label className="font-semibold">Select Quiz:</label>
          <select
            className="border rounded px-2 py-1"
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
          >
            {quizIds.map((qid) => (
              <option key={qid} value={qid}>
                {quizReports[qid].quizName}
              </option>
            ))}
          </select>
        </div>
        {selectedQuiz && (
          <QuizResult
            quizName={selectedQuiz.quizName}
            attempts={selectedQuiz.attempts}
            totalQuestions={selectedQuiz.totalQuestions}
          />
        )}
      </div>
    );
  }
  if (allModulesCompleted) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Final Test</h2>
        {finalTestQuestions.length > 0 && !submitted && (
          <div className="bg-white rounded shadow p-6 max-w-xl mx-auto">
            <div className="mb-4 font-semibold">
              Question {currentQuestionIndex + 1} of {finalTestQuestions.length}
            </div>
            <div className="mb-4">{currentQuestion?.question}</div>
            <div className="mb-4">
              {currentQuestion?.options?.map((option, idx) => (
                <label key={idx} className="block mb-2 cursor-pointer">
                  <input
                    type={
                      currentQuestion.type === "multi" ? "checkbox" : "radio"
                    }
                    name="option"
                    value={option}
                    checked={
                      userAnswers[currentQuestion.id]
                        ? userAnswers[currentQuestion.id].includes(option)
                        : false
                    }
                    onChange={() => handleOptionChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Time Left: {timeLeft}s
              </span>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={
                  currentQuestionIndex === finalTestQuestions.length - 1
                    ? handleSubmit
                    : goToNextQuestion
                }
                disabled={!isAnswered}
              >
                {currentQuestionIndex === finalTestQuestions.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default TestPage;
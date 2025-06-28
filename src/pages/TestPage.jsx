import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setScore,
  decrementAttempts,
  addCertificate,
} from "../store/testSlice";

import confetti from "canvas-confetti";

const TestPage = ({
  testQuestions,
  showUserInfo = true,
  courseTitle,
  onCertificateEarned,
  onTestComplete,
  isFinalTest = false, 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90);
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const dispatch = useDispatch();
  const score = useSelector((state) => state.test.score);
  const attempts = useSelector((state) => state.test.attempts);

  const username = useSelector((state) => state.auth.user?.name || "Student");

  const navigate = useNavigate();
  const currentQuestion = testQuestions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      goToNextQuestion();
    }
  }, [timeLeft, submitted]);

  useEffect(() => {
    const percent = Math.round((score / testQuestions.length) * 100);
    if (submitted && percent >= 95) {
      setShowCelebration(true);
      confetti({ spread: 160, particleCount: 300, origin: { y: 0.6 } });

      const timer = setTimeout(() => {}, 4000);

      return () => clearTimeout(timer);
    }
  }, [submitted, score, navigate]);

  const handleOptionChange = (option) => {
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
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => {
        const nextIndex = prev + 1;
        const nextQuestionId = testQuestions[nextIndex].id;
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
  };

  const handleSubmit = () => {
    let total = 0;

    testQuestions.forEach((q) => {
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

    const percent = Math.round((total / testQuestions.length) * 100);
    if (percent >= 95 && isFinalTest) { // <-- only for final test
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
    setScore(0);
    setShowCelebration(false);
  };

  if (submitted) {
    const percent = Math.round((score / testQuestions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto p-6 text-center relative">
        <h2 className="text-2xl font-bold mb-4 text-[#0e3477]">Test Result</h2>
        <p className="text-lg mb-4 text-gray-700">
          You got <strong>{score}</strong> out of{" "}
          <strong>{testQuestions.length}</strong> correct (
          <strong>{percent}%</strong>).
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

  const isAnswered = !!userAnswers[currentQuestion.id]?.length;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {showUserInfo && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="text-sm text-gray-700 font-semibold">
            👤 {username}
          </div>
          <div className="text-sm text-[#0e3477] font-bold">
            📚 {courseTitle}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0e3477]">
          Question {currentQuestionIndex + 1} of {testQuestions.length}
        </h2>
        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded">
          ⏳ {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <p className="mb-4 font-medium text-gray-800">
          {currentQuestion.question}
        </p>
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const selected = userAnswers[currentQuestion.id]?.includes(option);
            return (
              <label
                key={idx}
                className={`block border px-4 py-2 rounded cursor-pointer ${
                  selected
                    ? "bg-[#e0ebff] border-[#0e3477]"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <input
                  type={currentQuestion.type === "multi" ? "checkbox" : "radio"}
                  name={`q_${currentQuestion.id}`}
                  value={option}
                  checked={selected}
                  onChange={() => handleOptionChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={goToNextQuestion}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={!isAnswered}
          >
            {currentQuestionIndex === testQuestions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

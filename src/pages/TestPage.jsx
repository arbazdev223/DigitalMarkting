import React, { useState, useEffect } from "react";
import { testQuestions } from "../../data";

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90);
  const [attempts, setAttempts] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = testQuestions[currentQuestionIndex];
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      goToNextQuestion();
    }
  }, [timeLeft, submitted]);

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
      setCurrentQuestionIndex((prev) => prev + 1);
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

    setScore(total);
    setSubmitted(true);
    setAttempts((prev) => prev - 1);
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(90);
    setSubmitted(false);
    setScore(0);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#0e3477]">Test Result</h2>
        <p className="text-lg mb-4 text-gray-700">
          You got <strong>{score}</strong> out of{" "}
          <strong>{testQuestions.length}</strong> correct.
        </p>
        {attempts > 0 ? (
          <button
            onClick={resetTest}
            className="bg-[#0e3477] text-white px-4 py-2 rounded shadow hover:bg-[#092963]"
          >
            Retry Test ({attempts} attempt{attempts > 1 ? "s" : ""} left)
          </button>
        ) : (
          <p className="text-red-600 font-semibold">No more attempts left.</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0e3477]">
          Question {currentQuestionIndex + 1} of {testQuestions.length}
        </h2>
        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded">
          ⏳ {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <p className="mb-4 font-medium text-gray-800">{currentQuestion.question}</p>
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
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
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

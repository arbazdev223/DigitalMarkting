import React from "react";

const DynamicTestQuestion = ({
  currentQuestionIndex,
  testQuestions = [],
  timeLeft = 3,
  currentQuestion,
  userAnswers,
  handleOptionChange,
  goToNextQuestion,
  handleSubmit,
}) => {
  if (!currentQuestion) return null;
  const answerKey = currentQuestion.id ?? currentQuestionIndex;
  const answerArr = userAnswers[answerKey];
  const isAnswered = Array.isArray(answerArr) && answerArr.length > 0;

  const handleButtonClick = () => {
    if (currentQuestionIndex === testQuestions.length - 1) {
      handleSubmit && handleSubmit();
    } else {
      goToNextQuestion();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">
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
            const selected = answerArr?.includes(option);
            return (
              <label
                key={idx}
                className={`block border px-4 py-2 rounded cursor-pointer ${
                  selected
                    ? "bg-[#e0ebff] border-primary"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <input
                  type={currentQuestion.type === "multi" ? "checkbox" : "radio"}
                  name={`q_${answerKey}`}
                  value={option}
                  checked={!!selected} 
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
            onClick={handleButtonClick}
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

export default DynamicTestQuestion;

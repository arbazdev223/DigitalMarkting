import React from "react";

const QuizResult = ({ quizName, attempts = [], totalQuestions = 0 }) => {
  const highestScore = attempts.length ? Math.max(...attempts) : 0;
  const correct = highestScore;
  const incorrect = totalQuestions - correct;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const correctStroke = (correct / totalQuestions) * circumference;
  const incorrectStroke = circumference - correctStroke;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto my-4">
      <h3 className="text-lg font-bold mb-2">{quizName} - Report</h3>
      <div className="flex flex-col items-center mb-4">
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
            y="60"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill="#222"
            dominantBaseline="middle"
          >
            {correct}
          </text>
          <text
            x="60"
            y="75"
            textAnchor="middle"
            fontSize="14"
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
      <div>
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
  );
};

export default QuizResult;

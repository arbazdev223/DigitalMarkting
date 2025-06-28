import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTestQuestion from "./DynamicTestQuestion";
import { setUserAnswers, setScore } from "../store/testSlice";

const getQuizKey = (userId, quizId) => `quizResult_${userId}_${quizId}`;

const QuizContainer = ({ quizId, quizName, testQuestions, userId }) => {
  const dispatch = useDispatch();
  const reduxUserAnswers = useSelector((state) => state.test.userAnswers?.[quizId] || {});
  const reduxScore = useSelector((state) => state.test.score?.[quizId] || 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswersState] = useState(reduxUserAnswers);
  const [showResult, setShowResult] = useState(false);
  const [score, setScoreState] = useState(reduxScore);
  const [attempts, setAttempts] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); 
  const timerRef = useRef();
  useEffect(() => {
    const saved = localStorage.getItem(getQuizKey(userId, quizId));
    if (saved) {
      const parsed = JSON.parse(saved);
      setAttempts(parsed.attempts || []);
      setMaxScore(parsed.maxScore || 0);
      setScoreState(parsed.lastScore || 0);
      setShowResult(parsed.attempts?.length > 0);
      setUserAnswersState(parsed.lastUserAnswers || {});
    }
    setTimeLeft(90);
  }, [userId, quizId]);
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

  }, [showResult, quizId]);

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    let newScore = 0;
    testQuestions.forEach((q, idx) => {
      const correct = Array.isArray(q.answer) ? q.answer.sort().join(",") : q.answer;
      const user = userAnswers[q.id || idx]
        ? userAnswers[q.id || idx].sort().join(",")
        : "";
      if (correct === user) newScore += 1;
    });

    let newAttempts = attempts;
    if (attempts.length < 3) {
      newAttempts = [...attempts, newScore];
    }
    const newMax = Math.max(...newAttempts, maxScore);
    localStorage.setItem(
      getQuizKey(userId, quizId),
      JSON.stringify({
        quizName,
        attempts: newAttempts,
        maxScore: newMax,
        lastScore: newScore,
        lastUserAnswers: userAnswers,
      })
    );
    dispatch(setUserAnswers({ ...reduxUserAnswers, [quizId]: userAnswers }));
    dispatch(setScore({ ...reduxScore, [quizId]: newScore }));

    setScoreState(newScore);
    setAttempts(newAttempts);
    setMaxScore(newMax);
    setShowResult(true);
  };
  const handleOptionChange = (option) => {
    const q = testQuestions[currentQuestionIndex];
    setUserAnswersState((prev) => ({
      ...prev,
      [q.id || currentQuestionIndex]: q.type === "multi"
        ? prev[q.id || currentQuestionIndex]
          ? prev[q.id || currentQuestionIndex].includes(option)
            ? prev[q.id || currentQuestionIndex].filter((o) => o !== option)
            : [...prev[q.id || currentQuestionIndex], option]
          : [option]
        : [option],
    }));
  };
  const goToNextQuestion = () => setCurrentQuestionIndex((i) => i + 1);

  if (showResult) {
    return (
      <div className="p-4">
        <div className="text-lg font-bold text-green-700">
          {quizName && <div className="mb-2">{quizName}</div>}
          Your Score: {score} / {testQuestions.length}
        </div>
        <div className="mt-2">
          Attempts: {attempts.join(", ")}
          <br />
          Highest Score: {maxScore} / {testQuestions.length}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            setShowResult(false);
            setCurrentQuestionIndex(0);
            setUserAnswersState({});
            setTimeLeft(90);
          }}
          disabled={attempts.length >= 3}
        >
          {attempts.length < 3 ? "Try Again" : "No More Attempts"}
        </button>
      </div>
    );
  }

  return (
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
  );
};

export default QuizContainer;
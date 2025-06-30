import { createSlice } from "@reduxjs/toolkit";
const load = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const initialState = {
  score: load("testScore", 0),
  attempts: load("testAttempts", 3),
  certificates: load("certificates", []),
  userAnswers: load("testAnswers", {}),
  completedContent: load("completedContent", {}),
  activeModule: load("activeModule", null),
  selectedTopic: load("selectedTopic", null),
  quizReports: load("quizReports", {}),
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
      save("testScore", state.score);
    },
    decrementAttempts: (state) => {
      if (state.attempts > 0) {
        state.attempts -= 1;
        save("testAttempts", state.attempts);
      }
    },
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
      save("certificates", state.certificates);
    },
    resetTest: (state) => {
      state.score = 0;
      state.userAnswers = {};
      save("testScore", 0);
      save("testAnswers", {});
    },
    setUserAnswers: (state, action) => {
      state.userAnswers = action.payload;
      save("testAnswers", state.userAnswers);
    },
    setCompletedContent: (state, action) => {
      state.completedContent = action.payload;
      save("completedContent", state.completedContent);
    },
    markContentComplete: (state, action) => {
      state.completedContent[action.payload] = true;
      save("completedContent", state.completedContent);
    },
    setActiveModule: (state, action) => {
      state.activeModule = action.payload;
      save("activeModule", state.activeModule);
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
      save("selectedTopic", state.selectedTopic);
    },
    resetProgress: (state) => {
      state.completedContent = {};
      state.activeModule = null;
      state.selectedTopic = null;
      save("completedContent", {});
      save("activeModule", null);
      save("selectedTopic", null);
    },
    resetAll: (state) => {
      state.score = 0;
      state.attempts = 3;
      state.certificates = [];
      state.userAnswers = {};
      state.completedContent = {};
      state.activeModule = null;
      state.selectedTopic = null;
      save("testScore", 0);
      save("testAttempts", 3);
      save("certificates", []);
      save("testAnswers", {});
      save("completedContent", {});
      save("activeModule", null);
      save("selectedTopic", null);
    },
    saveQuizReport: (state, action) => {
      // action.payload: { quizId, quizName, score, totalQuestions }
      const { quizId, quizName, score, totalQuestions } = action.payload;
      if (!state.quizReports[quizId]) {
        state.quizReports[quizId] = {
          quizName,
          attempts: [],
          totalQuestions,
        };
      }
      state.quizReports[quizId].quizName = quizName;
      state.quizReports[quizId].totalQuestions = totalQuestions;
      state.quizReports[quizId].attempts.push(score);
      save("quizReports", state.quizReports);
    },
    resetQuizReports: (state) => {
      state.quizReports = {};
      save("quizReports", {});
    },
  },
});

export const {
  setScore,
  decrementAttempts,
  addCertificate,
  resetTest,
  setUserAnswers,
  setCompletedContent,
  markContentComplete,
  setActiveModule,
  setSelectedTopic,
  resetProgress,
  resetAll,
  saveQuizReport,
  resetQuizReports,
} = testSlice.actions;

export default testSlice.reducer;

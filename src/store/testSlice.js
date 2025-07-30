import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// Async actions
export const getTestData = createAsyncThunk(
  "test/getTestData",
  async ({ userId, courseId }) => {
    const res = await axiosInstance.get("/tests/get", {
      params: { userId, courseId },
    });
    return res.data;
  }
);

export const saveTestData = createAsyncThunk(
  "test/saveTestData",
  async ({ userId, courseId, state }) => {
    const payload = { userId, courseId, ...state };
    const res = await axiosInstance.post("/tests/save", payload);
    return res.data;
  }
);

// Initial state
const initialState = {
  userAnswers: {},
  score: {},
  attempts: {},
  maxScores: {},
  certificates: [],
  completedContent: {},
  activeModule: null,
  selectedTopic: null,
  quizReports: {},
  loading: false,
  error: null,
  attemptCount: {},
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setUserAnswers: (state, action) => {
      const { quizId, answers } = action.payload;
      state.userAnswers[quizId] = answers;
    },
    setScore: (state, action) => {
      const { quizId, score } = action.payload;
      state.score[quizId] = score;
    },

    addAttempt: (state, action) => {
      const { quizId, score, userAnswers, quizName, totalQuestions } =
        action.payload;

      if (!state.quizReports[quizId]) {
        state.quizReports[quizId] = {
          quizName: quizName || "",
          totalQuestions: totalQuestions || 0,
          attempts: [],
          maxScore: 0,
          lastScore: 0,
          lastUserAnswers: {},
        };
      }

      const report = state.quizReports[quizId];

      report.attempts.push(score);
      report.maxScore = Math.max(report.maxScore, score);
      report.lastScore = score;
      report.lastUserAnswers = userAnswers || {};
      state.attemptCount[quizId] = (state.attemptCount[quizId] || 0) + 1;
    },

    decrementAttempts: (state, action) => {
      const { quizId } = action.payload;
      if (state.attemptCount[quizId]) {
        state.attemptCount[quizId] = Math.max(
          0,
          state.attemptCount[quizId] - 1
        );
      }
    },

    resetQuiz: (state, action) => {
      const { quizId } = action.payload;
      delete state.userAnswers[quizId];
      delete state.score[quizId];
      delete state.attempts[quizId];
      delete state.maxScores[quizId];
      delete state.quizReports[quizId];
      delete state.attemptCount[quizId];
    },

    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
    },

    setCompletedContent: (state, action) => {
      state.completedContent = action.payload;
    },
    markContentComplete: (state, action) => {
      state.completedContent[action.payload] = true;
    },
    setActiveModule: (state, action) => {
      state.activeModule = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    resetProgress: (state) => {
      state.completedContent = {};
      state.activeModule = null;
      state.selectedTopic = null;
    },

    resetQuizReports: (state) => {
      state.quizReports = {};
      state.attemptCount = {};
    },

    resetAll: (state) => {
      state.userAnswers = {};
      state.score = {};
      state.attempts = {};
      state.maxScores = {};
      state.certificates = [];
      state.completedContent = {};
      state.activeModule = null;
      state.selectedTopic = null;
      state.quizReports = {};
      state.attemptCount = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestData.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(getTestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveTestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTestData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveTestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setUserAnswers,
  setScore,
  addAttempt,
  decrementAttempts,
  resetQuiz,
  addCertificate,
  setCompletedContent,
  markContentComplete,
  setActiveModule,
  setSelectedTopic,
  resetProgress,
  resetAll,
  resetQuizReports,
} = testSlice.actions;

export default testSlice.reducer;
export const selectAttempts = (state, quizId) =>
  state.test.quizReports[quizId]?.attempts || [];

export const selectMaxScore = (state, quizId) =>
  state.test.quizReports[quizId]?.maxScore || 0;

export const selectScore = (state, quizId) => state.test.score[quizId] || 0;

export const selectUserAnswers = (state, quizId) =>
  state.test.userAnswers[quizId] || {};

export const selectAttemptCount = (state, quizId) =>
  state.test.attemptCount[quizId] || 0;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";
export const getTestData = createAsyncThunk(
  "test/getTestData",
  async ({ userId, quizId, courseId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tests/test/get", {
        params: { userId, quizId, courseId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch test data");
    }
  }
);

export const saveTestData = createAsyncThunk(
  "test/saveTestData",
  async (payload, { rejectWithValue }) => {
    try {
      const { userId, quizId, score, userAnswers, attemptCount, quizReport } = payload;
      if (!userId || !quizId) return rejectWithValue("Missing userId or quizId");

      const res = await axiosInstance.post("/tests/save", {
        userId,
        quizId,
        score,
        userAnswers,
        attemptCount,
        report: quizReport,
      });

      return { quizId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to save test data");
    }
  }
);

// --- Initial State ---
const initialState = {
  userAnswers: {},
  score: {},
  attemptCount: {},
  certificates: [],
  completedContent: {},
  activeModule: null,
  selectedTopic: null,
  quizReports: {},
  progressPercentage: 0,
  isCompleted: false,
  loading: false,
  error: null,
};

// --- Slice ---
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setUserAnswers: (state, { payload: { quizId, answers } }) => {
      state.userAnswers[quizId] = answers;
    },
    setScore: (state, { payload: { quizId, score } }) => {
      state.score[quizId] = score;
    },
    addAttempt: (state, { payload }) => {
      const { quizId, score, userAnswers, quizName, totalQuestions } = payload;
      if (!state.quizReports[quizId]) {
        state.quizReports[quizId] = {
          quizName: quizName || "",
          totalQuestions: totalQuestions || 0,
          attempts: [],
          maxScore: 0,
          lastScore: 0,
          lastUserAnswers: {},
          correct: 0,
          incorrect: 0,
          percent: 0,
        };
      }

      const report = state.quizReports[quizId];
      const correct = score;
      const incorrect = totalQuestions - score;
      const percent = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

      report.attempts.push(score);
      if (report.attempts.length > 3) report.attempts = report.attempts.slice(-3);

      Object.assign(report, {
        maxScore: Math.max(report.maxScore, score),
        lastScore: score,
        lastUserAnswers: userAnswers || {},
        correct,
        incorrect,
        percent,
      });

      state.attemptCount[quizId] = report.attempts.length;
    },
    decrementAttempts: (state, { payload: { quizId } }) => {
      if (state.attemptCount[quizId]) {
        state.attemptCount[quizId] = Math.max(0, state.attemptCount[quizId] - 1);
      }
    },
    resetQuiz: (state, { payload: { quizId } }) => {
      delete state.userAnswers[quizId];
      delete state.score[quizId];
      delete state.attemptCount[quizId];
      delete state.quizReports[quizId];
    },
    addCertificate: (state, { payload }) => {
      state.certificates.push(payload);
    },
    setCompletedContent: (state, { payload }) => {
      state.completedContent = payload;
    },
    markContentComplete: (state, { payload }) => {
      state.completedContent[payload] = true;
    },
    setActiveModule: (state, { payload }) => {
      state.activeModule = payload;
    },
    setSelectedTopic: (state, { payload }) => {
      state.selectedTopic = payload;
    },
    setProgressPercentage: (state, { payload }) => {
      state.progressPercentage = payload;
    },
    setIsCompleted: (state, { payload }) => {
      state.isCompleted = payload;
    },
    resetProgress: (state) => {
      state.completedContent = {};
      state.activeModule = null;
      state.selectedTopic = null;
      state.progressPercentage = 0;
      state.isCompleted = false;
    },
    resetQuizReports: (state) => {
      state.quizReports = {};
      state.attemptCount = {};
    },
    resetAll: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestData.fulfilled, (state, { payload }) => {
        Object.assign(state, { ...initialState, ...payload, loading: false });

        for (const quizId in payload.quizReports || {}) {
          const r = payload.quizReports[quizId];
          state.quizReports[quizId] = {
            quizName: r.quizName || "",
            totalQuestions: r.totalQuestions || 0,
            attempts: (r.attempts || []).slice(0, 3),
            maxScore: r.maxScore || 0,
            lastScore: r.lastScore || 0,
            lastUserAnswers: r.lastUserAnswers || {},
            correct: r.correct || 0,
            incorrect: r.incorrect || 0,
            percent: r.percent || 0,
          };
          state.attemptCount[quizId] = r.attempts?.length || 0;
        }
      })
      .addCase(getTestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(saveTestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTestData.fulfilled, (state, { payload }) => {
        const { quizId, data } = payload;
        const report = data.quizReports?.[quizId];
        if (!report) return;

        const attempts = Array.isArray(report.attempts)
          ? report.attempts.slice(-3)
          : [];

        state.quizReports[quizId] = {
          quizName: report.quizName || "",
          totalQuestions: report.totalQuestions || 0,
          attempts,
          maxScore: report.maxScore || 0,
          lastScore: report.lastScore || 0,
          lastUserAnswers: report.lastUserAnswers || {},
          correct: report.correct || 0,
          incorrect: report.incorrect || 0,
          percent: report.percent || 0,
        };

        state.score[quizId] = report.lastScore || 0;
        state.userAnswers[quizId] = report.lastUserAnswers || {};
        state.attemptCount[quizId] = attempts.length;

        state.loading = false;
      })
      .addCase(saveTestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// --- Actions ---
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
  setProgressPercentage,
  setIsCompleted,
  resetProgress,
  resetQuizReports,
  resetAll,
} = testSlice.actions;

export default testSlice.reducer;

// --- Selectors ---
export const selectUserAnswers = (state, quizId) => state.test.userAnswers[quizId] || {};
export const selectScore = (state, quizId) => state.test.score[quizId] || 0;
export const selectAttemptCount = (state, quizId) => state.test.attemptCount[quizId] || 0;
export const selectMaxScore = (state, quizId) => state.test.quizReports[quizId]?.maxScore || 0;
export const selectAttempts = (state, quizId) => state.test.quizReports[quizId]?.attempts || [];
export const selectCorrect = (state, quizId) => state.test.quizReports[quizId]?.correct || 0;
export const selectIncorrect = (state, quizId) => state.test.quizReports[quizId]?.incorrect || 0;
export const selectPercent = (state, quizId) => state.test.quizReports[quizId]?.percent || 0;
export const selectProgressPercentage = (state) => state.test.progressPercentage;
export const selectIsCompleted = (state) => state.test.isCompleted;
export const selectCanAttemptQuiz = (state, quizId) => (state.test.quizReports[quizId]?.attempts || []).length < 3;

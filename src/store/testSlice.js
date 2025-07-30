import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// Async actions
export const getTestData = createAsyncThunk(
  "test/getTestData",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tests/get", {
        params: { userId, courseId },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch test data"
      );
    }
  }
);

export const saveTestData = createAsyncThunk(
  "test/saveTestData",
  async (
    { userId, courseId, quizId, score, userAnswers, attempts, quizReport },
    { rejectWithValue }
  ) => {
    try {
      if (!userId || !courseId || !quizId) {
        return rejectWithValue("Missing required fields");
      }

      const validatedReport = {
        quizName: quizReport?.quizName || "Unnamed Quiz",
        totalQuestions: quizReport?.totalQuestions || 0,
        attempts: Array.isArray(quizReport?.attempts) ? quizReport.attempts : [],
        maxScore: typeof quizReport?.maxScore === "number" ? quizReport.maxScore : 0,
        lastScore: typeof quizReport?.lastScore === "number" ? quizReport.lastScore : 0,
        lastUserAnswers: quizReport?.lastUserAnswers || {},
      };

      const payload = {
        userId,
        courseId,
        quizId,
        score: typeof score === "number" ? score : 0,
        userAnswers: userAnswers || {},
        attempts: typeof attempts === "number" ? attempts : 1,
        quizReport: validatedReport,
      };

      const response = await axiosInstance.post("/tests/save", payload);
      return { quizId, data: response.data.data }; // Return quizId for reducer targeting
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Failed to save test data");
    }
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
  progressPercentage: 0,
  isCompleted: false,
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
  const { quizId, score, userAnswers, quizName, totalQuestions } = action.payload;

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
  const percent = totalQuestions
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  report.attempts.push(score);
  report.maxScore = Math.max(report.maxScore, score);
  report.lastScore = score;
  report.lastUserAnswers = userAnswers || {};
  report.correct = correct;
  report.incorrect = incorrect;
  report.percent = percent;

  state.attemptCount[quizId] = (state.attemptCount[quizId] || 0) + 1;
},

    decrementAttempts: (state, action) => {
      const { quizId } = action.payload;
      if (state.attemptCount[quizId]) {
        state.attemptCount[quizId] = Math.max(0, state.attemptCount[quizId] - 1);
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
    setProgressPercentage: (state, action) => {
      state.progressPercentage = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
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
      state.progressPercentage = 0;
      state.isCompleted = false;
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
   .addCase(saveTestData.fulfilled, (state, action) => {
  state.loading = false;
  const { quizId, data } = action.payload;

  const report = data.quizReports?.[quizId];
  if (report) {
    state.quizReports[quizId] = {
      ...report,
      correct: report.correct || 0,
      incorrect: report.incorrect || 0,
      percent: report.percent || 0,
    };
    state.score[quizId] = report.lastScore || 0;
    state.userAnswers[quizId] = report.lastUserAnswers || {};
    state.attemptCount[quizId] = report.attempts?.length || 1;
  }
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
  setProgressPercentage,
  setIsCompleted,
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

export const selectProgressPercentage = (state) => state.test.progressPercentage;
export const selectIsCompleted = (state) => state.test.isCompleted;
export const selectCorrect = (state, quizId) =>
  state.test.quizReports[quizId]?.correct || 0;

export const selectIncorrect = (state, quizId) =>
  state.test.quizReports[quizId]?.incorrect || 0;

export const selectPercent = (state, quizId) =>
  state.test.quizReports[quizId]?.percent || 0;


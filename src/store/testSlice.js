import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

export const getTestData = createAsyncThunk(
  "test/getTestData",
  async ({ userId, quizId, courseId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tests/test/get", {
        params: { userId, quizId, courseId },
      });
      console.log("✅ getTestData response:", res.data); 
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching test data:", err);
      return rejectWithValue(err.response?.data?.error || "Failed to fetch test data");
    }
  }
);


export const saveTestData = createAsyncThunk(
  "test/saveTestData",
  async (payload, { rejectWithValue }) => {
    try {
      const {
        userId,
        quizId,
        score,
        userAnswers,
        attemptCount,
        quizReport, 
      } = payload;

      if (!userId || !quizId) {
        return rejectWithValue("Missing required userId or quizId");
      }

      const res = await axiosInstance.post("/tests/save", {
        userId,
        quizId,
        score,
        userAnswers,
        attemptCount,
        report: quizReport, 
      });

      return res.data;
    } catch (err) {
      console.error("❌ Error saving test data:", err);
      return rejectWithValue(err.response?.data?.error || "Failed to save test data");
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
  if (report.attempts.length > 3) {
    report.attempts = report.attempts.slice(-3);
  }

  report.maxScore = Math.max(report.maxScore, score);
  report.lastScore = score;
  report.lastUserAnswers = userAnswers || {};
  report.correct = correct;
  report.incorrect = incorrect;
  report.percent = percent;

  state.attemptCount[quizId] = report.attempts.length;
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
  const {
    userAnswers = {},
    score = {},
    attemptCount = {},
    quizReports = {},
    certificates = [],
    completedContent = {},
    activeModule = null,
    selectedTopic = null,
    progressPercentage = 0,
    isCompleted = false,
  } = action.payload;

  state.userAnswers = userAnswers;
  state.score = score;
  state.attemptCount = attemptCount;
  state.quizReports = {};
  for (const quizId in quizReports) {
    const report = quizReports[quizId];
    const attempts = Array.isArray(report.attempts)
      ? report.attempts.slice(0, 3) 
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

    state.attemptCount[quizId] = attempts.length;
  }

  state.certificates = certificates;
  state.completedContent = completedContent;
  state.activeModule = activeModule;
  state.selectedTopic = selectedTopic;
  state.progressPercentage = progressPercentage;
  state.isCompleted = isCompleted;
  state.loading = false;
  state.error = null;
})

      .addCase(getTestData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(saveTestData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(saveTestData.fulfilled, (state, action) => {
  const { quizId, data } = action.payload;
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

export const selectUserAnswers = (state, quizId) =>
  state.test.userAnswers[quizId] || {};

export const selectScore = (state, quizId) =>
  state.test.score[quizId] || 0;

export const selectAttemptCount = (state, quizId) =>
  state.test.attemptCount[quizId] || 0;

export const selectMaxScore = (state, quizId) =>
  state.test.quizReports[quizId]?.maxScore || 0;

export const selectAttempts = (state, quizId) =>
  state.test.quizReports[quizId]?.attempts || [];

export const selectCorrect = (state, quizId) =>
  state.test.quizReports[quizId]?.correct || 0;

export const selectIncorrect = (state, quizId) =>
  state.test.quizReports[quizId]?.incorrect || 0;

export const selectPercent = (state, quizId) =>
  state.test.quizReports[quizId]?.percent || 0;

export const selectProgressPercentage = (state) =>
  state.test.progressPercentage;

export const selectIsCompleted = (state) =>
  state.test.isCompleted;

  export const selectCanAttemptQuiz = (state, quizId) => {
  const attempts = state.test.quizReports[quizId]?.attempts || [];
  return attempts.length < 3;
};

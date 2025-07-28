import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";
export const fetchQuizAttempts = createAsyncThunk(
  "quiz/fetchAttempts",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/quizzes/quiz/${courseId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const saveQuizAttempt = createAsyncThunk(
  "quiz/saveAttempt",
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/quizzes/quiz/${courseId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchAllQuizAttempts = createAsyncThunk(
  "quiz/fetchAllAttempts",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/quizzes/all`, {
        params: { courseId },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const initialState = {
  myAttempts: null,
  allAttempts: [],
  status: "idle",
  error: null,
  successMessage: null,
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizState: (state) => {
      state.myAttempts = null;
      state.allAttempts = [];
      state.status = "idle";
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizAttempts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuizAttempts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myAttempts = action.payload;
      })
      .addCase(fetchQuizAttempts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveQuizAttempt.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(saveQuizAttempt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message || "Quiz attempt saved!";
      })
      .addCase(saveQuizAttempt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllQuizAttempts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllQuizAttempts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAttempts = action.payload;
      })
      .addCase(fetchAllQuizAttempts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetQuizState } = quizSlice.actions;
export default quizSlice.reducer;
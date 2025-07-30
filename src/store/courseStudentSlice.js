import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// ✅ Fetch all course students (admin)
export const fetchAllCourseStudents = createAsyncThunk(
  "courseStudent/fetchAll",
  async () => {
    const res = await axiosInstance.get("/courseStudent/all");
    return res.data;
  }
);

// ✅ Fetch enrolled courses for the current user
export const getPurchasedEnrolledCoursesByUser = createAsyncThunk(
  "courseStudent/getPurchasedEnrolledCoursesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/courseStudent/getCourseByUser");
      if (!res.data || !Array.isArray(res.data.enrolledCourses)) {
        throw new Error("Invalid course data structure");
      }
      return res.data.enrolledCourses;
    } catch (err) {
      console.error("❌ Enrolled Course Error:", err?.response?.data || err.message);
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch purchased enrolled courses");
    }
  }
);

// ✅ Fetch resume for a specific course
export const getCourseResume = createAsyncThunk(
  "courseStudent/getCourseResume",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/courseStudent/${courseId}`);
      return { courseId, resume: res.data.resume };
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        return {
          courseId,
          resume: {
            watchedHours: 0,
            completedContent: [],
            lastWatched: {},
            progressPercent: 0,
            moduleProgress: [],
            isCompleted: false
          }
        };
      }
      return rejectWithValue(err.response?.data?.message || "Failed to fetch resume");
    }
  }
);

// ✅ Update course resume
export const updateCourseResume = createAsyncThunk(
  "courseStudent/updateCourseResume",
  async ({ courseId, lastWatched, watchedHours, completedContent }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/courseStudent/${courseId}`, {
        lastWatched,
        watchedHours,
        completedContent
      });
      return { courseId, resume: res.data.resume };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update course resume.");
    }
  }
);

// ✅ Initial State
const initialState = {
  enrolledCourses: [],
  resumeData: {}, // courseId => resume
  status: "idle",
  error: null,
  message: null,
  pagination: {
    currentPage: 1,
    perPage: 10
  }
};

// ✅ Slice
const courseStudentSlice = createSlice({
  name: "courseStudent",
  initialState,
  reducers: {
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetCourseStudentState(state) {
      state.status = "idle";
      state.error = null;
      state.message = null;
      state.resumeData = {};
      state.enrolledCourses = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // ✅ Enrolled courses
      .addCase(getPurchasedEnrolledCoursesByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPurchasedEnrolledCoursesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrolledCourses = action.payload;
      })
      .addCase(getPurchasedEnrolledCoursesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Course resume fetch
      .addCase(getCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = resume;
      })
      .addCase(getCourseResume.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Course resume update
      .addCase(updateCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = resume;
        state.message = "Resume updated successfully";
      })
      .addCase(updateCourseResume.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

// ✅ Selectors
export const selectCourseStudentStatus = (state) => state.courseStudent.status;
export const selectCourseStudentError = (state) => state.courseStudent.error;
export const selectCourseStudentMessage = (state) => state.courseStudent.message;
export const selectCourseStudentPagination = (state) => state.courseStudent.pagination;
export const selectEnrolledCourses = (state) => state.courseStudent.enrolledCourses;
export const selectResumeData = (state) => state.courseStudent.resumeData;

// 🔎 Select course by ID
export const selectStudentCourseById = createSelector(
  [selectEnrolledCourses, (_, courseId) => courseId],
  (courses, courseId) => courses.find((c) => c.courseId === courseId) || null
);

// 📊 Select resume by course ID
export const selectResumeByCourseId = createSelector(
  [selectResumeData, (_, courseId) => courseId],
  (resumeData, courseId) => resumeData[courseId] || null
);

// 📈 Progress percent by courseId (from resume)
export const selectProgressPercentByCourseId = createSelector(
  [selectResumeByCourseId],
  (resume) => {
    return resume?.progressPercent || 0;
  }
);

// ⏱ Watched hours by courseId (from resume)
export const selectWatchedHoursByCourseId = createSelector(
  [selectResumeByCourseId],
  (resume) => {
    return resume?.watchedHours || 0;
  }
);

// 📚 Paginated enrolled courses
export const selectPaginatedEnrolledCourses = createSelector(
  [selectEnrolledCourses, selectCourseStudentPagination],
  (courses, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.perPage;
    return courses.slice(start, start + pagination.perPage);
  }
);

// ✅ Export actions and reducer
export const { setPagination, resetCourseStudentState } = courseStudentSlice.actions;
export default courseStudentSlice.reducer;
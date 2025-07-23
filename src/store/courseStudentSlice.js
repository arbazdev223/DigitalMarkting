import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// ✅ Fetch All Course Students (admin purpose maybe)
export const fetchAllCourseStudents = createAsyncThunk(
  "courseStudent/fetchAll",
  async () => {
    const res = await axiosInstance.get("/courseStudent/all");
    return res.data;
  }
);

// ✅ Fetch enrolled courses for current user
export const getPurchasedEnrolledCoursesByUser = createAsyncThunk(
  "courseStudent/getPurchasedEnrolledCoursesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/courseStudent/getCourseByUser");
      // validate structure
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

// ✅ Fetch resume data for a specific course
export const getCourseResume = createAsyncThunk(
  "courseStudent/getCourseResume",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/courseStudent/${courseId}`); 
      return { courseId, resume: res.data.resume };
    } catch (err) {
      console.error("❌ Resume Fetch Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch resume");
    }
  }
);

// ✅ Update course resume
export const updateCourseResume = createAsyncThunk(
  "courseResume/update",
  async ({ courseId, lastWatched, watchedHours, completedContent }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/courseStudent/${courseId}`, {
        lastWatched,
        watchedHours,
        completedContent,
      });
      return data.resume;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update course resume.");
    }
  }
);


// ✅ Initial State
const initialState = {
  enrolledCourses: [],
  resumeData: {}, 
  status: "idle",
  error: null,
  message: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
  },
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
    },
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

      // ✅ Get resume
      .addCase(getCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = resume;
      })
      .addCase(getCourseResume.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Update resume
      .addCase(updateCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = resume;
        state.message = "Resume updated successfully";
      })
      .addCase(updateCourseResume.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// ✅ Selectors
export const selectCourseStudentStatus = (state) => state.courseStudent.status;
export const selectCourseStudentError = (state) => state.courseStudent.error;
export const selectCourseStudentMessage = (state) => state.courseStudent.message;
export const selectCourseStudentPagination = (state) => state.courseStudent.pagination;
export const selectEnrolledCourses = (state) => state.courseStudent.enrolledCourses;
export const selectResumeData = (state) => state.courseStudent.resumeData;

// 🔎 Select by ID
export const selectStudentCourseById = createSelector(
  [selectEnrolledCourses, (_, courseId) => courseId],
  (courses, courseId) => courses.find((c) => c.courseId === courseId) || null
);

// 📊 Select progress percent
export const selectStudentCourseProgressPercent = createSelector(
  [selectStudentCourseById, selectResumeData, (_, courseId) => courseId],
  (course, resumeData, courseId) => {
    const resume = resumeData[courseId];
    const watched = resume?.watchedHours ?? course?.watchedHours ?? 0;
    const total = course?.totalHours ?? 0;
    const percent = total > 0 ? (watched / total) * 100 : 0;
    return Math.round(Math.min(percent, 100));
  }
);

// 📚 Paginated
export const selectPaginatedEnrolledCourses = createSelector(
  [selectEnrolledCourses, selectCourseStudentPagination],
  (courses, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.perPage;
    return courses.slice(start, start + pagination.perPage);
  }
);

// ✅ Export
export const { setPagination, resetCourseStudentState } = courseStudentSlice.actions;
export default courseStudentSlice.reducer;

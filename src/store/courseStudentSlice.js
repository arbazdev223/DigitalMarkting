import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// ✅ Fetch All Course Students (admin use)
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
      console.error("❌ Resume Fetch Error:", err?.response?.data || err.message);
      return rejectWithValue(err?.response?.data?.message || "Failed to fetch resume");
    }
  }
);

// ✅ Update course resume
export const updateCourseResume = createAsyncThunk(
  "courseStudent/updateCourseResume",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/courseStudent/resume`, payload);
      return { courseId: payload.courseId, resume: res.data.resume };
    } catch (err) {
      console.error("❌ Resume Update Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Failed to update resume");
    }
  }
);

// ✅ Initial State
const initialState = {
  enrolledCourses: [],
  resumeData: {}, // key: courseId
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

      // ✅ Resume fetch
      .addCase(getCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = resume;
      })
      .addCase(getCourseResume.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Resume update
      .addCase(updateCourseResume.fulfilled, (state, action) => {
        const { courseId, resume } = action.payload;
        state.resumeData[courseId] = { ...(state.resumeData[courseId] || {}), ...resume };
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

// 🔎 Select by Course ID
export const selectStudentCourseById = createSelector(
  [selectEnrolledCourses, (_, courseId) => courseId],
  (courses, courseId) => courses.find((c) => c.courseId === courseId) || null
);

// 📄 Select resume by Course ID
export const selectResumeByCourseId = createSelector(
  [selectResumeData, (_, courseId) => courseId],
  (resumeData, courseId) => resumeData[courseId] || {}
);

// ⏱️ Watched Hours
export const selectWatchedHours = createSelector(
  [selectResumeByCourseId],
  (resume) => resume.watchedHours ?? 0
);

// 📊 Progress Percent
export const selectProgressPercent = createSelector(
  [selectResumeByCourseId],
  (resume) => resume.progressPercent ?? 0
);

// ✅ Is Course Completed
export const selectCourseIsCompleted = createSelector(
  [selectResumeByCourseId],
  (resume) => resume.isCompleted ?? false
);

// 🧩 Module Progress Array
export const selectModuleProgress = createSelector(
  [selectResumeByCourseId],
  (resume) => resume.moduleProgress ?? []
);

// 📦 Combine static course data + dynamic resume progress
export const selectCourseWithProgress = createSelector(
  [selectStudentCourseById, selectResumeByCourseId],
  (course, resume) => {
    if (!course) return null;
    return {
      ...course,
      progressPercent: resume.progressPercent ?? 0,
      watchedHours: resume.watchedHours ?? 0,
      isCompleted: resume.isCompleted ?? false,
      moduleProgress: resume.moduleProgress ?? [],
    };
  }
);

// 🧾 Paginated Enrolled Courses
export const selectPaginatedEnrolledCourses = createSelector(
  [selectEnrolledCourses, selectCourseStudentPagination],
  (courses, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.perPage;
    return courses.slice(start, start + pagination.perPage);
  }
);

// ✅ Exports
export const { setPagination, resetCourseStudentState } = courseStudentSlice.actions;
export default courseStudentSlice.reducer;



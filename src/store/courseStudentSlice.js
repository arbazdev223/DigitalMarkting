import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";
export const fetchAllCourseStudents = createAsyncThunk(
  "courseStudent/fetchAll",
  async (params = {}) => {
    const res = await axiosInstance.get("/courseStudent/getCourseDetails", { params });
    return res.data;
  }
);

export const createCourseStudent = createAsyncThunk(
  "courseStudent/create",
  async (payload) => {
    const res = await axiosInstance.post("/courseStudent/create", payload);
    return res.data;
  }
);

export const updateCourseStudent = createAsyncThunk(
  "courseStudent/update",
  async ({ id, enrolledCourses }) => {
    const res = await axiosInstance.put(`/courseStudent/${id}`, { enrolledCourses });
    return res.data;
  }
);

export const deleteCourseStudent = createAsyncThunk(
  "courseStudent/delete",
  async (id) => {
    await axiosInstance.delete(`/courseStudent/${id}`);
    return id;
  }
);

export const updateProgress = createAsyncThunk(
  "courseStudent/updateProgress",
  async ({ id, courseId, watchedHours }) => {
    const res = await axiosInstance.patch(`/courseStudent/${id}/progress`, {
      courseId,
      watchedHours
    });
    return { id, courseId, updated: res.data };
  }
);

export const getCourseDetails = createAsyncThunk(
  "courseStudent/getCourseDetails",
  async ({ id, courseId }) => {
    const res = await axiosInstance.get(`/courseStudent/${id}/courses/${courseId}`);
    return res.data;
  }
);

const initialState = {
  students: [],
  selectedCourse: null,
  status: "idle",
  error: null,
  message: null,
  pagination: {
    currentPage: 1,
    perPage: 10
  },
  filters: {
    courseId: null,
    progressStatus: "all"
  }
};

const courseStudentSlice = createSlice({
  name: "courseStudent",
  initialState,
  reducers: {
    resetCourseStudentState(state) {
      state.error = null;
      state.message = null;
      state.selectedCourse = null;
    },
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setCourseStudentFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourseStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllCourseStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchAllCourseStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCourseStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.message = "Course enrolled successfully.";
      })
      .addCase(createCourseStudent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateCourseStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
        state.message = "Course student updated.";
      })
      .addCase(updateCourseStudent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCourseStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s._id !== action.payload);
        state.message = "Course student deleted.";
      })
      .addCase(deleteCourseStudent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateProgress.fulfilled, (state) => {
        state.message = "Progress updated.";
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});
export const selectCourseStudents = (state) => state.courseStudent.students;
export const selectCourseStudentStatus = (state) => state.courseStudent.status;
export const selectCourseStudentError = (state) => state.courseStudent.error;
export const selectCourseStudentMessage = (state) => state.courseStudent.message;
export const selectCourseStudentSelected = (state) => state.courseStudent.selectedCourse;
export const selectCourseStudentPagination = (state) => state.courseStudent.pagination;
export const selectCourseStudentFilters = (state) => state.courseStudent.filters;
export const selectFilteredPaginatedStudents = createSelector(
  [selectCourseStudents, selectCourseStudentFilters, selectCourseStudentPagination],
  (students, filters, pagination) => {
    let filtered = [...students];

    if (filters.courseId) {
      filtered = filtered.filter((s) =>
        s.enrolledCourses.some((c) => c.courseId === filters.courseId)
      );
    }

    if (filters.progressStatus === "completed") {
      filtered = filtered.filter((s) =>
        s.enrolledCourses.some((c) => c.isCompleted === true)
      );
    } else if (filters.progressStatus === "incomplete") {
      filtered = filtered.filter((s) =>
        s.enrolledCourses.some((c) => c.isCompleted === false)
      );
    }

    const start = (pagination.currentPage - 1) * pagination.perPage;
    return filtered.slice(start, start + pagination.perPage);
  }
);

export const selectStudentCourseById = createSelector(
  [selectCourseStudents, (_, courseId) => courseId],
  (students, courseId) => {
    for (const student of students) {
      const found = student.enrolledCourses.find((c) => c.courseId === courseId);
      if (found) return found;
    }
    return null;
  }
);

export const {
  resetCourseStudentState,
  setPagination,
  setCourseStudentFilters
} = courseStudentSlice.actions;

export default courseStudentSlice.reducer;

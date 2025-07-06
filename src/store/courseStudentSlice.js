import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";
export const fetchAllCourseStudents = createAsyncThunk(
  "courseStudent/fetchAll",
  async () => {
    const res = await axiosInstance.get("/courseStudent/all");
    return res.data;
  }
);

export const getPurchasedEnrolledCoursesByUser = createAsyncThunk(
  "courseStudent/getPurchasedEnrolledCoursesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/courseStudent/getCourseByUser");
      return res.data.enrolledCourses;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch purchased enrolled courses");
    }
  }
);

export const getUserEnrolledCourses = createAsyncThunk(
  "courseStudent/getUserCourses",
  async (courseId = null, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/courseStudent${courseId ? `?courseId=${courseId}` : ""}`);
      return courseId ? { selected: res.data } : { enrolled: res.data.enrolledCourses };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch course(s)");
    }
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

export const updateProgress = createAsyncThunk(
  "courseStudent/updateProgress",
  async ({ id, courseId, watchedHours }) => {
    const res = await axiosInstance.patch(`/courseStudent/${id}/progress`, {
      courseId,
      watchedHours,
    });
    return { id, courseId, updated: res.data };
  }
);

export const deleteCourseStudent = createAsyncThunk(
  "courseStudent/delete",
  async (id) => {
    await axiosInstance.delete(`/courseStudent/${id}`);
    return id;
  }
);
const initialState = {
  students: [],
  enrolledCourses: [],
  selectedCourse: null,
  status: "idle",
  error: null,
  message: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
  },
  filters: {
    courseId: null,
    progressStatus: "all",
  },
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourseStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCourseStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchAllCourseStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getPurchasedEnrolledCoursesByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPurchasedEnrolledCoursesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrolledCourses = action.payload;
      })
      .addCase(getPurchasedEnrolledCoursesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getUserEnrolledCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserEnrolledCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.enrolled) {
          state.enrolledCourses = action.payload.enrolled;
        } else if (action.payload.selected) {
          state.selectedCourse = action.payload.selected;
        }
      })
      .addCase(getUserEnrolledCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createCourseStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.message = "Course enrolled successfully.";
      })
      .addCase(updateCourseStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.students[index] = action.payload;
        state.message = "Course student updated.";
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        const { id, courseId, updated } = action.payload;
        const student = state.students.find((s) => s._id === id);
        if (student) {
          const course = student.enrolledCourses.find((c) => c.courseId === courseId);
          if (course) Object.assign(course, updated);
        }
        state.message = "Progress updated.";
      })
      .addCase(deleteCourseStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s._id !== action.payload);
        state.message = "Deleted successfully.";
      });
  },
});
export const selectCourseStudents = (state) => state.courseStudent.students;
export const selectEnrolledCourses = (state) => state.courseStudent.enrolledCourses;
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
  [selectEnrolledCourses, (_, courseId) => courseId],
  (courses, courseId) => courses.find((c) => c.courseId === courseId) || null
);

export const selectStudentCourseProgressPercent = createSelector(
  [selectStudentCourseById],
  (course) => {
    if (!course?.modules) return 0;
    const totalContents = course.modules.reduce(
      (sum, m) => sum + m.topics.reduce((ts, t) => ts + (t.contents?.length || 0), 0),
      0
    );
    const completedContents = course.modules.reduce(
      (sum, m) =>
        sum +
        m.topics.reduce(
          (ts, t) =>
            ts +
            t.contents.reduce((cs, c) => (c.completed ? cs + 1 : cs), 0),
          0
        ),
      0
    );
    return totalContents ? Math.round((completedContents / totalContents) * 100) : 0;
  }
);
export const selectStudentCourseAssignmentsCount = createSelector(
  [selectStudentCourseById],
  (course) =>
    course?.modules?.reduce(
      (sum, m) =>
        sum +
        m.topics.reduce(
          (ts, t) => ts + t.contents.filter((c) => ["pdf", "image"].includes(c.type)).length,
          0
        ),
      0
    ) || 0
);
export const selectStudentCourseTestQuestionsCount = createSelector(
  [selectStudentCourseById],
  (course) =>
    course?.modules?.reduce(
      (sum, m) =>
        sum +
        m.topics.reduce(
          (ts, t) =>
            ts +
            t.contents.reduce(
              (cs, c) => cs + (c.type === "test" ? (c.questions?.length || 0) : 0),
              0
            ),
          0
        ),
      0
    ) + (course?.finalTest?.questions?.length || 0)
);
export const selectStudentCourseTestsCount = createSelector(
  [selectStudentCourseById],
  (course) =>
    course?.modules?.reduce(
      (sum, m) =>
        sum +
        m.topics.reduce((ts, t) => ts + t.contents.filter((c) => c.type === "test").length, 0),
      0
    ) + (course?.finalTest ? 1 : 0)
);
export const getProgressColor = (percent) => {
  if (percent < 60) return "text-red-500 border-red-500";
  if (percent < 85) return "text-yellow-400 border-yellow-400";
  return "text-green-400 border-green-400";
};
export const {
  resetCourseStudentState,
  setPagination,
  setCourseStudentFilters,
} = courseStudentSlice.actions;

export default courseStudentSlice.reducer;

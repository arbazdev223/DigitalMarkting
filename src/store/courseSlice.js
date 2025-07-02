import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

export const fetchCourses = createAsyncThunk(
  "course/fetchCourses",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/courses/courseAll", { params });
      return res.data.courses;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch courses");
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "course/fetchCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/courses/${id}`);
      return res.data.course;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch course");
    }
  }
);

const initialState = {
  courses: [],
  selectedCourse: null,
  status: "idle",
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetSelectedCourse(state) {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.selectedCourse = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selectedCourse = null;
      });
  },
});

export default courseSlice.reducer;

// Selectors
export const selectCourses = (state) => state.course.courses;
export const selectSelectedCourse = (state) => state.course.selectedCourse;
export const selectCourseStatus = (state) => state.course.status;
export const selectCourseError = (state) => state.course.error;

export const selectTotalHours = createSelector([selectCourses], (courses) =>
  courses.reduce((sum, course) => sum + (course.totalHours || 0), 0)
);

export const selectTotalModules = createSelector([selectCourses], (courses) =>
  courses.reduce((sum, course) => sum + (course.modules?.length || 0), 0)
);

export const selectTotalLessons = createSelector([selectCourses], (courses) =>
  courses.reduce(
    (sum, course) =>
      sum +
      (Array.isArray(course.modules)
        ? course.modules.reduce(
            (mSum, mod) =>
              mSum + (Array.isArray(mod.lessons) ? mod.lessons.length : 0),
            0
          )
        : 0),
    0
  )
);

export const selectLevels = createSelector([selectCourses], (courses) =>
  Array.from(new Set(courses.map((course) => course.level)))
);

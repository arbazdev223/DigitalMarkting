import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { courseData } from "../../data";

const initialState = {
  courses: courseData,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
});

export default courseSlice.reducer;

export const selectCourses = (state) => state.course.courses;

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

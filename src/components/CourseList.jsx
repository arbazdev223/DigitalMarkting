import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPurchasedEnrolledCoursesByUser,
  getCourseResume,
  setPagination,
  resetCourseStudentState,
  selectCourseStudentStatus,
  selectCourseStudentError,
  selectCourseStudentPagination,
  selectEnrolledCourses,
  selectResumeByCourseId,
  selectProgressPercent,
} from "../store/courseStudentSlice";
import Pagination from "./Pagination";

// ✅ Half Circle Progress
const HalfCircleProgress = ({ percent }) => {
  const radius = 30;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg width="70" height="40" viewBox="0 0 70 40">
      <path d="M 5 35 A 30 30 0 0 1 65 35" fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <path
        d="M 5 35 A 30 30 0 0 1 65 35"
        fill="none"
        stroke="#22c55e"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text x="35" y="28" textAnchor="middle" fontSize="14" fill="#22c55e" fontWeight="bold">
        {Math.round(percent)}%
      </text>
    </svg>
  );
};

// ✅ CourseCard
const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const { courseId, title, image, duration, level, tags, totalHours } = course;

  const resume = useSelector((state) => selectResumeByCourseId(state, courseId));
  const percent = useSelector((state) => selectProgressPercent(state, courseId));

// useEffect(() => {
//   if (courseId && (!resume || !resume.watchedHours)) {
//     dispatch(getCourseResume(courseId));
//   }
// }, [dispatch, courseId, resume]);

  const watchedHours = resume?.watchedHours ?? 0;
  return (
    <Link
      to={`/courseStudent/${courseId}`}
      className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img src={image} alt={title} className="w-24 h-16 object-cover rounded" />
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">
              {duration || `${totalHours}h`} • {level} • {tags?.join(", ")}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Watched: {watchedHours}h / {totalHours}h
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-2">
          <HalfCircleProgress percent={percent} />
          {percent > 0 ? (
            <span className="text-green-600 font-semibold text-sm">Resume Learning →</span>
          ) : (
            <span className="bg-primary text-white px-4 py-1 rounded text-sm">Get Started</span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ✅ CourseList
const CourseList = () => {
  const dispatch = useDispatch();
  const fetched = useRef(false);

  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const status = useSelector(selectCourseStudentStatus);
  const error = useSelector(selectCourseStudentError);
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const pagination = useSelector(selectCourseStudentPagination);

  const itemsPerPage = pagination.perPage;
  const currentPage = pagination.currentPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = enrolledCourses.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Load courses
  useEffect(() => {
    if (token && isLoggedIn && !fetched.current) {
      dispatch(getPurchasedEnrolledCoursesByUser());
      fetched.current = true;
    } else if (!isLoggedIn) {
      dispatch(resetCourseStudentState());
      fetched.current = false;
    }
  }, [dispatch, token, isLoggedIn]);

  // ✅ Loading
  if (status === "loading") {
    return <p className="text-gray-600 text-center mt-10">Loading courses...</p>;
  }

  // ✅ Error
  if (error) {
    if (error.toLowerCase().includes("student not found")) {
      return (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-xl font-semibold mb-2">Student Profile Not Found</p>
          <p className="text-sm text-gray-500">
            Please contact admin or enroll in a course to create your profile.
          </p>
          <Link to="/services" className="mt-4 inline-block text-blue-600 underline">
            Browse Courses
          </Link>
        </div>
      );
    }

    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  // ✅ No Courses
  if (!enrolledCourses.length && status === "succeeded") {
    return (
      <div className="text-center text-gray-600 mt-10">
        <p className="text-xl font-semibold mb-2">No Courses Purchased</p>
        <p className="text-sm text-gray-500">You haven't enrolled in any course yet.</p>
        <Link to="/services" className="mt-4 inline-block text-blue-600 underline">
          Browse Courses
        </Link>
      </div>
    );
  }

  // ✅ Render Course List
  return (
    <div className="flex-1 flex flex-col gap-4">
      {paginatedCourses.map((course) => (
        <CourseCard key={course.courseId} course={course} />
      ))}

      {enrolledCourses.length > itemsPerPage && (
        <Pagination
          totalItems={enrolledCourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(setPagination({ currentPage: page }))}
        />
      )}
    </div>
  );
};

export default CourseList;

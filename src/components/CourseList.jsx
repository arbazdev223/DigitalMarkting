import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

import {
  fetchAllCourseStudents,
  selectCourseStudentError,
  selectCourseStudentPagination,
  selectCourseStudentStatus,
  selectFilteredPaginatedStudents,
  setPagination
} from "../store/courseStudentSlice";

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

const CourseList = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectFilteredPaginatedStudents);
  const status = useSelector(selectCourseStudentStatus);
  const error = useSelector(selectCourseStudentError);
  const pagination = useSelector(selectCourseStudentPagination);
  const itemsPerPage = pagination.perPage;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCourseStudents());
    }
  }, [dispatch, status]);

  const handlePageChange = (page) => {
    dispatch(setPagination({ currentPage: page }));
  };

  if (status === "loading") return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Flatten enrolledCourses and remove duplicates by courseId
  const enrolledCourses = [];
  const seen = new Set();
  students.forEach((student) => {
    student.enrolledCourses.forEach((course) => {
      if (!seen.has(course.courseId)) {
        seen.add(course.courseId);
        enrolledCourses.push(course);
      }
    });
  });

  if (!enrolledCourses.length) return <p>No enrolled courses found.</p>;

  return (
    <div className="flex-1 flex flex-col gap-4">
      {enrolledCourses.map((course) => {
        const percent =
          course.totalHours && course.watchedHours
            ? (course.watchedHours / course.totalHours) * 100
            : 0;

        return (
          <Link
            to={`/courseStudent/${course.courseId}`}
            key={course.courseId}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600">
                    {course.duration} • {course.level} • {course.tags.join(", ")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Watched: {course.watchedHours}h / {course.totalHours}h
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-2">
                <HalfCircleProgress percent={percent} />
                {course.watchedHours && course.watchedHours > 0 ? (
                  <span className="text-green-600 font-semibold text-sm">Resume Learning →</span>
                ) : (
                  <span className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
                    Get Started
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}

      {enrolledCourses.length > itemsPerPage && (
        <Pagination
          totalItems={enrolledCourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CourseList;

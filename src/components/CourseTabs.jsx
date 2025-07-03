import React, { useState, useEffect } from "react";
import { MdDownload } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import {
  fetchCourses,
  selectCourses,
  selectCourseStatus,
} from "../store/courseSlice";
import FormControl from "../components/FormControl";

const CourseTabs = ({
  heading = (
    <>
      Choose the Course that{" "}
      <span className="text-[#0e3477]">Interests you the Most</span>
    </>
  ),
  paragraph = `Choose the right path tailored to your learning journey or team needs. Whether you're a student or a business, our programs are crafted to boost your growth with practical skills.`,
  maxCount = 3,
  label = "",
  to = "",
}) => {
  const [userType, setUserType] = useState("Student");
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const courses = useSelector(selectCourses);
  const status = useSelector(selectCourseStatus);
  const [visibleCount, setVisibleCount] = useState(3);
  const [popupForm, setPopupForm] = useState({ open: false, course: null });
  const [enquirePopup, setEnquirePopup] = useState(false);

  const initialCount = label?.toLowerCase().includes("enroll now")
    ? 3
    : location.pathname === "/services"
    ? 6
    : maxCount;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }
    setVisibleCount(initialCount);
  }, [dispatch, status]);

  const filteredCourses = courses
    .filter((course) => course.type === userType)
    .sort((a, b) => (b.index || 0) - (a.index || 0));

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleBrochureClick = (course) => {
    if (!user) {
      setPopupForm({ open: true, course });
    } else {
      window.open(course.downloadBrochure, "_blank");
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold text-center mb-4 text-[#333] transition duration-300 transform hover:text-[#0e3477]">
          {heading}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-[15px] mb-8 max-w-3xl mx-auto px-2 sm:px-4 lg:px-0">
          {paragraph}
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6 gap-4">
          {["Student", "Business"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setUserType(type);
                setVisibleCount(initialCount);
              }}
              className={`px-5 py-2 text-sm font-semibold border transition ${
                userType === type
                  ? "bg-[#0e3477] text-white"
                  : "bg-white text-[#0e3477] border-[#0e3477]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-2">
          {visibleCourses.length > 0 ? (
            visibleCourses.map((course, idx) =>
              userType === "Business" ? (
                <div
                  key={idx}
                  className="block bg-white border shadow-md rounded overflow-hidden transform transition duration-300 hover:-translate-y-2.5 hover:shadow-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center text-[#0e3477] mb-2">
                      {course.title}
                    </h3>
                    <hr className="border-t border-gray-300 mb-3" />
                    <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                      {course.includes.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      {course.downloadBrochure && (
                        <button
                          onClick={() => handleBrochureClick(course)}
                          className="w-1/2 min-w-[140px] max-w-[180px] flex items-center justify-center bg-gray-100 text-[#0e3477] px-2 py-2 text-xs font-semibold rounded border border-[#0e3477] hover:bg-[#0e3477] hover:text-white transition"
                        >
                          <MdDownload className="mr-1 text-base" />
                          <span className="truncate">Download Brochure</span>
                        </button>
                      )}
                      <button
                        onClick={() => setEnquirePopup(true)}
                        className="w-1/2 min-w-[140px] max-w-[180px] text-center bg-[#0e3477] text-white px-2 py-2 text-xs font-semibold rounded flex items-center justify-center"
                      >
                        <span className="truncate">Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/course/${course.id}`}
                  key={idx}
                  className="block bg-white border shadow-md rounded overflow-hidden transform transition duration-300 hover:-translate-y-2.5 hover:shadow-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center text-[#0e3477] mb-2">
                      {course.title}
                    </h3>
                    <hr className="border-t border-gray-300 mb-3" />
                    <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                      {course.includes.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      <span className="w-1/2 min-w-[100px] max-w-[140px] text-center bg-[#0e3477] text-white px-2 py-2 text-xs font-semibold rounded flex items-center justify-center">
                        <span className="truncate">View</span>
                      </span>
                      <div className="w-1/2 min-w-[100px] max-w-[140px] flex items-center justify-center bg-gray-100 text-[#0e3477] px-2 py-2 text-xs font-semibold rounded border border-[#0e3477] hover:bg-[#0e3477] hover:text-white transition">
                        <span className="text-xs font-bold font-[Open_Sans]">
                          ₹{course.salePrice}
                        </span>
                        {course.price && (
                          <span className="line-through text-xs ml-1">
                            ₹{course.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No courses found.
            </p>
          )}
        </div>
      </div>
      {label && visibleCount < filteredCourses.length && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            type="button"
            className="inline-block bg-[#0e3477] text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#092653] transition"
          >
            {label}
          </button>
        </div>
      )}
      {popupForm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-xl bg-[#0e3477] text-white">
            <div className="p-6 sm:p-8 text-center">
              <button
                onClick={() => setPopupForm({ open: false, course: null })}
                className="absolute top-3 right-3 text-white hover:text-red-200 text-lg font-bold"
              >
                ✕
              </button>

              {popupForm.course?.title && (
                <p className="text-sm mb-4">
                  For:{" "}
                  <span className="font-semibold">
                    {popupForm.course.title}
                  </span>
                </p>
              )}

              <div className="space-y-3 text-left">
                <FormControl
                  className="bg-white"
                  prefilledName={user?.name}
                  prefilledEmail={user?.email}
                  courseTitle={popupForm.course?.title}
                  onSuccess={() => {
                    setPopupForm({ open: false, course: null });
                    window.open(popupForm.course?.downloadBrochure, "_blank");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {enquirePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-xl bg-[#0e3477] text-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-[#092653]">
              <h3 className="text-lg font-bold">
                {(popupForm?.course && popupForm.course.title) || "Enquire Now"}
              </h3>
              <button
                onClick={() => setEnquirePopup(false)}
                className="text-white hover:text-red-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
                <a
                  href="tel:+918800505151"
                  className="flex items-center justify-center gap-2 bg-white text-[#0e3477] px-4 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition w-full sm:w-auto"
                >
                  <FiPhoneCall className="text-base" />
                  +91-8800505151
                </a>
                <a
                  href="mailto:info@didm.in"
                  className="flex items-center justify-center gap-2 bg-white text-[#0e3477] px-4 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition w-full sm:w-auto"
                >
                  <MdEmail className="text-base" />
                  info@didm.in
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTabs;

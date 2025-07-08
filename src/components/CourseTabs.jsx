import React, { useState, useEffect } from "react";
import { MdDownload } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiPhoneCall } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import {
  fetchCourses,
  selectCourses,
  selectCourseStatus,
} from "../store/courseSlice";
import { submitForm, clearFormError } from "../store/formSlice";
import FormControl from "../components/FormControl";

const CourseTabs = ({
  heading = (
    <>
      Choose the Course that <span className="text-primary">Interests you the Most</span>
    </>
  ),
  paragraph = `Choose the right path tailored to your learning journey or team needs. Whether you're a student or a business, our programs are crafted to boost your growth with practical skills.`,
  maxCount = 3,
  label = "",
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const courses = useSelector(selectCourses);
  const status = useSelector(selectCourseStatus);
  const formSubmitStatus = useSelector((state) => state.form.formSubmitStatus);
  const formSubmitError = useSelector((state) => state.form.formSubmitError);
  const [userType, setUserType] = useState("Student");
  const [visibleCount, setVisibleCount] = useState(3);
  const [popupForm, setPopupForm] = useState({ open: false, course: null });
  const [enquirePopup, setEnquirePopup] = useState({ open: false, course: null });

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
    dispatch(clearFormError());
    if (!user) {
      setPopupForm({ open: true, course });
    } else {
      window.open(course.downloadBrochure, "_blank");
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[36px] font-bold mb-4 text-[#333] hover:text-primary transition">{heading}</h2>
        <p className="text-gray-600 text-sm sm:text-[15px] mb-8 max-w-3xl mx-auto">{paragraph}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6 gap-4">
          {["Student", "Business"].map((type) => (
            <button
              key={type}
              onClick={() => {
                dispatch(clearFormError());
                setUserType(type);
                setVisibleCount(initialCount);
              }}
              className={`px-5 py-2 text-sm font-semibold border ${
                userType === type
                  ? "bg-primary text-white"
                  : "bg-white text-primary border-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleCourses.length > 0 ? (
            visibleCourses.map((course, idx) =>
              userType === "Business" ? (
                <div
                  key={idx}
                  className="bg-white border shadow-md rounded transform hover:-translate-y-2.5 hover:shadow-xl transition"
                >
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center text-primary mb-2">{course.title}</h3>
                    <hr className="mb-3" />
                    <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                      {course.includes.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                    <div className="flex gap-3">
                      {course.downloadBrochure && (
                        <button
                          onClick={() => handleBrochureClick(course)}
                          className="flex-1 min-w-[140px] max-w-[180px] flex items-center justify-center bg-gray-100 text-primary px-2 py-2 text-xs font-semibold rounded border border-primary hover:bg-primary hover:text-white"
                        >
                          <MdDownload className="mr-1" /> <span>Download Brochure</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          dispatch(clearFormError());
                          setEnquirePopup({ open: true, course });
                        }}
                        className="flex-1 min-w-[140px] max-w-[180px] bg-primary text-white px-2 py-2 text-xs font-semibold rounded"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                    to={`/course/${course.courseId}`} 
  key={course.courseId}
                  className="bg-white border shadow-md rounded transform hover:-translate-y-2.5 hover:shadow-xl transition"
                >
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center text-primary mb-2">{course.title}</h3>
                    <hr className="mb-3" />
                    <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                      {course.includes.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                    <div className="flex gap-3">
                      <span className="flex-1 text-center bg-primary text-white px-2 py-2 text-xs font-semibold rounded">View</span>
                      <div className="flex-1 flex items-center justify-center bg-gray-100 text-primary px-2 py-2 text-xs font-semibold rounded border border-primary hover:bg-primary hover:text-white">
                        <span>₹{course.salePrice}</span>
                        {course.price && <span className="line-through ml-1">₹{course.price}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )
          ) : (
            <p className="col-span-full text-center text-gray-500">No courses found.</p>
          )}
        </div>

        {label && visibleCount < filteredCourses.length && (
          <div className="mt-10 text-center">
            <button onClick={handleLoadMore} className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#092653]">
              {label}
            </button>
          </div>
        )}
      </div>

      {popupForm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-primary text-white relative w-full max-w-md rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 sm:p-8 text-center">
              <button onClick={() => { dispatch(clearFormError()); setPopupForm({ open: false, course: null }); }} className="absolute top-3 right-3 text-lg font-bold hover:text-red-200">✕</button>
              {popupForm.course?.title && <p className="text-sm mb-4">For: <span className="font-semibold">{popupForm.course.title}</span></p>}
              <FormControl
                prefilledName={user?.name}
                prefilledEmail={user?.email}
                formHeading="Services"
                courseTitle={popupForm.course?.title}
                onSuccess={async (formData) => {
                  try {
                    await dispatch(submitForm(formData)).unwrap();
                    setPopupForm({ open: false, course: null });
                    window.open(popupForm.course?.downloadBrochure, "_blank");
                  } catch (error) {
                    console.error("Form submission failed:", error);
                  }
                }}
              />
              {formSubmitStatus === "failed" && formSubmitError && (
                <p className="text-red-300 text-xs mt-2">{formSubmitError}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {enquirePopup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-primary text-white relative w-full max-w-md rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-[#092653]">
              <h3 className="text-lg font-bold">{enquirePopup.course?.title || "Enquire Now"}</h3>
              <button onClick={() => { dispatch(clearFormError()); setEnquirePopup({ open: false, course: null }); }} className="text-lg font-bold hover:text-red-200">✕</button>
            </div>
            <div className="p-6 sm:p-8 text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
                <a href="tel:+918800505151" className="flex items-center justify-center gap-2 bg-white text-primary px-4 py-2 rounded font-semibold text-sm hover:bg-gray-200 w-full sm:w-auto"><FiPhoneCall /> +91-8800505151</a>
                <a href="mailto:info@didm.in" className="flex items-center justify-center gap-2 bg-white text-primary px-4 py-2 rounded font-semibold text-sm hover:bg-gray-200 w-full sm:w-auto"><MdEmail /> info@didm.in</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTabs;

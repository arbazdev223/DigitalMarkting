import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import {
  fetchCourseById,
  selectSelectedCourse,
  selectCourses,
  selectCourseStatus,
} from "../store/courseSlice";

const CourseDetails = () => {
  const [openSection, setOpenSection] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(selectSelectedCourse);
  const allCourses = useSelector(selectCourses);
  const status = useSelector(selectCourseStatus);
  useEffect(() => {
    if (!course || String(course.id) !== String(id)) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);
  const relatedCourses = allCourses
    .filter(
      (c) =>
        String(c.id) !== String(id) &&
        (c.category === course?.category || c.type === course?.type)
    )
    .sort((a, b) => (b.index || 0) - (a.index || 0))
    .slice(0, 3);

  const cartItems = useSelector((state) => state.cart.cart) || [];
  const isInCart = cartItems.some((item) => String(item.id) === String(id));

const handleAddToCart = () => {
  if (course && !isInCart) {
    dispatch(addToCart(course));
  }
};

  if (status === "loading" || !course) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!course) {
    return <div className="text-center py-10">Course not found.</div>;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="relative bg-gradient-to-br from-[#0e3477] to-[#1e4d9c] text-white px-2 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-sm md:text-base mb-3 opacity-90 line-clamp-2  items-start  md:line-clamp-none">
              {course.subtitle}
            </p>
            <p className="text-sm text-gray-200 mb-2">
              <strong>Category:</strong> {course.category} |{" "}
              <strong>Last Updated:</strong> {course.lastUpdated}
            </p>
            <div className="text-sm text-gray-300 flex gap-4">
              <span>
                {course.rating} ⭐ ({course.reviewsCount} reviews)
              </span>
              <span>{course.studentsEnrolled}+ enrolled</span>
            </div>
          </div>
          <div className="hidden md:block ">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48  object-contain rounded "
            />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 mt-10">
        <div className="lg:col-span-2 space-y-8 pr-2 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-hide">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0e3477]">
              What You'll Learn
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {course.whatYouWillLearn.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">
              Curriculum
            </h3>
            <div className="border rounded-md divide-y">
              {course.curriculum.map((section, idx) => (
                <div key={idx}>
                  <button
                    onClick={() =>
                      setOpenSection(openSection === idx ? null : idx)
                    }
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
                  >
                    <span className="font-semibold text-gray-800">
                      {section.section}
                    </span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        openSection === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openSection === idx && (
                    <ul className="list-disc list-inside gap-2 text-gray-600 px-4 py-2">
                      {section.lectures.map((lec, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{lec.title}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            ({lec.duration})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">
              Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {course.description}
            </p>
          </section>
        </div>
        <div className="lg:sticky lg:top-28 bg-white shadow-lg rounded-md overflow-hidden border h-fit">
          <video
            src={course.previewVideo}
            controls
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h4 className="text-lg font-bold text-[#0e3477] mb-2">
              {course.title}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              {course.includes.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Link to="/checkout" className="block">
             <button
  onClick={() => {
    if (course && !isInCart) {
      dispatch(addToCart(course));
    }
    window.location.href = "/checkout";
  }}
  className="w-full bg-[#0e3477] text-white py-2 rounded hover:bg-[#092653]"
>
  Buy Now
</button>
              </Link>
              {isInCart ? (
                <Link
                  to="/cart"
                  className="w-full bg-[#0e3477] text-white py-2 rounded hover:bg-[#092653] transition text-center"
                >
                  Go to Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white border border-[#0e3477] text-[#0e3477] py-2 rounded hover:bg-[#0e3477] hover:text-white transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {relatedCourses.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16 px-4">
          <h3 className="text-2xl font-bold text-[#0e3477] mb-6">
            Related Courses You Might Like
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedCourses.map((related) => (
              <Link
                key={related.id}
                to={`/course/${related.id}`}
                className="block bg-white border shadow-md rounded overflow-hidden transform transition duration-300 hover:-translate-y-2.5 hover:shadow-xl"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-[#0e3477] mb-1">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {related.subtitle}
                  </p>
                  <div className="text-sm mb-4 text-gray-500">
                    ⭐ {related.rating} | {related.studentsEnrolled}+ enrolled
                  </div>
                  {course.downloadBrochure ? (
                    <div className="flex gap-3">
                      <span className="w-1/4 text-center bg-[#0e3477] text-white px-4 py-2 text-sm font-semibold rounded">
                        View
                      </span>
                      <a
                        href={course.downloadBrochure}
                        download
                        className="w-3/4 flex items-center justify-center bg-gray-100 text-[#0e3477] px-4 py-2 text-sm font-semibold rounded border border-[#0e3477] hover:bg-[#0e3477] hover:text-white transition"
                      >
                        <MdDownload className="mr-2 text-lg" />
                        Download Brochure
                      </a>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <span className="w-2/4 text-center bg-[#0e3477] text-white px-4 py-2 text-sm font-semibold rounded">
                        View
                      </span>
                      <div className="w-2/4 flex items-center justify-center bg-gray-100 text-[#0e3477] px-4 py-2 text-sm font-semibold rounded border border-[#0e3477] hover:bg-[#0e3477] hover:text-white transition">
                        <span className="text-[16px] font-bold  font-[Open_Sans]">
                          ₹{course.salePrice}
                        </span>
                        <span className="line-through text-sm ml-2">
                          ₹{course.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

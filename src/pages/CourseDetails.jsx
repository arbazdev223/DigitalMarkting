import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
} from "../store/cartSlice";
import {
  fetchCourseById,
  selectSelectedCourse,
  selectCourses,
  selectCourseStatus,
} from "../store/courseSlice";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const course = useSelector(selectSelectedCourse);
  const allCourses = useSelector(selectCourses);
  const status = useSelector(selectCourseStatus);
  const cartItems = useSelector(selectCartItems) || [];

  const isInCart = cartItems.some(
    (item) =>
      item.id === course?.id ||
      item._id === course?.id ||
      item.id === course?._id ||
      item._id === course?._id
  );

  useEffect(() => {
    if (courseId) dispatch(fetchCourseById(courseId));
  }, [dispatch, courseId]);

  const handleAddToCart = () => {
    if (!course || isInCart) return;
    dispatch(addToCart(course));
  };

  const handleBuyNow = () => {
    if (!isInCart && course) handleAddToCart();
    navigate("/checkout");
  };

  if (status === "loading" || !course) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const relatedCourses = allCourses
    .filter(
      (c) =>
        String(c._id || c.courseId) !== String(courseId) &&
        (c.category === course.category || c.type === course.type)
    )
    .sort((a, b) => (b.index || 0) - (a.index || 0))
    .slice(0, 3);

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="bg-gradient-to-br from-primary to-[#1e4d9c] text-white px-2 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-base mb-3 opacity-90">{course.subtitle}</p>
            <p className="text-sm text-gray-200 mb-1">
              <strong>Category:</strong> {course.category} |{" "}
              <strong>Last Updated:</strong> {course.lastUpdated}
            </p>
            <p className="text-sm text-gray-300">
              {course.rating} ⭐ ({course.reviewsCount} reviews) | {course.studentsEnrolled}+ enrolled
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-contain rounded"
            />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {course.whatYouWillLearn?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-2">What You'll Learn</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {course.whatYouWillLearn.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {course.requirements?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-primary mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {course.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="text-xl font-bold text-primary mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {course.description}
            </p>
          </section>
        </div>
        <div className="sticky top-24 h-fit bg-white shadow rounded border overflow-hidden">
          {course.previewVideo && (
            <video src={course.previewVideo} controls className="w-full h-56 object-cover" />
          )}
          <div className="p-4">
            <h4 className="text-lg font-bold text-primary mb-2">{course.title}</h4>
            <ul className="text-sm text-gray-600 mb-4">
              {course.includes?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleBuyNow}
                className="bg-primary text-white py-2 rounded hover:bg-[#092653]"
              >
                Buy Now
              </button>

              {isInCart ? (
                <Link
                  to="/cart"
                  className="text-center bg-white border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white"
                >
                  Go to Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-white border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white"
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
          <h3 className="text-2xl font-bold text-primary mb-6">Related Courses You Might Like</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedCourses.map((related) => (
              <Link
                key={related.courseId || related._id}
                to={`/course/${related.courseId || related._id}`}
                className="bg-white border shadow rounded hover:shadow-xl transform hover:-translate-y-2.5 transition"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-primary mb-1">{related.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{related.subtitle}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    ⭐ {related.rating} | {related.studentsEnrolled}+ enrolled
                  </div>
                  {related.downloadBrochure ? (
                    <div className="flex gap-3">
                      <span className="w-1/4 text-center bg-primary text-white px-4 py-2 text-sm font-semibold rounded">
                        View
                      </span>
                      <a
                        href={related.downloadBrochure}
                        download
                        className="w-3/4 flex items-center justify-center bg-gray-100 text-primary px-4 py-2 text-sm font-semibold rounded border border-primary hover:bg-primary hover:text-white transition"
                      >
                        <MdDownload className="mr-2 text-lg" />
                        Download Brochure
                      </a>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <span className="w-2/4 text-center bg-primary text-white px-4 py-2 text-sm font-semibold rounded">
                        View
                      </span>
                      <div className="w-2/4 flex justify-center items-center bg-gray-100 text-primary px-4 py-2 text-sm font-semibold rounded border border-primary">
                        ₹{related.salePrice}
                        <span className="line-through text-sm ml-2">₹{related.price}</span>
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

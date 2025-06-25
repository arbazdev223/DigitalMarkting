import React from "react";
import { useParams, Link } from "react-router-dom";
import { courseDetailsList } from "../../data";
import { MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const CourseDetails = () => {
  const { id } = useParams();
  const course = courseDetailsList.find((c) => String(c.id) === String(id));

  if (!course) return <div className="text-center py-10">Course not found.</div>;

  const relatedCourses = courseDetailsList
    .filter(
      (c) => c.id !== course.id && (c.category === course.category || c.type === course.type)
    )
    .sort((a, b) => b.index - a.index)
    .slice(0, 3);
const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(course));
  };
  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="relative bg-gradient-to-br from-[#0e3477] to-[#1e4d9c] text-white px-2 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
            <p className="text-sm md:text-base mb-3 opacity-90">{course.subtitle}</p>
            <p className="text-sm text-gray-200 mb-2">
              <strong>Category:</strong> {course.category} | <strong>Last Updated:</strong> {course.lastUpdated}
            </p>
            <div className="text-sm text-gray-300 flex gap-4">
              <span>{course.rating} ⭐ ({course.reviewsCount} reviews)</span>
              <span>{course.studentsEnrolled}+ enrolled</span>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-contain rounded shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 mt-10">
        <div className="lg:col-span-2 space-y-8 pr-2 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-hide">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0e3477]">What You'll Learn</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {course.whatYouWillLearn.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">Curriculum</h3>
            <div className="space-y-4">
              {course.curriculum.map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-800 mb-1">{section.section}</h4>
                  <ul className="list-disc list-inside text-gray-600 ml-4">
                    {section.lectures.map((lec, i) => (
                      <li key={i}>{lec.title} <span className="text-xs text-gray-400 ml-2">({lec.duration})</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 text-[#0e3477]">Description</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{course.description}</p>
          </section>
        </div>
        <div className="lg:sticky lg:top-28 bg-white shadow-lg rounded-md overflow-hidden border h-fit">
          <video
            src={course.previewVideo}
            controls
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h4 className="text-lg font-bold text-[#0e3477] mb-2">{course.title}</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              {course.includes.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#0e3477] text-white py-2 rounded hover:bg-[#092653]">
                Buy Now
              </button>
              <button onClick={handleAddToCart} className="w-full bg-white border border-[#0e3477] text-[#0e3477] py-2 rounded hover:bg-[#0e3477] hover:text-white">
                Add to Cart
              </button>
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
                  <h4 className="text-lg font-semibold text-[#0e3477] mb-1">{related.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{related.subtitle}</p>
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

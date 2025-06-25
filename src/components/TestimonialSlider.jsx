import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { testimonials } from "../../data";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#f5f5f5] px-4 py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-[40%] flex justify-center">
          <img
            src={testimonials[currentIndex].image}
            alt="Testimonial"
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-[60%] relative text-center md:text-left px-2">
          <h3 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-4">
            What our valued clients are saying about us
          </h3>
          <p className="text-lg font-semibold mb-2 text-[#0e3477]">
            “{testimonials[currentIndex].quoteTitle}”
          </p>
          <p className="text-sm lg:text-lg text-gray-600 mb-6">
            {testimonials[currentIndex].quoteText}
          </p>
          <div className="flex justify-center md:justify-start text-[#0e3477] mb-2">
            {Array(testimonials[currentIndex].rating)
              .fill()
              .map((_, idx) => (
                <FaStar key={idx} />
              ))}
          </div>
          <div className="text-sm font-bold">
            {testimonials[currentIndex].author}
          </div>
          <div className="text-xs text-gray-500">
            {testimonials[currentIndex].company}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200"
          >
            <GrFormPrevious className="w-3 h-3 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-200"
          >
            <GrFormNext className="w-3 h-3 sm:w-5 sm:h-5" />
          </button>

          <div className="flex justify-center md:justify-end mt-6 gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-4 h-4 rounded-full cursor-pointer transition ${
                  currentIndex === i ? "bg-[#0e3477]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
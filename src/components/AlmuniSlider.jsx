import React, { useEffect, useState } from "react";
import { almunies } from "../../data";

const AlmuniSlider = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.ceil(almunies.length / visibleCount));
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  const slideWidth = 100 / visibleCount;

  return (
    <section className="bg-[#0e3477] py-16 px-4 font-nunito">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-opensans mb-10">
          What Our Alumni Says?
        </h2>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(almunies.length * 100) / visibleCount}%`,
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {almunies.map((almuni, index) => (
              <div
                key={index}
                className="w-full px-4 md:w-1/3 flex-shrink-0 flex justify-center"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                  <img
                    src={almuni.image}
                    alt={almuni.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <p className="text-[#444444] mb-4 font-nunito leading-relaxed">
                    {almuni.message}
                  </p>
                  <h4 className={`font-semibold ${almuni.color} font-opensans`}>
                    {almuni.name}
                  </h4>
                  <p className="text-[#444444] font-nunito">
                    {almuni.title},{" "}
                    <span className="font-bold">{almuni.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {Array.from({
            length: Math.ceil(almunies.length / visibleCount),
          }).map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlmuniSlider;

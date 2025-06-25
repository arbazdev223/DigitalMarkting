import React, { useState, useEffect } from "react";
import banner1 from "../assets/Digital1.jpeg";
import banner2 from "../assets/Digital2.jpeg";
import banner3 from "../assets/Digital3.jpeg";
import banner4 from "../assets/Digital4.jpeg";
import banner5 from "../assets/Digital5.jpeg";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const images = [banner1, banner2, banner3,banner4, banner5];

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full mx-auto overflow-hidden  h-[250px] md:h-[400px] lg:h-[550px] ">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out  ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 sm:left-10 transform -translate-y-1/2 bg-white text-black p-2 sm:p-3 rounded-full shadow hover:bg-gray-200 z-20"
      >
        <GrFormPrevious className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 sm:right-10 transform -translate-y-1/2 bg-white text-black p-2 sm:p-3 rounded-full shadow hover:bg-gray-200 z-20"
      >
        <GrFormNext className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>
    </div>
  );
};

export default HomeBanner;

import React, { useState, useEffect } from "react";
import Banner from "../assets/Bannerhs.avif";

const images = [
  {
    url: Banner,
    stat: "90%",
    description: "SOLD-OUT SHOWS ON TICKETMASTER",
    thumbnail: Banner,
  },
  {
    url: Banner,
    stat: "51%",
    description: "INCREASE IN ORGANIC TRAFFIC",
    thumbnail: Banner,
  },
  {
    url: Banner,
    stat: "38%",
    description: "BOOST IN SOCIAL REACH",
    thumbnail: Banner,
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => setCurrentIndex(index);

  return (
    <div className="flex flex-col  md:flex-row min-h-screen text-white font-sans">
      <div className="w-full md:w-3/5 bg-gradient-to-r from-black via-gray-900 to-black px-4 sm:px-8 md:px-16 py-8 md:py-16 flex flex-col justify-center">
        <h1 className="text-2xl sm:text-4xl font-nunito font-bold uppercase mb-10 text-center md:hidden">
          Our Results-Driven Web Design and Marketing Campaigns
        </h1>
        <h1 className="hidden md:block text-5xl font-extrabold leading-tight uppercase mb-10 text-left">
          <span className="block">Our Results-Driven Web</span>
          <span className="block">Design and Marketing</span>
          <span className="block">Campaigns</span>
        </h1>
        <div className="flex flex-col sm:flex-col md:flex-row items-center bg-[#0e3477] rounded-[120px] overflow-hidden w-full max-w-xl h-auto md:h-56 mb-8 shadow-lg mx-auto md:mx-0">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-6 py-6">
            <p className="text-white text-5xl sm:text-6xl font-bold">
              {currentImage.stat}
            </p>
            <p className="text-white text-sm font-bold mt-2 uppercase leading-tight">
              {currentImage.description}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end p-4">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white overflow-hidden">
              <img
                src={currentImage.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-xl mx-auto md:mx-0 px-5 sm:px-20 gap-4">
          <div className="flex space-x-4 justify-center sm:justify-center w-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-4 h-4 rounded-full transition ${
                  currentIndex === index ? "bg-[#0e3477]" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
          <button className="w-full sm:w-70 border border-white text-white hover:bg-white hover:text-black transition px-6 py-2 rounded-md text-sm font-semibold text-center">
            SEE ALL OUR WORK
          </button>
        </div>
      </div>
      <div className="w-full md:w-2/5 h-72 sm:h-[400px] md:h-auto">
        <img
          src={currentImage.url}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;

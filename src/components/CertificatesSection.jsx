import React, { useEffect, useState } from "react";
import { certificates } from "../../data";

const CertificatesSection = () => {
  const [current, setCurrent] = useState(0);
  const length = certificates.length;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const visibleCount = isMobile ? 1 : 3;

  useEffect(() => {
    const handleResize = () => {
      setCurrent((prev) => prev % length);
    };
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [length]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const getVisibleCertificates = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (current + i) % length;
      items.push(certificates[index]);
    }
    return items;
  };

  const visibleSlides = getVisibleCertificates();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 font-opens mb-12">
        Student Certificates
      </h2>
      <div className="relative w-full flex justify-center items-center gap-6 transition-all duration-500">
        {visibleSlides.map((cert) => (
          <img
            key={cert.id}
            src={cert.image}
            alt={cert.name}
            className="w-full max-w-xs md:max-w-sm rounded-lg shadow-md object-contain"
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-3">
        {certificates.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;

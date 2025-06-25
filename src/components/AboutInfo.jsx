import React, { useState } from "react";
import { aboutInfo } from "../../data";
import { FaChevronRight } from "react-icons/fa";

const AboutInfo = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-start">
        <div className="grid grid-cols-2 gap-4 flex-shrink-0 w-full lg:w-[40%]">
          {aboutInfo.awardImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`award-${index}`}
              className="rounded-lg object-cover w-full h-auto shadow-md"
            />
          ))}
        </div>
        <div className="w-full lg:w-[60%] space-y-3">
          <h4 className="text-sm uppercase font-semibold text-gray-500">
            {aboutInfo.headingTop}
          </h4>
          <h2 className="text-2xl md:text-3xl font-opensans font-bold text-[#0e3477] leading-tight">
            {aboutInfo.mainHeading}
          </h2>
          <p className="text-sm text-gray-700 font-nunito">
            {aboutInfo.subHeading}
          </p>

          <div className="space-y-4 mt-6">
            {aboutInfo.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-lg shadow-sm transition"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="flex justify-between items-center w-full p-4 text-left"
                >
                  <h3 className="font-semibold text-[#0e3477] text-base font-opensans">
                    {card.title}
                  </h3>
                  <FaChevronRight
                    className={`text-[#0e3477] transition-transform duration-300 ${
                      openIndex === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {openIndex === idx && (
                  <div className="px-4 pb-4 text-sm text-gray-600 font-nunito">
                    {card.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;

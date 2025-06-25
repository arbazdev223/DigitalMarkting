import { useState, useRef, useLayoutEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import sampleImage from "../assets/Aboutbgacc.webp";

const accordionItems = [
  {
    title: "BRANDING",
    content: [
      "Brand Storytelling",
      "Brand Voice Copywriting",
      "Corporate ID",
      "Corporate Nomenclature",
      "Slogans",
      "Collateral Design",
    ],
  },
  {
    title: "DESIGN",
    content: [
      "UI/UX Design",
      "Responsive Web Design",
      "Mobile App Design",
      "Email Template Design",
      "Logo & Identity Design",
    ],
  },
  {
    title: "DIGITAL MARKETING",
    content: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing",
      "Email Campaigns",
      "Content Strategy",
    ],
  },
  {
    title: "DEVELOPMENT",
    content: [
      "Custom Web Development",
      "E-commerce Solutions",
      "Content Management Systems",
      "App Development",
    ],
  },
  {
    title: "SEO",
    content: [
      "Technical SEO",
      "Keyword Research",
      "On-Page Optimization",
      "Backlink Strategy",
      "Analytics & Reporting",
    ],
  },
];

const AboutHeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const rightRef = useRef(null);
  const [rightHeight, setRightHeight] = useState("auto");
  const initialHeight = useRef(null); 

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (rightRef.current) {
        const newHeight = rightRef.current.scrollHeight;
        if (initialHeight.current === null) {
          initialHeight.current = newHeight;
        }
        setRightHeight(
          activeIndex !== null ? newHeight : initialHeight.current
        );
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);

    if (rightRef.current) {
      resizeObserver.observe(rightRef.current);
      updateHeight(); 
    }

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white py-4">
      <div
        className="w-full md:w-1/2 flex items-center justify-center transition-all duration-500 ease-in-out"
        style={{ height: rightHeight }}
      >
        <div
          className={`w-full h-full transition-transform duration-700 ease-in-out ${
            activeIndex !== null ? "scale-105" : "scale-100"
          }`}
        >
          <img
            src={sampleImage}
            alt="Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        ref={rightRef}
        className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto"
      >
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center text-left text-lg font-bold text-gray-800"
            >
              {item.title}
              <FaChevronDown
  className={`ml-2 transition-transform duration-300 text-[#0e3477] ${
    activeIndex === index ? "rotate-180" : "rotate-0"
  }`}
/>
            </button>
            {activeIndex === index && (
              <ul className="mt-3 pl-4 list-disc text-gray-600 text-sm space-y-1">
                {item.content.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHeroSection;

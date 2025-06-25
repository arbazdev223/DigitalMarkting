import React, { useEffect, useState } from "react";
import { impactItems } from "../../data"; 

const TypingHeading = ({ text, speed = 100 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{displayed}</h2>;
};

const ImpactCounter = ({ end, suffix, isDecimal = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 150;
    let currentStep = 0;

    const increment = end / steps;

    const interval = setInterval(() => {
      currentStep++;
      const value = isDecimal
        ? parseFloat((start + increment * currentStep).toFixed(1))
        : Math.floor(start + increment * currentStep);

      setCount(value);

      if (currentStep >= steps) {
        setCount(end);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [end, isDecimal]);

  return (
    <h3 className="text-3xl font-bold text-white">
      {count}
      {suffix}
    </h3>
  );
};

const ImpactSection = () => {
  return (
    <div className="w-full bg-[#0e3477] text-white sm:py-20 py-10 px-4 ">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <TypingHeading text="We Build Web Experiences That Deliver Results" speed={100} />
          <p className="text-lg text-gray-300 mb-6">
            Trusted by businesses worldwide, we blend creativity and strategy to
            create high-performance websites that convert.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
            Start Your Project
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {impactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition"
            >
              <ImpactCounter end={item.title} suffix={item.suffix} isDecimal={item.isDecimal} />
              <p className="text-gray-300 mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;

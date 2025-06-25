import React, { useEffect, useState } from "react";
import { featureStats } from "../../data";

const Counter = ({ target, duration = 10000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);
    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
};

const FeatureSummary = () => {
  return (
    <section className="bg-[#0e3477] py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg py-6 px-4 flex flex-col md:flex-row md:justify-around md:items-center gap-8">
        {featureStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4 w-full md:w-auto"
            >
              <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full">
                <Icon className="text-[#0e3477] text-4xl" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#0e3477] uppercase">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-black">
                  {stat.prefix || ""}
                  <Counter target={stat.value} />
                  {stat.suffix || ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSummary;

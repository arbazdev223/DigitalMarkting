import React from "react";
import { logos } from "../../data";

const OurClients = () => {
  return (
    <div className="py-16 bg-[#0e3477]">
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white font-opens">
          OUR CLIENTS
        </h2>
        <p className="text-md md:text-xl text-white mt-2 font-nunito">
          From Boutique to Enterprise, We Drive Results
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="marquee-track">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((company, i) => (
              <img
                key={i}
                src={company.src}
                alt={company.name}
                className="h-8 md:h-10 inline-block mx-6"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClients;

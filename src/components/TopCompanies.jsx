import React from "react";
import { topCompanies } from "../../data";

const TopCompanies = () => {
  return (
    <section className="bg-[#001a60] py-6 overflow-hidden">
      <div className="text-center text-white font-medium mb-6 text-sm md:text-xl">
        Our learners work at top companies
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="marquee-track flex gap-10">
          {[...topCompanies, ...topCompanies].map((company, i) => (
            <img
              key={i}
              src={company.logo}
              alt={company.name}
              className="h-8 md:h-10 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;

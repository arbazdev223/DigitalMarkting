import React from "react";
import bgImage from "../assets/Banner2.avif";
import { features } from "../../data";

const FeaturesSection = () => {
  return (
    <div
      className="w-full bg-cover bg-no-repeat bg-center bg-opacity-70 px-0 py-0 sm:px-4 sm:py-16"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full backdrop-blur-sm py-10 px-4">
        <div className="max-w-screen-xl mx-auto text-white text-center">
          <h2 className="text-3xl font-bold mb-10">
            IFDA Features & Facilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ id, icon: Icon, label }) => (
              <div key={id} className="text-center">
                {Icon && <Icon size={40} className="mx-auto mb-2 text-blue-600" />}
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

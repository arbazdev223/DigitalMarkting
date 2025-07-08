import React from "react";
import PriceCard from "./PriceCard";
import { seoPlans } from "../../data";

const SEOPlanSection = ({ title, highlight, description }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {title} <span className="text-blue-600">{highlight}</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 max-w-6xl mx-auto w-full gap-6">
        {seoPlans.map((plan, index) => (
          <PriceCard key={index} name={plan.name} features={plan.features} />
        ))}
      </div>
    </section>
  );
};

export default SEOPlanSection;

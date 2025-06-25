import React from "react";
import { accordionItems } from "../../data";
import FaqItem from "./FaqItem";

const FAQSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0e3477] mb-8">
          FAQs about our Digital Marketing Company and Services
        </h2>
        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <FaqItem
              key={index}
              title={item.title}
              content={item.content}
              faqs={item.faqs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

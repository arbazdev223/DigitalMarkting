import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { strategyData } from "../../data";

const StrategyComparison = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why You Need to Start With Strategy
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Uncover Market Opportunities and Increase Your Revenue
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-[#e9f1ff] border-t-4 border-blue-600 rounded-md shadow p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            {strategyData.withStrategy.title}
          </h3>
          <ul className="space-y-2 text-left">
            {strategyData.withStrategy.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <FaCheckCircle className="text-blue-600 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#ffeae6] border-t-4 border-red-500 rounded-md shadow p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-4">
            {strategyData.withoutStrategy.title}
          </h3>
          <ul className="space-y-2 text-left">
            {strategyData.withoutStrategy.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <FaTimesCircle className="text-red-600 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StrategyComparison;

import { useParams } from "react-router-dom";
import { useState } from "react";
import { allFaqs, digitalMarketingPoints } from "../../data";
import FeatureBlock from "../components/FeatureBlock";
import BannerAll from "../components/BannerAll";
import StrategyComparison from "../components/StrategyComparison";
import FAQSection from "../components/FaqSection";
import SEOPlanSection from "../components/SeoPlanSection";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const index = parseInt(id);
  const item1 = digitalMarketingPoints.find((point, idx) => idx === index);
  const faqKeys = Object.keys(allFaqs);
  const defaultFaqKey = item1?.faqKey || faqKeys[0];
  const [selectedFaqKey, setSelectedFaqKey] = useState(defaultFaqKey);

  const faqs = allFaqs[selectedFaqKey] || [];

  return (
    <>
      <BannerAll
        image={item1.feature}
        heading={item1.heading}
        paragraph={item1.para}
      />

      <div className="bg-gray-50 py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FeatureBlock item={item1} />
        </div>
        <div className="max-w-6xl mx-auto text-center mt-10">
          <h2 className="text-2xl text-[#444444] font-opens font-extrabold md:text-3xl font-bold text-primary mb-6">
            {item1.heading}
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-4">
            {item1.para}
          </p>
          {Array.isArray(item1.content) ? (
            item1.content.map((c, i) => (
              <p key={i} className="text-gray-600 text-base md:text-lg mb-4">
                {c}
              </p>
            ))
          ) : (
            <p className="text-gray-600 text-base md:text-lg mb-4">
              {item1.content}
            </p>
          )}
        </div>
      </div>

      <StrategyComparison />
      <div className="max-w-6xl mx-auto my-8 flex flex-wrap gap-2 justify-center">
        {faqKeys.map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded font-semibold border ${
              selectedFaqKey === key
                ? "bg-primary text-white"
                : "bg-white text-primary border-primary"
            } transition`}
            onClick={() => setSelectedFaqKey(key)}
          >
            {key.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {faqs && faqs.length > 0 && (
        <FAQSection
          heading={selectedFaqKey + " FAQs"}
          faqTitle={`FAQs about our ${selectedFaqKey.replace(/_/g, " ")}`}
          faqs={faqs}
        />
      )}

      <SEOPlanSection
        title="Deliverables of the"
        highlight="Top Off-Page SEO"
        description="Below mentioned are deliverables for businesses that want to target less than 200 keywords. Contact us if you require more."
      />
    </>
  );
};

export default ServiceDetailPage;

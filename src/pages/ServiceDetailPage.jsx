import { useParams } from "react-router-dom";
import { allFaqs, digitalMarketingPoints } from "../../data";
import FeatureBlock from "../components/FeatureBlock";
import BannerAll from "../components/BannerAll";
import StrategyComparison from "../components/StrategyComparison";
import FAQSection from "../components/FaqSection";
import SEOPlanSection from "../components/SeoPlanSection";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const item1 = digitalMarketingPoints.find((point, index) => index === parseInt(id));
//  const faqItems = allFaqs.find((point, index) => index === parseInt(id));
// console.log("item", faqItems);
// console.log("item", faqItems?.question);

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
        <div className="max-w-6xl mx-auto   text-center mt-10">
          <h2 className="text-2xl text-[#444444] font-opens font-extrabold md:text-3xl font-bold text-[#0e3477] mb-6">
           {item1.heading}
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-4">
           {item1.para}
          </p>
          <p className="text-gray-600 text-base md:text-lg mb-4">
{item1.content}          </p>
          <p className="text-gray-600 text-base md:text-lg mb-4">
{item1.content}          </p>
        </div>
      </div>
      
    <StrategyComparison />
{/* <FAQSection
  key={faqItems.id}
  faqs={faqItems|| []}
  question={question}
  answer={answer}
  heading={faqItems.heading}
  faqTitle={faqItems.faqTitle}
/> */}

<SEOPlanSection
  title="Deliverables of the"
  highlight="Top Off-Page SEO"
  description="Below mentioned are deliverables for businesses that want to target less than 200 keywords. Contact us if you require more."
/>
        </>
  );
};

export default ServiceDetailPage;

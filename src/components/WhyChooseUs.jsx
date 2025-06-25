
import { FaCheckCircle } from "react-icons/fa";
import { images12,features12 } from "../../data";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold font-opens text-[#444444] mb-4">
            Why Students Choose <span className="text-[#0e3477]">DG Royals?</span>
          </h2>
          <p className="text-gray-700 mb-6 font-nunito">
            Thousands of students making Right Choice by joining Professional
            Courses For Highly Rewarding Career
          </p>
          <ul className="space-y-3">
            {features12.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#0e3477] mt-1 text-lg" />
                <span className="text-gray-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images12.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`choose-img-${index + 1}`}
              className="rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

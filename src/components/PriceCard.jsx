import { FaCheckCircle } from "react-icons/fa";

const PriceCard = ({ name, features }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold items-start text-center bg-primary text-white rounded-full px-4 py-2 w-fit ">
        {name}
      </h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <FaCheckCircle className="text-green-600 mt-1" />
            <span className="text-sm font-nuinto font-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceCard;

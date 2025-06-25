const FeatureBlock = ({ item, reverse }) => {
  return (
    <div
      className={`grid md:grid-cols-2 items-center gap-10 py-10 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#0e3477] mb-3">
          {item.heading}
        </h3>
        <p className="text-gray-600 text-base md:text-lg font-medium mb-2">
          {item.para}
        </p>
        <p className="text-gray-500 leading-relaxed">{item.content}</p>
        <p className="text-gray-500 leading-relaxed">{item.content2}</p>
        <p className="text-gray-500 leading-relaxed">{item.content3}</p>
      </div>

      <div>
        <img
          src={item.image}
          alt={item.heading}
          className="w-full max-w-md mx-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default FeatureBlock;

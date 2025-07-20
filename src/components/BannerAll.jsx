import React from "react";

const BannerAll = ({ image, heading, paragraph }) => {
  return (
    <section className="w-full relative">
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
        <img
          src={image}
          alt="Banner"
          className="w-full h-full object-cover opacity-30 bg-black"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-opens font-semibold mb-4">
            {heading}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-nunito max-w-2xl">
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BannerAll;

import React from "react";
import { contactBannerData } from "../../data";
import { FaPaperPlane } from "react-icons/fa";

const ContactBanner = () => {
  return (
    <section className="bg-[#0e3477] text-white py-16">
      <div className="max-w-6xl w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-opensans">
            {contactBannerData.title}
          </h2>
          <p className="text-[15px] leading-relaxed whitespace-pre-line font-nunito">
            {contactBannerData.description}
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <FaPaperPlane className="text-white text-[100px] sm:text-[120px]" />
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;

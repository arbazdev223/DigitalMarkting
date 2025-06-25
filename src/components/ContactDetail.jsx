import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const ContactDetail = () => {
  return (
    <section className="bg-[#0e3477] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaMapMarkerAlt className="text-3xl text-[#0e3477]" />
            <h4 className="font-bold font-opens text-base sm:text-lg text-[#444444]">
              Visit Us
            </h4>
            <p className="text-sm font-nunito font-light text-[#444444] leading-relaxed">
              92–94, 3rd Floor, Mall Road<br />
              GTB Nagar Near Metro Gate No. 03,<br />
              Delhi 110009.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaPhoneAlt className="text-3xl text-[#0e3477]" />
            <h4 className="font-bold font-opens text-base sm:text-lg text-[#444444]">
              Call us
            </h4>
            <p className="text-sm font-nunito font-light text-[#444444]">
              +91-9990194550<br />
              +91-8447726000<br />
              +91-8585959688
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaEnvelope className="text-3xl text-[#0e3477]" />
            <h4 className="font-bold font-opens text-base sm:text-lg text-[#444444]">
              Email us
            </h4>
            <p className="text-sm font-nunito font-light text-[#444444] break-words">
              dgroysalsofficial@gmail.com<br />
              hrdgroyals@gmail.com
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaClock className="text-3xl text-[#0e3477]" />
            <h4 className="font-bold font-opens text-base sm:text-lg text-[#444444]">
              Hours
            </h4>
            <p className="text-sm font-nunito font-light text-[#444444]">
              Monday–Sunday:<br />
              10am–7pm<br />
              <span className="font-semibold">Friday : Fix OFF</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetail;

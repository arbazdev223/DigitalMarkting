import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-white">
        <a
          href="tel:+919161276060"
          className="flex items-center gap-2 mb-1 sm:mb-0 "
        >
          <FaPhoneAlt className="text-white" />
          +91 9161276060
        </a>
        <a
          href="mailto:info@banarasdigitalsolution.com"
          className="flex items-center gap-2 "
        >
          <FaEnvelope className="text-white" />
          info@banarasdigitalsolution.com
        </a>
      </div>
    </div>
  );
};

export default TopBar;

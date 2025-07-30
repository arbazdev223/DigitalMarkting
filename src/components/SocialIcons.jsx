import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter,FaWhatsapp , FaYoutube } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="fixed top-1/2 right-1 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
      <Link to="https://www.facebook.com/share/1M9F3B3uDm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 bg-white p-2 rounded-md shadow flex items-center justify-center">
        <FaFacebookF size={25} />
      </Link>
      <Link to="https://www.instagram.com/banaras_digital_solution?igsh=MXBxazRmb3V1Nmdobg==" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 bg-white p-2 rounded-md shadow flex items-center justify-center">
        <FaInstagram size={25} />
      </Link>
      <Link to="https://whatsapp.com/channel/0029VbAdEW57z4kYIGQieJ2L" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 bg-white p-2 rounded-md shadow flex items-center justify-center">
        <FaWhatsapp size={25} />
      </Link>
      <Link to="https://youtube.com/@banarasdigitalhub?si=Uvje_krqowilgqaE" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 bg-white p-2 rounded-md shadow flex items-center justify-center">
        <FaYoutube size={25} />
      </Link>
    </div>
  );
};

export default SocialIcons;

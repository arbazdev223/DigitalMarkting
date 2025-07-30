import React from 'react';
import Logo from "/assets/logo.png"; 
import {
  FiFacebook,
  FiMessageCircle,
  FiCamera,
  FiBell,
  FiMessageSquare,
  FiGlobe
} from "react-icons/fi";
const ProfileInfoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white px-4">
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <img
          src={Logo} 
          alt="Banaras Diigital Solution"
          className="w-40 md:w-56"
        />
      </div>
      <p className="text-center text-sm md:text-lg font-medium max-w-md mb-6">
        Banaras Digital Solution provides a wide range of short-term and long-term job-oriented IT courses.
      </p>
      <div className="w-full max-w-sm flex flex-col gap-3">
     <a
  href="https://banarasdigitalsolution.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start gap-2 border-r pr-4 border-white">
    <FiGlobe size={20} />
  </div>
  <span className="pl-4">Go to Website</span>
</a>

        <a
          href="https://whatsapp.com/channel/0029VbAdEW57z4kYIGQieJ2L"
            target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start gap-2 border-r pr-4 border-white">
    <FiMessageCircle size={20} />
  </div>
  <span className="pl-4">Talk To Us</span>
 
        </a>

        <a
          href="https://www.facebook.com/share/1M9F3B3uDm/"
                  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start gap-2 border-r pr-4 border-white">
    <FiFacebook size={20} />
  </div>
  <span className="pl-4">Like Page</span>
        </a>

        <a
          href="https://www.instagram.com/banaras_digital_solution?igsh=MXBxazRmb3V1Nmdobg==" 
                target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start gap-2 border-r pr-4 border-white">
    <FiCamera size={20} />
  </div>
  <span className="pl-4">Follow Us</span>
        </a>

        <a
          href="https://youtube.com/@banarasdigitalhub?si=Uvje_krqowilgqaE" 
                   target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start gap-2 border-r pr-4 border-white">
    <FiBell size={20} />
  </div>
  <span className="pl-4">Subscribe</span>
        </a>

        <a
          href="https://t.me/ifdainstitute" 
                   target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center  bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded text-white"
>
  <div className="flex items-center justify-start  gap-2 border-r pr-4 border-white">
    <FiMessageSquare size={20} />
  </div>
  <span className="pl-4">Join Us</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileInfoPage;

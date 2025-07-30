import React from 'react';
import Logo from "/assets/logo.png"; 
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
          href="https://ifda.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 py-2 rounded"
        >
          🌐 Go to Website
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-2 rounded"
        >
          🟢 Talk To Us
        </a>

        <a
          href="https://facebook.com/ifdainstitute"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 py-2 rounded"
        >
          📘 Like Page
        </a>

        <a
          href="https://instagram.com/ifdainstitute" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 py-2 rounded"
        >
          📸 Follow Us
        </a>

        <a
          href="https://www.youtube.com/@ifdainstitute" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 py-2 rounded"
        >
          📺 Subscribe
        </a>

        <a
          href="https://t.me/ifdainstitute" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 py-2 rounded"
        >
          💬 Join Us
        </a>
      </div>
    </div>
  );
};

export default ProfileInfoPage;

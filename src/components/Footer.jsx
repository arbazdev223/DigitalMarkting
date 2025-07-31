import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { FiYoutube } from "react-icons/fi";
import logo from '/assets/logo2.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm, clearFormError } from '../store/formSlice';

const Footer = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const formSubmitStatus = useSelector((state) => state.form.formSubmitStatus);
  const formSubmitError = useSelector((state) => state.form.formSubmitError);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    dispatch(clearFormError());

    try {
      await dispatch(
        submitForm({
          formHeading: 'News Letter',
          email,
        })
      ).unwrap();
      setEmail(''); 
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 col-span-2">
          <img src={logo} alt="IFDA Logo" className="h-30 mb-4" />
          <p className="text-sm">
            Ifda is your go-to platform for career-focused digital marketing & technology courses designed for today’s job market.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.facebook.com/share/1M9F3B3uDm/" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://youtube.com/@banarasdigitalhub?si=Uvje_krqowilgqaE" className="hover:text-white"><FiYoutube /></a>
            <a href="https://www.instagram.com/banaras_digital_solution?igsh=MXBxazRmb3V1Nmdobg==" className="hover:text-white"><FaInstagram /></a>
            <a href="https://whatsapp.com/channel/0029VbAdEW57z4kYIGQieJ2L" className="hover:text-white"><FaWhatsapp   /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 col-span-2">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white">Web Development</a></li>
              <li><a href="#" className="hover:text-white">SEO & SEM</a></li>
              <li><a href="#" className="hover:text-white">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-white">Content Marketing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/" className="hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-1 col-span-2">
          <h4 className="text-lg font-semibold text-white mb-4">Subscribe</h4>
          <p className="text-sm mb-4">Get the latest updates and course offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
          {formSubmitStatus === 'failed' && formSubmitError && (
            <p className="text-red-400 text-xs mt-2">{formSubmitError}</p>
          )}
          {formSubmitStatus === 'succeeded' && (
            <p className="text-green-400 text-xs mt-2">Subscribed successfully!</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-400">
        © {new Date().getFullYear()} IFDA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

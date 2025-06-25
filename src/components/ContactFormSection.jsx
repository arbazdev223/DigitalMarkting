import React from "react";
import { CheckCircle } from "lucide-react";
import Logo from "../assets/logo.png"
const contactPoints = [
  {
    text: `Enroll in our <span class='text-[#0e3477] hover:text-[#0e3477]/60 transition'>digital marketing course curriculum</span> and learn through our LMS with dedicated mentorship and expert career guidance.`,
    isHTML: true,
  },
  {
    text: `In-depth practical digital marketing training sessions will make you job-ready with an excellent  <span class='text-gray-950 font-bold hover:text-gray-600/60 transition'>salary package.</span>`,
    isHTML: true,
  },
  {
    text: `Taking up our digital marketing course with <span class='text-gray-950 font-bold hover:text-gray-600/60 transition'>50+</span> Modules can help working professionals to have an edge over the competition.`,
    isHTML: true,
  },
  {
    text: `Taking up our digital marketing course with <span class='text-gray-950 font-bold hover:text-gray-600/60 transition'>50+</span> Modules can help working professionals to have an edge over the competition.`,
    isHTML: true,
  },
  {
    text: `Taking up our digital marketing course with <span class='text-gray-950 font-bold hover:text-gray-600/60 transition'>50+</span> Modules can help working professionals to have an edge over the competition.`,
    isHTML: true,
  },
];

const ContactFormSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-12 items-start">
          <div className="w-full">
             <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold mb-4">
  <span className="text-[#0e3477] hover:opacity-60 transition">Digital</span>{" "}
  <span className="text-[#0e3477] hover:opacity-60 transition">Marketing</span>{" "}
  <span className="text-[#0e3477] hover:opacity-60 transition">Course</span>
  <span className="text-black">/Training Highlights</span>
</h2>
            <h4 className="text-lg sm:text-sm font-semibold text-gray-600 mb-4">
              Master in Digital Marketing Course | Online & Offline Mode
            </h4>
            <p className=" text-sm text-gray-600 mb-6">
             We are prime and the best institute for a digital marketing course in Delhi/NCR & across India. This course makes you capable of grabbing a good package as a fresher. Furthermore, it will enhance your skill if you are a working professional and also provide you with ample opportunities to work as a freelancer after completion of the digital marketing course.
            </p>
             <h4 className="text-lg sm:text-sm font-semibold text-gray-600 mb-4">
              Features Of The Course
            </h4>
            <ul className="space-y-3">
              {contactPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircle className="text-green-500 w-5 h-5 mt-0.5" />
                  {point.isHTML ? (
                    <span dangerouslySetInnerHTML={{ __html: point.text }} />
                  ) : (
                    <span>{point.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0e3477] rounded-xl text-white p-6 sm:p-8 w-full">
            <div className="text-center mb-6">
              <img
                src={Logo}
                alt="Logo"
                className="mx-auto mb-3"
              />
              <h4 className="text-xl sm:text-2xl font-bold">Take a free session today!!</h4>
              <p className="text-sm text-red-100">
                Go Digital | Go Global<br/>Speak To Our Specialist - +91 - 8800505151
              </p>
            </div>
        <form className="space-y-3">
  <input
    type="text"
    placeholder="Full Name"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  />
  <input
    type="email"
    placeholder="Email"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  />
  <input
    type="tel"
    placeholder="Phone"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
  />
  <input
    type="text"
    placeholder="Subject"
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
  />
  <textarea
    placeholder="Message"
    rows={4}
    className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
    required
  ></textarea>

  <div className="flex items-start gap-2">
    <input type="checkbox" id="policy" className="accent-white mt-1" required />
    <label htmlFor="policy" className="text-sm">
       I agree to the <a href="#" className="underline">DIDM Terms of Use</a> and <a href="#" className="underline">privacy policy</a>.
    </label>
  </div>

  <button
    type="submit"
    className="w-full bg-white text-[#0e3477] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
  >
    Submit
  </button>
</form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

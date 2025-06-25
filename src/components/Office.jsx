import React from "react";
import { courseOptions } from "../../data";

const Office = () => {
  return (
    <section className="bg-[#f7f4eb] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold font-opens text-[#333333] mb-6 text-center md:text-left">
            Let's connect with us
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 font-nunito focus:outline-none focus:ring-2 focus:ring-[#0e3477]"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md px-4 py-2 font-nunito focus:outline-none focus:ring-2 focus:ring-[#0e3477]"
            />
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 font-nunito focus:outline-none focus:ring-2 focus:ring-[#0e3477]"
            >
              <option>Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-4 py-2 font-nunito focus:outline-none focus:ring-2 focus:ring-[#0e3477]"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 font-nunito focus:outline-none focus:ring-2 focus:ring-[#0e3477]"
            />
            <button
              type="submit"
              className="bg-[#0076FF] hover:bg-[#0e3477] text-white font-semibold px-6 py-2 rounded-md transition w-fit ml-auto block"
            >
              Apply Now →
            </button>
          </form>
        </div>
        <div className="w-full h-[400px] md:h-auto rounded-xl overflow-hidden shadow-md">
          <iframe
            title="DG Royals Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.659540780507!2d77.19921155806023!3d28.701969666845984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d017fbbfc6e7d%3A0x7f21dd7b64e26c26!2sDG%20Royals%20Best%20Digital%20Marketing%20Graphic%20Designing%20%26%20Web%20Design%20Development%20Institute%20in%20Delhi!5e0!3m2!1sen!2sin!4v1719120341663!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Office;

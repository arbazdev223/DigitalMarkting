import React from "react";
import { upskillsData } from "../../data";

const Upskills = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold font-opensans text-[#444444]">
            Upskill Your Career with{" "}
            <span className="text-[#0e3477]">Digital Marketing Course</span>
          </h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto font-nunito">
            You can become a digital marketer & marketing specialist without leaving your job.
            Now enhance your skill with Delhi Institute of Digital Marketing. One place to learn
            from Executive Level to Managerial Level Digital Marketing training in Delhi in all
            practical ways. The high demand for digital marketing courses is suited for working
            professionals, job seekers, freelancers, students as well as entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upskillsData.map(({ id, icon: Icon, title, subtitle, description }) => (
            <div
              key={id}
              className="border p-6 rounded-lg shadow-sm hover:shadow-md transition group"
            >
              <div className="flex items-start gap-3">
                <div
                  className="transform transition-transform duration-500 group-hover:translate-y-10"
                >
                  <Icon className="text-[#0e3477] text-4xl lg:text-7xl" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm lg:text-xl text-[#0e3477] font-opensans">
                    {title}
                  </h3>
                  <p className="lg:text-md text-sm mt-1 font-semibold font-nunito text-[#444444]">
                    {subtitle}
                  </p>
                  <p className="text-gray-600 text-sm lg:text-md mt-2 font-nunito">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upskills;

import { services } from "../../data";

const ServicesSection = () => {
  const leftServices = services.slice(0, -1); 
  const lastService = services[services.length - 1];

  return (
    <section className="bg-[#3646a3] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leftServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-5 text-center shadow-sm hover:shadow-lg transition min-h-[200px] flex flex-col justify-start"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-12 h-12 mx-auto mb-3 hover:translate-y-2"
                />
                <h4 className="text-md font-bold text-[#0e3477] mb-1 font-[Open_Sans]">
                  {service.title}
                </h4>
                <p className="text-sm text-[#444444] font-[Nunito] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
       <div className="text-white px-2 h-full flex flex-col justify-between">
  <div className="space-y-4">
    <h3 className="text-2xl sm:text-4xl font-bold font-[Open_Sans]">
      Our Services
    </h3>
    <p className="text-xl sm:text-lg font-[Nunito] leading-relaxed">
      Make your marketing more efficient with our comprehensive solutions
    </p>
  </div>
  {lastService && (
    <div className="mt-6 bg-white rounded-lg p-5 text-center shadow-sm hover:shadow-lg transition min-h-[200px] flex flex-col justify-start">
      <img
        src={lastService.icon}
        alt={lastService.title}
        className="w-12 h-12 mx-auto mb-3 hover:translate-y-2"
      />
      <h4 className="text-md font-bold text-[#0e3477] mb-1 font-[Open_Sans]">
        {lastService.title}
      </h4>
      <p className="text-sm text-[#444444] font-[Nunito] leading-relaxed">
        {lastService.description}
      </p>
    </div>
  )}
</div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


import { steps1 } from "../../data";
import { GoTriangleRight, GoTriangleLeft, GoTriangleDown } from "react-icons/go";
const CourseRoadmap = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-2xl md:text-5xl font-opens font-semibold text-[#000000] mb-4">
            How does this digital marketing course work?
          </h1>
          <p className="text-gray-500 mb-6 text-sm font-nunito">
            Your Roadmap to Become a Full-Stack Digital Marketer
          </p>
          <button className="bg-[#0e3477] hover:bg-[#0e3477] text-white px-6 py-2 rounded-md text-md font-semibold w-fit">
            Apply Now
          </button>
        </div>
        <div className="flex flex-col w-full">
          {steps1.map((step, index) => {
            const isEven = index % 2 === 1;
            const isOdd = !isEven;
            
            const renderAngleIcon = () => {
              const iconProps = "absolute text-[#0e3477] text-xl";

              switch (index) {
                case 0: 
                  return (
                    <GoTriangleRight
                      className={`${iconProps} -bottom-[10px] left-[50%] transform -translate-x-1/2`}
                    />
                  );
                case 1: 
                  return (
                    <GoTriangleLeft
                      className={`${iconProps} -bottom-[10px] left-[50%]  transform -translate-x-1/2`}
                    />
                  );
                case 2: 
                  return (
                    <GoTriangleDown
                      className={`${iconProps} top-1/2 -left-[10px] transform -translate-y-1/2`}
                    />
                  );
                case 3: 
                  return (
                    <GoTriangleRight
                      className={`${iconProps} -top-[10px] right-[50%]`}
                    />
                  );
                default:
                  return null;
              }
            };


            return (
            <div
  key={index}
  className={`relative bg-white rounded-[30px] p-6 min-h-[149px] flex flex-col sm:flex-row items-center sm:items-start gap-6 cursor-pointer shadow-sm transition hover:shadow-md w-full 
    ${isEven ? "md:ml-10" : ""}
  `}
>
  <div
    className="absolute inset-0 rounded-[30px] pointer-events-none border-2 border-[#0e3477] border-dashed z-0"
    style={{
      clipPath: isOdd
        ? "polygon(0% 0%, 96% 0%, -47% 173%, 100% 100%, 0% 100%, 0% 0%)"
        : "polygon(13% 97%, 100% 100%, 100% 0%, 0% 0%, 0% -50%)",
    }}
  ></div>
  <div className="z-20">{renderAngleIcon()}</div>
  <div className="relative w-[85px] h-[85px] shrink-0 z-10">
    <img src={step.icon} alt="icon" width={85} height={85} className="transition-opacity duration-300" />
    <img src={step.iconFilled} alt="icon-hover" width={85} height={85} className="absolute top-0 left-0 opacity-0 transition-opacity duration-300" />
  </div>

  <div className="text-center sm:text-left w-full z-10">
    <h3 className="text-lg md:text-xl font-semibold text-[#222] mb-2 flex flex-wrap justify-center sm:justify-start items-center">
      {step.title}
      {step.badge && (
        <span className="ml-3 mt-2 sm:mt-0 bg-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
          {step.badge}
          {step.badgeIcon && (
            <img src={step.badgeIcon} alt="dot" className="mx-1 w-1 h-1" />
          )}
          {step.badge2}
        </span>
      )}
    </h3>
    <p className="text-sm text-[#666] font-nunito leading-6">{step.description}</p>
  </div>
</div>

            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseRoadmap;

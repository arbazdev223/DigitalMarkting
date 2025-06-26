import React from "react";
import Cert1 from "../assets/certificate1.jpg";

const Certificate = ({ name, course, date }) => {
  return (
    <div
      className="relative"
      style={{
        width: 900,
        height: 650,
        backgroundImage: `url(${Cert1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "serif",
      }}
    >
      <div className="absolute top-[34%] left-[25%] right-[25%] text-center">
        <h2 className="text-2xl font-bold italic">{name}</h2>
      </div>
      <div className="absolute top-[43%] left-[22%] right-[22%] text-center">
        <h3 className="text-xl font-semibold underline">{course}</h3>
      </div>
      <div className="absolute bottom-[14%] right-[12%] text-right text-lg text-[#000]">
        <p>Issued on: {date}</p>
      </div>
    </div>
  );
};

export default Certificate;

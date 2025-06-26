import React, { useRef } from "react";
import Certificate from "../components/Certificate";

const CertificatePage = () => {
  const certificates = JSON.parse(localStorage.getItem("certificates") || "[]");

  // For download functionality
  const refs = useRef([]);

  const handleDownload = (idx) => {
    const node = refs.current[idx];
    if (!node) return;
    import("html2canvas").then((html2canvas) => {
      html2canvas.default(node, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `certificate-${idx + 1}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  };

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#0e3477]">
        Your Certificates
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {certificates.length === 0 && (
          <p className="text-center text-gray-500">No certificates yet.</p>
        )}
        {certificates.map((cert, idx) => (
          <div key={cert.id} className="flex flex-col items-center">
            <div
              ref={(el) => (refs.current[idx] = el)}
              style={{ width: 900, height: 650 }} // Fixed size for download
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <Certificate
                name={cert.name}
                course={cert.course}
                date={cert.date}
              />
            </div>
            <button
              onClick={() => handleDownload(idx)}
              className="mt-4 bg-[#0e3477] text-white px-4 py-2 rounded shadow hover:bg-[#092963] font-semibold"
            >
              Download Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatePage;

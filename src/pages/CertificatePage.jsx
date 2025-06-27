import React, { useRef, useState } from "react";
import Certificate from "../components/Certificate";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Pagination from "../components/Pagination";

const CertificatePage = () => {
  const certificates = useSelector((state) => state.certificate.certificates);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const refs = useRef([]);

  const handleDownload = async (idx) => {
    const node = refs.current[idx];
    if (!node) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `certificate-${idx + 1}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Certificate download failed:", error);
    }
  };
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCertificates = certificates.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="py-8 bg-gray-100 min-h-screen max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#0e3477]">
        Your Certificates
      </h2>
      {certificates.length === 0 ? (
        <p className="text-center text-gray-500">No certificates yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {currentCertificates.map((cert, idx) => {
              const globalIndex = startIdx + idx;
              return (
                <div key={cert.id} className="flex flex-col items-center">
                  <div
                    ref={(el) => (refs.current[globalIndex] = el)}
                    style={{ width: 250, height: 150 }}
                    className="bg-white gap rounded-lg overflow-hidden shadow-lg"
                  >
                    <Certificate
                      name={cert.name}
                      course={cert.course}
                      date={cert.date}
                    />
                  </div>
                  <button
                    onClick={() => handleDownload(globalIndex)}
                    className="mt-4 bg-[#0e3477] text-white px-4 py-2 rounded shadow hover:bg-[#092963] font-semibold"
                  >
                    Download Certificate
                  </button>
                </div>
              );
            })}
          </div>
{certificates.length > 4 && (
  <Pagination
    totalItems={certificates.length}
    itemsPerPage={itemsPerPage}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
  />
)}
        </>
      )}
    </div>
  );
};

export default CertificatePage;

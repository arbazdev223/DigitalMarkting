import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ContactSlideForm = () => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    services: [],
    subscribe: false,
  });

  const toggleService = (service) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex ${open ? "visible" : "invisible"}`}>
      <div
        className="w-[40%] bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="w-[60%] h-screen bg-[#222] text-white overflow-y-auto transition-all duration-500 p-6 sm:p-10 relative">
        <button
          className="absolute top-4 right-4 text-white text-3xl"
          onClick={() => setOpen(false)}
        >
          <IoClose />
        </button>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">READY TO GROW REVENUE?</h1>
        <p className="text-lg text-gray-300 mb-8">
          Digital Experiences That's Driven Growth Since 1998
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="First Name *" className="p-3 rounded w-full text-black" />
            <input placeholder="Last Name *" className="p-3 rounded w-full text-black" />
            <input placeholder="Email *" className="p-3 rounded w-full text-black" />
            <div className="flex gap-2 items-center bg-white rounded p-2">
              <span className="text-black">🇺🇸 +1</span>
              <input placeholder="Phone" className="flex-1 text-black outline-none" />
            </div>
            <input placeholder="Company *" className="p-3 rounded w-full text-black" />
            <select className="p-3 rounded w-full text-black">
              <option>How did you hear about us?</option>
              <option>Google</option>
              <option>Social Media</option>
              <option>Friend</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Help My Business *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "Generate Leads",
                "Optimize Website",
                "Improve Brand Loyalty",
                "Increase Revenue",
                "Rank in Google",
                "Increase Market Share",
              ].map((service) => (
                <label key={service} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="accent-red-500"
                    onChange={() => toggleService(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>
          <textarea
            rows={4}
            placeholder="Project Details *"
            className="w-full p-3 rounded text-black"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formData.subscribe}
              onChange={() =>
                setFormData((prev) => ({ ...prev, subscribe: !prev.subscribe }))
              }
              className="accent-red-500"
            />
            Sign me up for marketing, web, mobile tips and insights.
          </label>
          <button
            type="submit"
            className="w-full bg-[#0e3477] hover:bg-[#0e3477]/60 text-white py-3 font-bold text-lg rounded"
          >
            SUBMIT
          </button>
        </form>
        <div className="mt-10 pt-6 border-t border-gray-700 text-sm text-gray-300 space-y-2">
          <p><strong>Email:</strong> contact@example.com</p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Digital Lane, Marketing City, NY 10001</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSlideForm;

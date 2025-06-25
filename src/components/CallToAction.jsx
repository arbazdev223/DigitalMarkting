import { useState } from "react";
import ContactSlideForm from "./ContactSlideForm";

const CallToAction = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setFormOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-lg transition-all"
      >
        Request a Call
      </button>
      {formOpen && <ContactSlideForm setOpen={setFormOpen} />}
    </>
  );
};

export default CallToAction;

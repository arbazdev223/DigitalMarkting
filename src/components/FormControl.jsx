import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../store/formSlice";
import { toast } from "react-toastify";

const FormControl = ({ courseTitle = "" }) => {
  const dispatch = useDispatch();
  const formSubmitStatus = useSelector((state) => state.form.formSubmitStatus);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    policy: false,
    courseTitle: courseTitle,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.policy
    ) {
      toast.error("Please fill all required fields and agree to the policy.");
      return;
    }

    try {
      const resultAction = await dispatch(submitForm(formData));
      if (submitForm.fulfilled.match(resultAction)) {
        toast.success("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          policy: false,
          courseTitle: courseTitle,
        });
      } else {
        toast.error(resultAction.payload || "Submission failed");
      }
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          className="w-full px-3 py-1.5 rounded text-black text-sm focus:outline-none"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="policy"
            name="policy"
            className="accent-white mt-1"
            required
            checked={formData.policy}
            onChange={handleChange}
          />
          <label htmlFor="policy" className="text-sm">
            I agree to the{" "}
            <a href="#" className="underline">
              DIDM Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              privacy policy
            </a>.
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-[#0e3477] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          disabled={formSubmitStatus === "loading"}
        >
          {formSubmitStatus === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormControl;

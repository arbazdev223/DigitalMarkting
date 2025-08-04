import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../store/formSlice";
import { toast } from "react-toastify";
import { handleSendOtp, handleVerifyOtp } from "../utils/otpUtils";

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
  const [otpSent, setOtpSent] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [otpLoading, setOtpLoading] = useState(false);
const [otpCode, setOtpCode] = useState("");
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
        <div className="flex gap-2">
  <input
  type="tel"
  name="phone"
  placeholder="Phone number with country code"
  pattern="^\+?[0-9]{10,15}$"
  title="Enter a valid phone number with country code"
  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none"
  required
  onChange={handleChange}
/>
    <button
      type="button"
      onClick={handleSendOtp}
      className="bg-white text-primary px-4 py-2 text-xs rounded-md"
      disabled={otpLoading}
    >
      {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
    </button>
  </div>
  {otpSent && (
    <div className="flex gap-2">
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
      />
      <button
        type="button"
        onClick={handleVerifyOtp}
        className="bg-green-600 text-white px-4 py-2 rounded-md"
        disabled={otpVerified || otpLoading}
      >
        {otpVerified ? "Verified ✅" : "Verify OTP"}
      </button>
    </div>
  )}
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
          className="w-full bg-white text-primary font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          disabled={formSubmitStatus === "loading"}
        >
          {formSubmitStatus === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormControl;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseOptions } from "../../data";
import { submitForm } from "../store/formSlice";
import { sendOtp, verifyOtp } from "../store/otpSlice";
import { toast } from "react-toastify";

const Office = () => {
  const dispatch = useDispatch();
  const formSubmitStatus = useSelector((state) => state.form.formSubmitStatus);
  const formSubmitError = useSelector((state) => state.form.formSubmitError);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    email: "",
    message: "",
    formHeading: "Contact Form",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setOtpLoading(true);
    const result = await dispatch(sendOtp(formData.phone));
    setOtpLoading(false);

    if (sendOtp.fulfilled.match(result)) {
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } else {
      toast.error(result.payload || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      toast.error("Please enter the OTP");
      return;
    }

    setOtpLoading(true);
    const result = await dispatch(verifyOtp({ phone: formData.phone, otp: otpCode }));
    setOtpLoading(false);

    if (verifyOtp.fulfilled.match(result)) {
      toast.success("Phone verified!");
      setOtpVerified(true);
    } else {
      toast.error(result.payload || "Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify your phone number before submitting the form.");
      return;
    }

    try {
      await dispatch(submitForm(formData)).unwrap();
      toast("Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        course: "",
        email: "",
        message: "",
        formHeading: "Contact Form",
      });
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
    } catch (error) {
      console.error("Form submission failed:", error);
      toast(error || "Failed to submit form");
    }
  };

  return (
    <section className="bg-[#f7f4eb] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6 text-center md:text-left">
            Let's connect with us
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <div className="flex gap-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number with country code"
                pattern="^\+?[0-9]{10,15}$"
                title="Enter a valid phone number with country code"
                className="w-full px-4 py-2 border rounded-md"
                disabled={otpSent}
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-white text-primary px-4 py-2 text-xs border rounded-md"
                disabled={otpLoading || otpSent}
              >
                {otpLoading
                  ? "Sending..."
                  : otpSent
                  ? "OTP Sent"
                  : "Send OTP"}
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
                  className="w-full px-4 py-2 border rounded-md"
                  disabled={otpVerified}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                  disabled={otpVerified || otpLoading}
                >
                  {otpVerified ? "Verified " : "Verify OTP"}
                </button>
              </div>
            )}

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
            >
              <option value="">Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <button
              type="submit"
              disabled={formSubmitStatus === "loading" || !otpVerified}
              className="bg-[#0076FF] hover:bg-primary text-white font-semibold px-6 py-2 rounded-md transition w-fit ml-auto block"
            >
              {formSubmitStatus === "loading" ? "Submitting..." : "Apply Now"}
            </button>

            {formSubmitError && (
              <p className="text-red-500 text-sm">{formSubmitError}</p>
            )}
          </form>
        </div>

        <div className="w-full h-[400px] md:h-auto rounded-xl overflow-hidden shadow-md">
          <iframe
            title="DG Royals Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.659540780507!2d77.19921155806023!3d28.701969666845984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d017fbbfc6e7d%3A0x7f21dd7b64e26c26!2sDG%20Royals%20Best%20Digital%20Marketing%20Graphic%20Designing%20%26%20Web%20Design%20Development%20Institute%20in%20Delhi!5e0!3m2!1sen!2sin!4v1719120341663!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Office;

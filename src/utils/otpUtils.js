import { sendOtp, verifyOtp } from "../store/otpSlice.js";
import { toast } from "react-toastify";

export const handleSendOtp = async (dispatch, phone) => {
  if (!phone) {
    toast.error("Phone number is required");
    return false;
  }

  try {
    const result = await dispatch(sendOtp(phone));

    if (sendOtp.fulfilled.match(result)) {
      toast.success("OTP sent successfully");
      return true;
    } else {
      toast.error(result.payload || "Failed to send OTP");
      return false;
    }
  } catch (err) {
    toast.error("Error sending OTP");
    return false;
  }
};

export const handleVerifyOtp = async (dispatch, phone, otpCode) => {
  if (!otpCode) {
    toast.error("Please enter the OTP");
    return false;
  }

  try {
    const result = await dispatch(verifyOtp({ phone, otp: otpCode }));

    if (verifyOtp.fulfilled.match(result)) {
      toast.success("Phone verified!");
      return true;
    } else {
      toast.error(result.payload || "Invalid OTP");
      return false;
    }
  } catch (err) {
    toast.error("OTP verification failed");
    return false;
  }
};

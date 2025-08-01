import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";
export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/otp/send-otp", { phone });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to send OTP";
      return rejectWithValue(message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/otp/verify-otp", { phone, otp });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "OTP verification failed";
      return rejectWithValue(message);
    }
  }
);
const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    verified: false,
    sent: false,
  },
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.verified = false;
      state.sent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sent = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.sent = true;
        state.success = true;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.sent = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
        state.success = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verified = false;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
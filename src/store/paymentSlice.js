import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/create-order", { amount });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/verify", paymentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Payment verification failed");
    }
  }
);

export const fetchPaymentsByUser = createAsyncThunk(
  "payment/fetchPaymentsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/payment/user/${userId}`);
      return res.data.payments;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch payments");
    }
  }
);

const initialState = {
  order: null,
  verificationResult: null,
  pastPayments: [],

  orderStatus: "idle",
  verificationStatus: "idle",
  fetchStatus: "idle",

  orderError: null,
  verificationError: null,
  fetchError: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.order = null;
      state.verificationResult = null;
      state.pastPayments = [];
      state.orderStatus = "idle";
      state.verificationStatus = "idle";
      state.fetchStatus = "idle";
      state.orderError = null;
      state.verificationError = null;
      state.fetchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.orderStatus = "loading";
        state.orderError = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.order = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.verificationStatus = "loading";
        state.verificationError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verificationStatus = "succeeded";
        state.verificationResult = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verificationStatus = "failed";
        state.verificationError = action.payload;
      })
      .addCase(fetchPaymentsByUser.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchPaymentsByUser.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.pastPayments = action.payload;
      })
      .addCase(fetchPaymentsByUser.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      });
  },
});


export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// Create payment order
export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async ({ amount, userId, cartItems }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/create-order", {
        amount,
        userId,
        cartItems, // ✅ cartItems must include image
      });
      return res.data; // includes orderId, amount, currency
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Order creation failed");
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/payment/verify", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      return res.data.paymentDetails; // ✅ contains image in each course
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Verification failed");
    }
  }
);

// Fetch past payments for profile
export const fetchPaymentsByUser = createAsyncThunk(
  "payment/fetchPaymentsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/payment/user/${userId}`);
      return res.data.payments; // ✅ contains image in each course
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch payments failed");
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
    resetPaymentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.orderStatus = "loading";
        state.orderError = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.order = action.payload; // contains orderId, amount, etc.
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.payload;
      })

      // Verification
      .addCase(verifyPayment.pending, (state) => {
        state.verificationStatus = "loading";
        state.verificationError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verificationStatus = "succeeded";
        state.verificationResult = action.payload; // ✅ includes image in course list
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verificationStatus = "failed";
        state.verificationError = action.payload;
      })

      // Fetch past payments
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

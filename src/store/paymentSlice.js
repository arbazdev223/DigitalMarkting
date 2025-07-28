import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// Create Razorpay order
export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async (
    { amount, userId, cartItems, coupon, discountPercentage },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        amount,
        userId,
        cartItems,
        ...(coupon ? { coupon, discountPercentage } : {}),
      };

      const res = await axiosInstance.post("/payment/create-order", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed"
      );
    }
  }
);

// Verify Razorpay payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (
    {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amountPaid,
      userId,
      cartItems,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/payment/verify", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amountPaid,
        userId,
        cartItems,
      });
      return res.data.paymentDetails;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Verification failed"
      );
    }
  }
);

// Get past payments by user ID
export const fetchPaymentsByUser = createAsyncThunk(
  "payment/fetchPaymentsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/payment/user/${userId}`);
      return res.data.payments;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch payments failed"
      );
    }
  }
);

const initialState = {
  order: null,
  verificationResult: null,
  pastPayments: [],
  orderSummary: null,

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
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    clearOrderSummary: (state) => {
      state.orderSummary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.order = action.payload;
        const { coupon, discountPercentage } = action.meta.arg;

        state.orderSummary = {
          ...action.payload,
          ...(coupon ? { coupon, discountPercentage } : {}),
        };
      })

      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.payload;
      })

      // Verify Payment
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

      // Fetch Past Payments
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

export const { resetPaymentState, setOrderSummary, clearOrderSummary } =
  paymentSlice.actions;

export default paymentSlice.reducer;

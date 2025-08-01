import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config";

// Generate coupon
export const generateCoupon = createAsyncThunk(
  "coupon/generate",
  async (discount) => {
    const res = await axiosInstance.post("/coupons/generate", { discount });
    return res.data;
  }
);

// Validate coupon
export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async ({ code, cartLength }) => {
    const res = await axiosInstance.post("/coupons/validate", { code, cartLength });
    return res.data;
  }
);

// Fetch all coupons
export const fetchCoupons = createAsyncThunk("coupon/fetchAll", async () => {
  const res = await axiosInstance.get("/coupons/list");
  return res.data;
});


// Delete coupon by CODE
export const deleteCoupon = createAsyncThunk("coupon/delete", async (code) => {
  if (!code) throw new Error("Coupon code is required");
  await axiosInstance.delete(`/coupons/delete/${code}`);
  return code;
});


const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    generated: null,
    isValid: false,
    discount: 0,
    message: "",
    allCoupons: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCoupon(state) {
      state.isValid = false;
      state.discount = 0;
      state.message = "";
      state.generated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate
      .addCase(generateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.generated = action.payload;
        state.error = null;
      })
      .addCase(generateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Validate
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.isValid = action.payload.isValid;
        state.discount = action.payload.discountPercentage || 0;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch all
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.allCoupons = action.payload;
        state.error = null;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete
      .addCase(deleteCoupon.pending, (state) => {
  state.loading = true;
})
.addCase(deleteCoupon.fulfilled, (state, action) => {
  state.loading = false;
  state.allCoupons = state.allCoupons.filter(c => c.code !== action.payload);
  state.error = null;
})
.addCase(deleteCoupon.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
});
  },
});

export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;


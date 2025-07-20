import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config"; 
export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/forms/submit", formData);
      return response.data.form;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Submission failed";
      return rejectWithValue(message);
    }
  }
);

export const getAllForms = createAsyncThunk(
  "form/getAllForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/forms/all");
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch forms";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  forms: [],
  formSubmitStatus: "idle",
  formSubmitError: null,
  fetchStatus: "idle",
  fetchError: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    clearFormError(state) {
      state.formSubmitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.formSubmitStatus = "loading";
        state.formSubmitError = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.formSubmitStatus = "succeeded";
        state.forms.push(action.payload);
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.formSubmitStatus = "failed";
        state.formSubmitError = action.payload;
      })
      .addCase(getAllForms.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(getAllForms.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.forms = action.payload;
      })
      .addCase(getAllForms.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload;
      });
  },
});
export const { clearFormError } = formSlice.actions;
export default formSlice.reducer;

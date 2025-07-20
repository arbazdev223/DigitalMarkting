
import { createSlice } from "@reduxjs/toolkit";
const loadCertificates = () => {
  try {
    const data = localStorage.getItem("certificates");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};
const saveCertificates = (certificates) => {
  localStorage.setItem("certificates", JSON.stringify(certificates));
};

const initialState = {
  certificates: loadCertificates(),
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
      saveCertificates(state.certificates);
    },
    setCertificates: (state, action) => {
      state.certificates = action.payload;
      saveCertificates(state.certificates);
    },
    clearCertificates: (state) => {
      state.certificates = [];
      saveCertificates([]);
    },
  },
});

export const { addCertificate, setCertificates, clearCertificates } =
  certificateSlice.actions;

export default certificateSlice.reducer;

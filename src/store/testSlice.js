
import { createSlice } from "@reduxjs/toolkit";

const loadCertificates = () => {
  try {
    const data = localStorage.getItem("certificates");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};
const initialState = {
  score: 0,
  attempts: 3,
  certificates: loadCertificates(),
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    decrementAttempts: (state) => {
      if (state.attempts > 0) {
        state.attempts -= 1;
      }
    },
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
      localStorage.setItem("certificates", JSON.stringify(state.certificates));
    },
    resetTest: (state) => {
      state.score = 0;
    },
  },
});

export const { setScore, decrementAttempts, addCertificate, resetTest } =
  testSlice.actions;

export default testSlice.reducer;

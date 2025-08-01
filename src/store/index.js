import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createTransform from "redux-persist/es/createTransform";
import { encrypt, decrypt } from "../utils/crypto"; 
import authReducer, { loadUser } from "./authSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice";
import testReducer from "./testSlice";
import certificateReducer from "./certificateSlice";
import formReducer from "./formSlice";
import blogReducer from './blogSlice';
import courseStudentReducer from './courseStudentSlice';
import paymentReducer from './paymentSlice';
import quizReducer from './quizSlice';
import couponReducer from './couponSlice';
import otpReducer from './otpSlice';
const authTransform = createTransform(
  (inboundState) => ({
    ...inboundState,
    token: inboundState.token ? encrypt(inboundState.token) : null,
  }),
  (outboundState) => ({
    ...outboundState,
    token: outboundState.token ? decrypt(outboundState.token) : null,
  }),
  { whitelist: ["auth"] }
);

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], 
  transforms: [authTransform],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: cartReducer,
  course: courseReducer,
  test: testReducer,
  certificate: certificateReducer,
  form: formReducer,
  blog:blogReducer,
  courseStudent:courseStudentReducer,
  payment: paymentReducer,
  // quiz:quizReducer,
  coupon: couponReducer,
  otp: otpReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export const initAuth = () => {
  const state = store.getState();
  if (state.auth?.token) {
    store.dispatch(loadUser());
  }
};
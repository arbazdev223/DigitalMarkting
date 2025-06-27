import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice";
import testReducer from "./testSlice";
import certificateReducer from "./certificateSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    course: courseReducer, 
    test:testReducer,
    certificate:certificateReducer, 
  },
});

export default store;

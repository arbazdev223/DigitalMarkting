import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    course: courseReducer, 
  },
});

export default store;

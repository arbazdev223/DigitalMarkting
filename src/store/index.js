import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import courseReducer from "./courseSlice";
import testReducer from "./testSlice";
import certificateReducer from "./certificateSlice";
import formReducer from "./formSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  course: courseReducer,
  test: testReducer,
  certificate: certificateReducer,
  form: formReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "course_cart";

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
};

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error("Error loading cart:", err);
    return [];
  }
};

const updateTotalQuantity = (cart) => cart.length;

const initialState = {
  cart: loadCartFromStorage(),
  totalQuantity: 0,
};

initialState.totalQuantity = updateTotalQuantity(initialState.cart);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const course = action.payload;
      const exists = state.cart.find((item) => item.id === course.id);

      if (!exists) {
        state.cart.push({ ...course, quantity: 1 });
        state.totalQuantity = updateTotalQuantity(state.cart);
        saveCartToStorage(state.cart);
      }
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalQuantity = updateTotalQuantity(state.cart);
      saveCartToStorage(state.cart);
    },

    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
      saveCartToStorage([]);
    },

    getDataFromLocalStorage(state) {
      const storedCart = loadCartFromStorage();
      if (Array.isArray(storedCart)) {
        state.cart = storedCart;
        state.totalQuantity = updateTotalQuantity(storedCart);
      }
    },
  },
});

export const selectCartItems = (state) => state.cart.cart;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;

export const selectCartTotalOriginal = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.price, 0);

export const selectCartTotalSale = (state) =>
  state.cart.cart.reduce((sum, item) => sum + (item.salePrice || item.price), 0);

export const selectCartDiscount = (state) => {
  const original = selectCartTotalOriginal(state);
  const sale = selectCartTotalSale(state);
  return original ? Math.round(((original - sale) / original) * 100) : 0;
};

export const {
  addToCart,
  removeFromCart,
  clearCart,
  getDataFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
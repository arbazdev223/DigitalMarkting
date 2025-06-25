import { createSlice } from "@reduxjs/toolkit";
const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  cart: loadCartFromStorage(), 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          salePrice: product.salePrice,
          quantity: 1,
        };
        state.cart.push(newItem);
      }

      saveCartToStorage(state.cart);
    },
    incrementQuantity(state, action) {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.cart);
      }
    },
    decrementQuantity(state, action) {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
        saveCartToStorage(state.cart);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.cart);
    },

    clearCart(state) {
      state.cart = [];
      saveCartToStorage([]);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

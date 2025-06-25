import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  removeFromCart,
} from "../store/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price),
    0
  );

  const totalOriginalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const discount = totalOriginalPrice
    ? Math.round(((totalOriginalPrice - totalPrice) / totalOriginalPrice) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex-1 space-y-6">
          <p className="text-lg font-medium">
            {cart.length} Course{cart.length > 1 ? "s" : ""} in Cart
          </p>

          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-4 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt="course"
                  className="w-full md:w-40 h-auto rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-[#0e3477] space-x-4">
                      <button
                        className="hover:underline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#0e3477]">
                        ₹{item.salePrice || item.price}
                      </p>
                      <p className="line-through text-sm text-gray-500">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full lg:w-80 border p-5 rounded shadow-md h-[200px] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Total:</h2>
            <p className="text-2xl font-bold text-[#0e3477]">₹{totalPrice}</p>
            <p className="text-sm line-through text-gray-500">
              ₹{totalOriginalPrice}
            </p>
            <p className="text-sm text-green-600 mb-4">{discount}% off</p>
          </div>

          <div>
            <button className="w-full bg-[#0e3477] hover:bg-[#0e3477] text-white py-2 rounded font-semibold mb-3 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

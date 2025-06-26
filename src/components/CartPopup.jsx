import React from "react";
import { Link } from "react-router-dom";
import { removeFromCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartTotalOriginal,
  selectCartTotalSale,
  selectCartDiscount,
} from "../store/cartSlice";



const CartPopup = ({ cartItems = [], isOpen, onClose }) => {
  if (!isOpen) return null;
const totalOriginal = useSelector(selectCartTotalOriginal);
const totalSale = useSelector(selectCartTotalSale);
const discount = useSelector(selectCartDiscount);
 
   const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="absolute z-50 right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border">
      <div className="max-h-64 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border-b">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.instructor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-black">
                    ₹{item.salePrice}
                  </span>
                  <span className="text-xs line-through text-gray-400">
                    ₹{item.price}
                  </span>
                  <div className="text-xs text-[#0e3477] space-x-4">
                      <button
                        className="hover:underline"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="px-4 py-3 flex justify-between items-center border-t">
          <div>
            <span className="font-semibold text-black">
              Total: ₹{totalSale}
            </span>
            <span className="text-xs text-gray-400 ml-2 line-through">
              ₹{totalOriginal}
            </span>
          </div>
          <Link
            to="/cart"
            className="bg-[#0e3477] hover:bg-[#092653] text-white text-xs px-3 py-2 rounded font-semibold"
            onClick={onClose}
          >
            Go to Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPopup;

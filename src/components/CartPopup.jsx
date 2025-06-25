

import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartPopup = ({ cartItems }) => {
  const totalSale = cartItems.reduce((sum, item) => sum + item.salePrice, 0);
  const totalOriginal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative group">
      <div className="cursor-pointer relative">
        <ShoppingCart className="text-gray-600" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartItems.length}
          </span>
        )}
      </div>
      <div className="absolute z-50 right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
        <div className="max-h-64 overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border-b">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</p>
                <p className="text-xs text-gray-500">{item.instructor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-black">₹{item.salePrice}</span>
                  <span className="text-xs line-through text-gray-400">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 flex justify-between items-center border-t">
          <div>
            <span className="font-semibold text-black">Total: ₹{totalSale}</span>
            <span className="text-xs text-gray-400 ml-2 line-through">₹{totalOriginal}</span>
          </div>
          <Link
            to="/cart"
            className="bg-[#0e3477] hover:bg-[#092653] text-white text-xs px-3 py-2 rounded font-semibold"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

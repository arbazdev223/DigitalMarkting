import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage, selectCartDiscount, selectCartTotalOriginal, selectCartTotalSale } from "../store/cartSlice";
import AuthFormCard from "../components/AuthFormCard";
import { handleSignin, handleSignup } from "../store/authSlice";
import PaymentForm from "../components/PaymentForm";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("signup");
  
    const onSignup = (e) => {
      e.preventDefault();
      dispatch(handleSignup());
    };
  
    const onSignin = (e) => {
      e.preventDefault();
      const email = e.target.elements[0].value;
      const password = e.target.elements[1].value;
      dispatch(handleSignin(email, password));
    };
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
const totalOriginalPrice = useSelector(selectCartTotalOriginal);
const totalPrice = useSelector(selectCartTotalSale);
const discount = useSelector(selectCartDiscount);
  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-12 py-10 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-[#444444] mb-3 ">
          Checkout
        </h1>
     {user ? (
  <div className="mb-4"> 
    <div className="p-4 border-b rounded-md text-gray-700">
   <PaymentForm />
    </div>
  </div>
) : (
  <AuthFormCard
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    handleSignup={onSignup}
    handleSignin={onSignin}
  />
)}

      <div className="flex justify-start w-full items-center mt-4 gap-3 border-b pb-2 mb-2">
  <h4 className="text-md font-medium text-[#444444]">Order Details:</h4>
  <p className="text-sm text-gray-600">
    ({cart.length} Course{cart.length > 1 ? "s" : ""})
  </p>

</div>
  <div className="flex-1 space-y-6">

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
                  className="w-full md:w-40 h-25 rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-[#0e3477] space-x-4">
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
      </div>

      <div className="w-full md:w-1/4 bg-white h-[200px]  shadow-md p-4 rounded-md">
        <h4 className="text-xl font-bold border-b pb-3 text-[#444444] text-center mb-4">
          Order Summary
        </h4>

        {cart.length === 0 ? (
          <div className="text-gray-500 text-center">Your cart is empty.</div>
        ) : (
     <div className="space-y-4">
  <div className=" pb-3 space-y-2">
    <div className="flex justify-between">
      <p className="text-sm text-gray-600">Original Price</p>
      <p className="line-through text-sm text-gray-500">₹{totalOriginalPrice}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-sm flex text-gray-600">Discounted Price({discount > 0 && (
      <div className="flex justify-between text-sm text-green-600">
        <p>{discount}% off</p>
      </div>
    )})</p>
      <p className="text-sm font-medium text-[#0e3477]">₹{totalPrice}</p>
    </div>
  </div>

  <div className="border-t pt-4 space-y-2">
    <div className="flex justify-between">
      <p className="font-medium">Total ({cart.length} Course{cart.length > 1 ? "s" : ""})</p>
      <p className="font-medium">₹{totalPrice}</p>
    </div>

    
  </div>
</div>

        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

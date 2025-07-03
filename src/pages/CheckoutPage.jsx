import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  selectCartDiscount,
  selectCartTotalOriginal,
  selectCartTotalSale
} from "../store/cartSlice";
import { signup, signin } from "../store/authSlice";
import { createPaymentOrder, verifyPayment } from "../store/paymentSlice";
import { useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard";
import { CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const totalOriginalPrice = useSelector(selectCartTotalOriginal);
  const totalPrice = useSelector(selectCartTotalSale);
  const discount = useSelector(selectCartDiscount);

  const orderStatus = useSelector((state) => state.orderStatus);
  const orderError = useSelector((state) => state.orderError);
  const verificationError = useSelector((state) => state.verificationError);

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [dispatch]);

  const onSignup = (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const password = e.target.elements[2].value;
    const confirmPassword = e.target.elements[3].value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(signup({ name, email, password }));
  };

  const onSignin = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    dispatch(signin({ email, password }));
  };

  const handlePayment = async () => {
    try {
      const res = await dispatch(createPaymentOrder(totalPrice)).unwrap();
      const { orderId, amount, currency } = res;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: orderId,
        name: "Course Purchase",
        description: "Payment for courses",
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amountPaid: totalPrice,
            courseIds: cart.map((item) => item.id),
            userId: user._id,
            paymentMethod,
          };
          await dispatch(verifyPayment(paymentData)).unwrap();
          navigate("/profile");
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#0e3477" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error.message || "Payment failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-12 py-10 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-[#444444] mb-3">Checkout</h1>
          {user && (
        <h4 className="text-sm sm:text-md flex border-b  items-center space-x-2 border-t py-4 font-medium text-[#444444]">
          Account Details:
          <span className="text-xs text-gray-600">({user.email})</span>
          <CheckCircle className="text-green-500 w-4 h-4" />
        </h4>
      )}
        {user ? (
          <div className="mb-4 w-full p-4 border-b rounded-md text-gray-700 space-y-3">
            <label className="block text-sm font-medium mb-1">Select Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Netbanking">Netbanking</option>
              <option value="Wallet">Wallet</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ) : (
          <AuthFormCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSignup={onSignup}
            handleSignin={onSignin}
          />
        )}

        <div className="flex justify-start items-center mt-4 gap-3 border-b pb-2 mb-2">
          <h4 className="text-md font-medium text-[#444444]">Order Details:</h4>
          <p className="text-sm text-gray-600">({cart.length} Course{cart.length > 1 ? "s" : ""})</p>
        </div>

        <div className="flex-1 space-y-6">
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-3">
                <img src={item.image} alt="course" className="w-full md:w-40 h-25 rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{item.instructor}</p>
                  <div className="flex justify-between mt-3">
                    <div />
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#0e3477]">₹{item.salePrice || item.price}</p>
                      <p className="line-through text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full md:w-1/4 bg-white shadow-md p-4 rounded-md md:h-[250px] flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold border-b pb-3 text-[#444444] text-center mb-4">Order Summary</h4>
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              <div className="pb-3 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Original Price</p>
                  <p className="line-through text-sm text-gray-500">₹{totalOriginalPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm flex text-gray-600">
                    Discounted Price
                    {discount > 0 && <span className="text-green-600 ml-1">{discount}% off</span>}
                  </p>
                  <p className="text-sm font-medium text-[#0e3477]">₹{totalPrice}</p>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <p className="font-medium">Total ({cart.length} Course{cart.length > 1 ? "s" : ""})</p>
                <p className="font-medium">₹{totalPrice}</p>
              </div>
            </div>
          )}
        </div>

        {user && cart.length > 0 && (
          <button
            onClick={handlePayment}
            disabled={orderStatus === "loading"}
            className="mt-4 w-full bg-[#0e3477] text-white px-4 py-1 rounded hover:bg-[#0c2d63]"
          >
            {orderStatus === "loading" ? "Processing..." : `Pay ₹${totalPrice}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

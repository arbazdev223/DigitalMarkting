import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import AuthFormCard from "../components/AuthFormCard";
import {
  getDataFromLocalStorage,
  selectCartDiscount,
  selectCartTotalOriginal,
  selectCartTotalSale,
  clearCart,
} from "../store/cartSlice";
import { signup, signin } from "../store/authSlice";
import {
  createPaymentOrder,
  verifyPayment,
  resetPaymentState,
} from "../store/paymentSlice";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const totalOriginalPrice = useSelector(selectCartTotalOriginal);
  const totalPrice = useSelector(selectCartTotalSale);
  const discount = useSelector(selectCartDiscount);
  const orderStatus = useSelector((state) => state.payment.orderStatus);

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, [dispatch]);

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject("Razorpay SDK failed to load");
      document.body.appendChild(script);
    });

  const onSignup = (e) => {
    e.preventDefault();
    const [name, email, password, confirmPassword] = Array.from(
      e.target.elements
    ).map((el) => el.value);
    if (password !== confirmPassword) return alert("Passwords do not match");
    dispatch(signup({ name, email, password }));
  };

  const onSignin = (e) => {
    e.preventDefault();
    const [email, password] = Array.from(e.target.elements).map(
      (el) => el.value
    );
    dispatch(signin({ email, password }));
  };

  const handlePayment = async () => {
    try {
      await loadRazorpayScript();

      const paymentRes = await dispatch(
        createPaymentOrder({
          amount: totalPrice,
          userId: user._id,
          cartItems: cart,
        })
      ).unwrap();

      const { orderId, amount, currency } = paymentRes;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: orderId,
        name: "BANARAS DIGITAL SOLUTION",
        description: "Course Purchase",
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amountPaid: totalPrice,
            userId: user._id,
            cartItems: cart,
          };

          const verifyRes = await dispatch(verifyPayment(paymentData)).unwrap();

          setOrderSummary({
            username: verifyRes?.username,
            email: verifyRes?.email,
            orderId: verifyRes?.orderId,
            amountPaid: verifyRes?.amountPaid,
            courses: verifyRes?.courses, 
          });
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("rzp_")) {
      localStorage.removeItem(key);
    }
  });
          setModalVisible(true);
          dispatch(resetPaymentState());
          dispatch(clearCart());
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#0e3477" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert(err.message || "Payment failed");
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigate("/profile");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-12 py-10 flex flex-col md:flex-row gap-6 relative">
      {/* Left */}
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-[#444444] mb-3">Checkout</h1>

        {user ? (
          <h4 className="text-sm sm:text-md flex border-b items-center space-x-2 border-t py-4 font-medium text-[#444444]">
            Account Details:
            <span className="text-xs text-gray-600">({user.email})</span>
            <CheckCircle className="text-green-500 w-4 h-4" />
          </h4>
        ) : (
          <AuthFormCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSignup={onSignup}
            handleSignin={onSignin}
          />
        )}

        {/* Order Items */}
        <div className="mt-4">
          <h4 className="text-md font-medium text-[#444444]">Order Details:</h4>
          <div className="space-y-6 mt-3">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-4 border-b pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-40 h-25 rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.instructor}
                    </p>
                    <div className="text-right mt-2">
                      <p className="text-lg font-semibold text-primary">
                        ₹{item.salePrice || item.price}
                      </p>
                      <p className="line-through text-sm text-gray-500">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/4 h-56 bg-white shadow-md p-4 rounded-md flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold border-b pb-3 text-[#444444] text-center mb-4">
            Order Summary
          </h4>
          {cart.length > 0 && (
            <div className="space-y-4">
              <div className="pb-3 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Original Price</p>
                  <p className="line-through text-sm text-gray-500">
                    ₹{totalOriginalPrice}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-green-600">{discount}%</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-medium">₹{totalPrice}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {user && cart.length > 0 && (
          <button
            onClick={handlePayment}
            disabled={orderStatus === "loading"}
            className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-[#0c2d63]"
          >
            {orderStatus === "loading" ? "Processing..." : `Pay ₹${totalPrice}`}
          </button>
        )}
      </div>

      {/* Success Modal */}
      {modalVisible && orderSummary && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-primary text-center">
              Payment Successful 🎉
            </h2>

            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>User:</strong> {orderSummary.username}</p>
              <p><strong>Email:</strong> {orderSummary.email}</p>
              <p><strong>Order ID:</strong> {orderSummary.orderId}</p>
              <p><strong>Amount Paid:</strong> ₹{orderSummary.amountPaid}</p>
            </div>

            <div>
              <h3 className="text-md font-semibold text-primary mt-2">Courses:</h3>
              <ul className="list-none text-sm text-gray-700 mt-2 space-y-3">
                {orderSummary.courses.map((course) => (
                  <li
                    key={course.id}
                    className="flex items-center gap-3 bg-gray-100 p-2 rounded shadow-sm"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <span className="font-medium">{course.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleModalClose}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-[#0c2d63] w-full"
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

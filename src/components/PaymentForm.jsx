import React from "react";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const PaymentForm = () => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice); // or compute total

  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load payment SDK");
      return;
    }

    try {
      const orderRes = await axiosInstance.post("/payment/create-order", {
        amount: totalPrice * 100, 
      });

      const { order } = orderRes.data;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: order.currency,
        name: "Your App / Company Name",
        description: "Course Payment",
        order_id: order.id,
        handler: function (response) {

          console.log("Payment success:", response);
          navigate("/profile");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#0e3477",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="space-y-4">
      {user && (
        <h4 className="text-sm sm:text-md flex items-center space-x-2 border-t pt-4 font-medium text-[#444444]">
          Account Details:
          <span className="text-xs text-gray-600">({user.email})</span>
          <CheckCircle className="text-green-500 w-4 h-4" />
        </h4>
      )}
      <h2 className="text-xl font-semibold text-[#0e3477] border-t pt-4">
        Select Payment Method
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block mb-1 text-sm font-medium text-[#444444]">
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            className="w-full md:w-[80%] px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-1 text-sm font-medium text-[#444444]">
            State
          </label>
          <input
            id="state"
            type="text"
            placeholder="State"
            className="w-full md:w-[80%] px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
      </form>
      {user && cart.length > 0 && (
        <button
          onClick={handlePayment}
          className="mt-4 bg-[#0e3477] text-white px-6 py-2 rounded hover:bg-[#092653]"
        >
          Pay ₹{totalPrice}
        </button>
      )}
    </div>
  );
};

export default PaymentForm;

import React from "react";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const user = useSelector((state) => state.auth.user);

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
      <form className="grid grid-cols-1  md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block mb-1 text-sm font-medium text-[#444444]">
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            className="w-full md:w-[80%] px-4 py-2 border  rounded-md focus:outline-none"
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
    </div>
  );
};

export default PaymentForm;

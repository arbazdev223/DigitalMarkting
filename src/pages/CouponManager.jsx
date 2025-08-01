import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateCoupon,
  validateCoupon,
  fetchCoupons,
  resetCoupon,
  deleteCoupon,
} from "../store/couponSlice";

export default function CouponManager() {
  const [discount, setDiscount] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [cartLength, setCartLength] = useState(1);

  const dispatch = useDispatch();
  const {
    generated,
    isValid,
    discount: appliedDiscount,
    message,
    allCoupons,
    loading,
    error,
  } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleGenerate = async () => {
    if (!discount || Number(discount) < 1 || Number(discount) > 100) {
      alert("Enter a valid discount between 1% and 100%");
      return;
    }

    try {
      await dispatch(generateCoupon(Number(discount))).unwrap();
      setDiscount("");
      dispatch(fetchCoupons());
    } catch (err) {
      console.error("Failed to generate coupon:", err);
    }
  };

  const handleValidate = async () => {
    if (!couponInput.trim()) return;
    try {
      await dispatch(validateCoupon({ code: couponInput.trim(), cartLength }));
    } catch (err) {
      console.error("Coupon validation failed:", err);
    }
  };

const handleDelete = async (code) => {
  if (!code || typeof code !== "string") {
    console.error("❌ Invalid code for deletion:", code);
    return;
  }

  if (!window.confirm(`Delete coupon "${code}"?`)) return;

  try {
    await dispatch(deleteCoupon(code)).unwrap();  
    dispatch(fetchCoupons());                   
  } catch (err) {
    console.error("Delete failed:", err);
    alert("❌ Delete failed. Try again.");
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ Coupon Manager</h1>

      {/* Generate Coupon */}
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Enter discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border px-4 py-2 rounded w-60"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Coupon"}
        </button>
        {generated && (
          <p className="text-green-600 mt-2">
            ✅ Coupon Generated: <strong>{generated.code}</strong>
          </p>
        )}
      </div>

      {/* Validate Coupon */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter coupon to validate"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className="border px-4 py-2 rounded w-60"
        />
        <input
          type="number"
          placeholder="Cart items"
          value={cartLength}
          onChange={(e) => setCartLength(Number(e.target.value))}
          className="border px-4 py-2 rounded w-40 ml-2"
        />
        <button
          onClick={handleValidate}
          className="bg-green-600 text-white px-4 py-2 rounded ml-2 hover:bg-green-700"
        >
          Validate
        </button>
        {message && (
          <p
            className={`mt-2 font-medium ${
              isValid ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Coupon Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🗂️ Active Coupons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Code</th>
                <th className="px-4 py-2 border">Discount</th>
                <th className="px-4 py-2 border">Expires At</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allCoupons.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                    No active coupons
                  </td>
                </tr>
              ) : (
allCoupons.map((c, idx) => (
  <tr key={c.code} className="hover:bg-gray-50">
    <td className="px-4 py-2 border">{idx + 1}</td>
    <td className="px-4 py-2 border font-mono">{c.code}</td>
    <td className="px-4 py-2 border">{c.discount}%</td>
    <td className="px-4 py-2 border">{new Date(c.expiresAt).toLocaleString()}</td>
    <td className="px-4 py-2 border text-center">
      <button
        onClick={() => handleDelete(c.code)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </td>
  </tr>
))

              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


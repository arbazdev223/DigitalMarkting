import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsByUser } from "../store/paymentSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const pastPayments = useSelector((state) => state.payment.pastPayments);
  const loading = useSelector((state) => state.payment.fetchStatus === "loading");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchPaymentsByUser(user._id));
    }
  }, [dispatch, user]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = pastPayments.flatMap(p => 
    p.courses.map(course => ({
      ...course,
      paymentMethod: p.paymentMethod,
      orderId: p.orderId,
    }))
  ).slice(startIndex, startIndex + itemsPerPage);

  const totalCourses = pastPayments.reduce((acc, p) => acc + p.courses.length, 0);
  const totalPages = Math.ceil(totalCourses / itemsPerPage);

  return (
    <div className="mt-10 p-4 border rounded shadow bg-white">
      {loading ? (
        <p>Loading payment history...</p>
      ) : currentCourses.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f5f9] text-primary">
                <th className="p-2 border">S.No.</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Method</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{startIndex + index + 1}</td>
                  <td className="p-2 border">
                    <img src={course.image} alt={course.title} className="w-14 h-14 object-cover rounded" />
                  </td>
                  <td className="p-2 border">{course.title}</td>
                  <td className="p-2 border">₹{course.price}</td>
                  <td className="p-2 border capitalize">{course.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === num
                      ? "bg-primary text-white"
                      : "bg-white text-primary border-primary"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentForm;

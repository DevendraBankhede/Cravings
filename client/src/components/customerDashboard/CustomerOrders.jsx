import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import api from "../../config/Apiconfig";
import toast from "react-hot-toast";

const CustomerOrders = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/customer/all-orders");
      // console.log("Fetched orders:", res.data); // Log the fetched orders for debugging
      setOrders(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during fetching orders. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (isLoading) {
    return <Loader height="100%" width="100%" />;
  }

  // console.log(orders);

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Restaurant</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-(--color-secondary)">
              <td
                colSpan="5"
                className="text-center py-4 text-(--color-neutral)"
              >
                No orders yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
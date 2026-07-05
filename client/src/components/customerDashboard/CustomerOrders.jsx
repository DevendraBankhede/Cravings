import React from "react";

const CustomerOrders = () => {
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
              <td colSpan="5" className="text-center py-4 text-(--color-neutral)">
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
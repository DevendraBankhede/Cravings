import React from "react";

const CustomerOverview = () => {
  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <p className="text-(--color-neutral) text-sm">Total Orders</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <p className="text-(--color-neutral) text-sm">Total Spent</p>
          <p className="text-3xl font-bold">$245</p>
        </div>
      </div>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Recent Orders</h3>
        <p className="text-(--color-neutral) text-sm">No recent orders</p>
      </div>
    </div>
  );
};

export default CustomerOverview;
import React from "react";

const RestaurantAbout = ({ description }) => (
  <div className="bg-(--color-base-100) rounded-2xl p-4 shadow-sm">
    <h2 className="text-sm font-bold text-(--color-primary) mb-2 uppercase tracking-wide">
      About
    </h2>
    <p className="text-sm text-(--color-base-content) leading-relaxed">
      {description || "No description available."}
    </p>
  </div>
);

export default RestaurantAbout;
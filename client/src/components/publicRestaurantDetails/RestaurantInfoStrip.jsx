import React from "react";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";

const RestaurantInfoStrip = ({ restaurant }) => {
  const { contactDetails, servingHours, address, city, state } = restaurant;

  return (
    <div className="bg-(--color-primary) text-(--color-primary-content)">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex flex-wrap gap-4 text-sm">
        {(city || address) && (
          <span className="flex items-center gap-1.5">
            <IoLocationOutline className="shrink-0" />
            {[address, city, state].filter(Boolean).join(", ")}
          </span>
        )}
        {servingHours?.openingTime && (
          <span className="flex items-center gap-1.5">
            <IoTimeOutline className="shrink-0" />
            {servingHours.openingTime} – {servingHours.closingTime}
          </span>
        )}
        {contactDetails?.phone && (
          <span className="flex items-center gap-1.5">
            <IoCallOutline className="shrink-0" />
            {contactDetails.phone}
          </span>
        )}
        {contactDetails?.email && (
          <span className="flex items-center gap-1.5">
            <IoMailOutline className="shrink-0" />
            {contactDetails.email}
          </span>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfoStrip;
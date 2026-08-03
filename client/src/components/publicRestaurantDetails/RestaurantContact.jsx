import React from "react";
import {
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";

const RestaurantContact = ({ restaurant }) => {
  const { contactDetails, address, city, state, pinCode, country } = restaurant;
  const hasContact = contactDetails?.phone || contactDetails?.email;
  const hasAddress = address || city;

  if (!hasContact && !hasAddress) return null;

  return (
    <div className="bg-(--color-base-100) rounded-2xl p-4 shadow-sm space-y-2.5">
      <h2 className="text-sm font-bold text-(--color-primary) mb-2 uppercase tracking-wide">
        Contact & Location
      </h2>
      {contactDetails?.phone && (
        <div className="flex items-center gap-2 text-sm text-(--color-base-content)">
          <IoCallOutline className="text-(--color-primary) shrink-0" />
          {contactDetails.phone}
        </div>
      )}
      {contactDetails?.email && (
        <div className="flex items-center gap-2 text-sm text-(--color-base-content)">
          <IoMailOutline className="text-(--color-primary) shrink-0" />
          {contactDetails.email}
        </div>
      )}
      {hasAddress && (
        <div className="flex items-start gap-2 text-sm text-(--color-base-content)">
          <IoLocationOutline className="text-(--color-primary) shrink-0 mt-0.5" />
          <span>
            {[address, city, state, pinCode, country].filter(Boolean).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default RestaurantContact;
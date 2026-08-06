import React from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { platformIcon } from "./helpers";

const RestaurantSocialLinks = ({ socialMediaLinks }) => {
  if (!socialMediaLinks?.length) return null;

  return (
    <div className="bg-(--color-base-100) rounded-2xl p-4 shadow-sm">
      <h2 className="text-sm font-bold text-(--color-primary) mb-3 uppercase tracking-wide">
        Social Media
      </h2>
      <div className="flex flex-col gap-2">
        {socialMediaLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-(--color-primary) hover:underline"
          >
            <span>{platformIcon(link.platform)}</span>
            <span className="font-medium">{link.platform}</span>
            <IoGlobeOutline className="ml-auto text-(--color-secondary) text-xs" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSocialLinks;
import React from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoCartOutline, IoStar } from "react-icons/io5";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import { foodTypeDot } from "./helpers";

const MenuItemCard = ({ item }) => {
  const isUnavailable = item.status === "unavailable";
  const itemCount = 0; // Placeholder for item count in cart

  return (
    <div
      className={`bg-(--color-base-200) rounded-xl overflow-hidden border border-(--color-base-300) transition ${
        isUnavailable
          ? "grayscale opacity-60 cursor-not-allowed"
          : "hover:shadow-md cursor-pointer"
      }`}
    >
      {/* Image */}
      <div className="relative h-36 bg-(--color-base-300)">
        {item.image?.url ? (
          <img
            src={item.image.url}
            alt={item.itemName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-(--color-secondary)">
            <MdOutlineRestaurantMenu className="text-4xl opacity-30" />
          </div>
        )}

        {/* Veg / Non-Veg dot */}
        <span
          className={`absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-white ${foodTypeDot(item.foodType)}`}
          title={item.foodType}
        />

        {/* Unavailable overlay */}
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/60 text-white tracking-wide">
              Unavailable
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {item.isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500 text-white leading-none">
              NEW
            </span>
          )}
          {item.isTopRated && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 leading-none flex items-center gap-0.5">
              <IoStar className="text-[9px]" /> Top
            </span>
          )}
          {item.isRecommended && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-(--color-primary) text-white leading-none">
              Chef's Pick
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col justify-between h-32">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-sm font-semibold text-(--color-base-content) leading-tight">
            {item.itemName}
          </h3>
          <span className="shrink-0 text-sm font-bold text-(--color-primary)">
            ₹{item.price}
          </span>
        </div>
        <p
          className="text-xs text-(--color-secondary) line-clamp-2 leading-relaxed"
          title={item.description.length > 90 ? item.description : false}
        >
          {item.description.length > 90
            ? item.description.slice(0, 90) + "..."
            : item.description}
        </p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-(--color-base-300)">
          <span className="text-[10px] text-(--color-secondary) bg-(--color-base-300) px-1.5 py-0.5 rounded-full">
            {item.category}
          </span>

          {itemCount > 0 ? (
            <div className="flex items-center border border-(--color-base-300) rounded-full divide-(--color-base-300) divide-x">
              <button className="px-1.5 py-0.5  text-(--color-primary) rounded-l-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition">
                <IoIosRemoveCircleOutline className="text-lg" />
              </button>
              <div className="text-(--color-primary) flex justify-center items-center text-sm font-semibold px-1.5 py-0.5">
                {itemCount}
              </div>
              <button className="px-1.5 py-0.5  text-(--color-primary) rounded-r-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition">
                <IoIosAddCircleOutline className="text-lg" />
              </button>
            </div>
          ) : (
            <button className="text-sm font-bold px-2 py-1 rounded-full border border-(--color-primary) text-(--color-primary) flex items-center gap-1 hover:bg-(--color-primary) hover:text-(--color-primary-content) transition">
              <IoCartOutline className="text-lg" />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
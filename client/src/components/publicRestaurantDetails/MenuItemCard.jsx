import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoCartOutline, IoStar, IoStorefrontOutline } from "react-icons/io5";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import { foodTypeDot } from "./helpers";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const MenuItemCard = ({ item, restaurantId, restaurantName }) => {
  const { isLogin, user, role } = useAuth();
  const { addItem, increaseItem, decreaseItem, getItemQuantity, replaceCart } =
    useCart();
  const [showConflictModal, setShowConflictModal] = useState(false);

  const isUnavailable = item.status === "unavailable";
  const itemCount =
    isLogin && user && role === "customer" ? getItemQuantity(item._id) : 0;

  const handleAdd = () => {
    if (!isLogin || !user || role !== "customer") {
      toast.error("Please log as Customer to add items to your cart.");
      return;
    }
    if (isUnavailable) return;
    const result = addItem(item, restaurantId, restaurantName);
    if (result === "different_restaurant") {
      setShowConflictModal(true);
    }
  };

  const handleReplaceCart = () => {
    replaceCart(item, restaurantId, restaurantName);
    setShowConflictModal(false);
  };

  return (
    <>
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
                <button
                  onClick={() => decreaseItem(item._id)}
                  className="px-1.5 py-0.5 text-(--color-primary) rounded-l-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition"
                >
                  <IoIosRemoveCircleOutline className="text-lg" />
                </button>
                <div className="text-(--color-primary) flex justify-center items-center text-sm font-semibold px-1.5 py-0.5">
                  {itemCount}
                </div>
                <button
                  onClick={() => increaseItem(item._id)}
                  className="px-1.5 py-0.5 text-(--color-primary) rounded-r-full hover:bg-(--color-primary) hover:text-(--color-primary-content) transition"
                >
                  <IoIosAddCircleOutline className="text-lg" />
                </button>
              </div>
            ) : (
              <button
                disabled={isUnavailable}
                onClick={handleAdd}
                className="text-sm font-bold px-2 py-1 rounded-full border border-(--color-primary) text-(--color-primary) flex items-center gap-1 hover:bg-(--color-primary) hover:text-(--color-primary-content) transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoCartOutline className="text-lg" />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Different Restaurant Conflict Modal */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-(--color-base-100) rounded-2xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mx-auto mb-4">
              <IoStorefrontOutline className="text-2xl text-orange-500" />
            </div>
            <h3 className="text-base font-bold text-(--color-base-content) text-center mb-2">
              Start a new cart?
            </h3>
            <p className="text-sm text-(--color-secondary) text-center mb-5">
              Your cart already has items from{" "}
              <span className="font-semibold text-(--color-base-content)">
                another restaurant
              </span>
              . You can only order from one restaurant at a time.
              <br />
              <br />
              Do you want to clear your cart and add items from{" "}
              <span className="font-semibold text-(--color-base-content)">
                {restaurantName}
              </span>
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConflictModal(false)}
                className="flex-1 py-2 rounded-xl border border-(--color-base-300) text-sm font-semibold text-(--color-base-content) hover:bg-(--color-base-200) transition"
              >
                Keep existing
              </button>
              <button
                onClick={handleReplaceCart}
                className="flex-1 py-2 rounded-xl bg-(--color-primary) text-(--color-primary-content) text-sm font-semibold hover:opacity-90 transition"
              >
                Start new cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
import React, { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { foodTypeDot } from "./helpers";
import MenuItemCard from "./MenuItemCard";

const RestaurantMenu = ({ menuItems, restaurantId, restaurantName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFoodType, setActiveFoodType] = useState("All");

  // Exclude discontinued + deleted; keep available & unavailable
  const activeItems = useMemo(
    () =>
      (menuItems || []).filter(
        (item) => !item.isDeleted && item.status !== "discontinued",
      ),
    [menuItems],
  );

  const categories = useMemo(() => {
    const cats = [...new Set(activeItems.map((i) => i.category))];
    return ["All", ...cats];
  }, [activeItems]);

  const foodTypes = useMemo(() => {
    const types = [...new Set(activeItems.map((i) => i.foodType))];
    return ["All", ...types];
  }, [activeItems]);

  const filteredItems = useMemo(() => {
    return activeItems.filter((item) => {
      const matchSearch =
        !searchQuery ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchFoodType =
        activeFoodType === "All" || item.foodType === activeFoodType;
      return matchSearch && matchCategory && matchFoodType;
    });
  }, [activeItems, searchQuery, activeCategory, activeFoodType]);

  return (
    <div className="bg-(--color-base-100) rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-(--color-base-300)">
        <h2 className="text-base font-bold text-(--color-primary) mb-3 flex items-center gap-2">
          <MdOutlineRestaurantMenu />
          Menu
          <span className="ml-1 text-xs font-normal text-(--color-secondary)">
            ({activeItems.length} items)
          </span>
        </h2>

        {/* Search */}
        <div className="relative mb-3">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-secondary) text-sm" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-(--color-base-300) rounded-xl bg-(--color-base-200) focus:outline-none focus:border-(--color-primary)"
          />
        </div>

        {/* Food Type Filter */}
        {foodTypes.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {foodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFoodType(type)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition ${
                  activeFoodType === type
                    ? "bg-(--color-primary) text-(--color-primary-content) border-(--color-primary)"
                    : "bg-white border-(--color-base-300) text-(--color-base-content) hover:border-(--color-primary)"
                }`}
              >
                {type !== "All" && (
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${foodTypeDot(type)}`}
                  />
                )}
                {type}
              </button>
            ))}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-(--color-primary) text-(--color-primary-content) border-(--color-primary)"
                  : "bg-white border-(--color-base-300) text-(--color-base-content) hover:border-(--color-primary)"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="p-4">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-(--color-secondary)">
            <MdOutlineRestaurantMenu className="text-5xl mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredItems.map((item) => (
              <MenuItemCard key={item._id} item={item} restaurantId={restaurantId} restaurantName={restaurantName} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
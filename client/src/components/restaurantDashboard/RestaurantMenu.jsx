import React, { useState } from "react";
import { FaAward, FaRegGrinStars } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { LuPencilLine, LuTrash2, LuEye, LuChevronDown } from "react-icons/lu";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import ConfirmModal from "./menuItems/ConfirmModal";
import AddNewItemModal from "./menuItems/AddNewItemModal";

const dummyMenu = [
  {
    itemName: "Classic Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves, and oregano.",
    price: 299,
    category: "Pizza",
    foodType: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/pizza1/600/600",
      publicId: "dummy-pizza-1",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Crispy Veg Burger",
    description:
      "Loaded with crispy vegetable patty, lettuce, cheese, and mayo.",
    price: 179,
    category: "Burger",
    foodType: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/burger1/600/600",
      publicId: "dummy-burger-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Paneer Tikka Wrap",
    description:
      "Soft tortilla stuffed with spicy paneer tikka and fresh veggies.",
    price: 229,
    category: "Wrap",
    foodType: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/wrap1/600/600",
      publicId: "dummy-wrap-1",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: false,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie served with vanilla ice cream.",
    price: 199,
    category: "Dessert",
    foodType: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/dessert1/600/600",
      publicId: "dummy-dessert-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Cold Coffee Delight",
    description: "Refreshing chilled coffee topped with whipped cream.",
    price: 149,
    category: "Beverages",
    foodType: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/coffee1/600/600",
      publicId: "dummy-coffee-1",
    },
    status: "discontinued",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chicken Tikka Pizza",
    description:
      "Stone-baked pizza topped with spicy chicken tikka and mozzarella.",
    price: 399,
    category: "Pizza",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-pizza/600/600",
      publicId: "dummy-chicken-pizza",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Grilled Chicken Burger",
    description:
      "Juicy grilled chicken patty with lettuce, cheese, and smoky sauce.",
    price: 279,
    category: "Burger",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-burger/600/600",
      publicId: "dummy-chicken-burger",
    },
    status: "available",
    isTopRated: true,
    isRecommended: false,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato gravy.",
    price: 429,
    category: "Main Course",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/butter-chicken/600/600",
      publicId: "dummy-butter-chicken",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with marinated chicken and aromatic spices.",
    price: 349,
    category: "Biryani",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-biryani/600/600",
      publicId: "dummy-chicken-biryani",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Fish & Chips",
    description:
      "Crispy battered fish fillet served with golden fries and tartar sauce.",
    price: 379,
    category: "Seafood",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/fish-chips/600/600",
      publicId: "dummy-fish-chips",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Prawn Fried Rice",
    description:
      "Wok-tossed fried rice with juicy prawns, vegetables, and soy sauce.",
    price: 389,
    category: "Rice",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/prawn-rice/600/600",
      publicId: "dummy-prawn-rice",
    },
    status: "discontinued",
    isTopRated: false,
    isRecommended: false,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Chicken Shawarma Wrap",
    description:
      "Grilled chicken wrapped with fresh veggies, garlic sauce, and pita bread.",
    price: 249,
    category: "Wrap",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/shawarma-wrap/600/600",
      publicId: "dummy-shawarma-wrap",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Spicy Chicken Wings",
    description: "Crispy chicken wings tossed in a fiery hot sauce.",
    price: 299,
    category: "Starter",
    foodType: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-wings/600/600",
      publicId: "dummy-chicken-wings",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
];

const statusChipStyles = {
  available: "bg-green-100 text-green-700 border border-green-300",
  unavailable: "bg-amber-100 text-amber-700 border border-amber-300",
  discontinued: "bg-rose-100 text-rose-700 border border-rose-300",
};

const statusLabels = {
  available: "Available",
  unavailable: "Unavailable",
  discontinued: "Discontinued",
};

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState(dummyMenu);

  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false);
  const [isEditViewItemModalOpen, setIsEditViewItemModalOpen] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="overflow-y-auto h-full">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-2xl font-bold mb-6">Menu Management</h2>
          <div className="flex gap-4 items-center">
            <button
              className="hover:bg-(--color-primary) border border-(--color-primary) text-(--color-primary) hover:text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
              onClick={() => setIsAddNewItemModalOpen(true)}
            >
              <IoMdAddCircleOutline />
              Add New Item
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search menu..."
              className="border border-(--color-primary) rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-colors"
            />
          </div>
        </div>
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <div className="text-(--color-primary) grid grid-cols-7 gap-4 font-bold border-b border-(--color-secondary) py-2">
            <div className="col-span-2">Item Name & Description</div>
            <div className="text-center">Price</div>
            <div>Category & Type</div>
            <div>Status</div>
            <div>Controls</div>
            <div>Actions</div>
          </div>
          <div className="overflow-y-auto max-h-[65vh]">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 border-b border-(--color-secondary) py-2 items-center"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div>
                    <img
                      src={item.image.url}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="w-full">
                    <div>{item.itemName}</div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="text-center">₹ {item.price.toFixed(2)}</div>
                <div className="">
                  <div>{item.category}</div>
                  <div className="text-sm">{item.foodType}</div>
                </div>
                <div>
                  <div className="relative inline-flex items-center">
                    <select
                      value={item.status}
                      className={`appearance-none rounded-md pl-3 pr-8 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                        statusChipStyles[item.status]
                      }`}
                      onChange={(e) => {
                        // Handle status change logic here
                      }}
                    >
                      <option value="available">
                        {statusLabels.available}
                      </option>
                      <option value="unavailable">
                        {statusLabels.unavailable}
                      </option>
                      <option value="discontinued">
                        {statusLabels.discontinued}
                      </option>
                    </select>
                    <LuChevronDown className="pointer-events-none absolute right-2 text-xs opacity-70" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={`rounded flex items-center justify-center ${
                      item.isTopRated
                        ? " text-(--color-primary)"
                        : "text-(--color-secondary)"
                    }`}
                    title={item.isTopRated ? "Top Rated" : "Mark as Top Rated"}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("topRated");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    <FaAward className="" />
                  </button>
                  <button
                    className={`rounded flex items-center justify-center ${
                      item.isRecommended
                        ? "text-(--color-primary)"
                        : "text-(--color-secondary)"
                    }`}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("recommended");
                      setIsControlsModalOpen(true);
                    }}
                    title={
                      item.isRecommended ? "Recommended" : "Mark as Recommended"
                    }
                  >
                    <AiTwotoneLike className="" />
                  </button>
                  <button
                    className={`px-1 py-0.5 rounded flex items-center justify-center text-xs ${
                      item.isNew
                        ? "text-(--color-primary) border border-(--color-primary)"
                        : "text-(--color-secondary) border border-(--color-secondary)"
                    }`}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("new");
                      setIsControlsModalOpen(true);
                    }}
                    title={item.isNew ? "New Item" : "Mark as New"}
                  >
                    New
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                    title="Edit Item"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("edit");
                      setIsEditViewItemModalOpen(true);
                    }}
                  >
                    <LuPencilLine />
                  </button>
                  <button
                    className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                    title="View Item Details"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("view");
                      setIsEditViewItemModalOpen(true);
                    }}
                  >
                    <LuEye />
                  </button>
                  <button
                    className="px-2 py-1 border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded"
                    title="Delete Item"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("delete");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    <LuTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isControlsModalOpen && (
        <ConfirmModal
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isControlsModalOpen}
          onClose={() => setIsControlsModalOpen(false)}
        />
      )}

      {isAddNewItemModalOpen && (
        <AddNewItemModal
          isOpen={isAddNewItemModalOpen}
          onClose={() => setIsAddNewItemModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
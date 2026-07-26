import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import api from "../../../config/Apiconfig";
import toast from "react-hot-toast";
import { FaRegFileImage } from "react-icons/fa";

const itemCategories = [
  "Appetizer",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Soup",
  "Side Dish",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Pizza",
  "Pasta",
  "Burger",
  "Sandwich",
  "Seafood",
  "Rice",
  "Wrap",
  "Starter",
  "Drink",
  "Other",
];

const foodTypes = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Egg-Free",
  "Other",
];

const AddNewItemModal = ({ isOpen, onClose }) => {
  const [newItemFormData, setNewItemFormData] = React.useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    foodType: "",
    status: "available",
    isTopRated: false,
    isRecommended: false,
    isNew: true,
    isDeleted: false,
  });

  const [previewImage, setPreviewImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [itemImage, setItemImage] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItemFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNewItem = async () => {
    try {
      setIsLoading(true);
      console.log(newItemFormData);

      const formData = new FormData();
      formData.append("itemName", newItemFormData.itemName);
      formData.append("description", newItemFormData.description);
      formData.append("price", newItemFormData.price);
      formData.append("category", newItemFormData.category);
      formData.append("foodType", newItemFormData.foodType);
      formData.append("status", newItemFormData.status);
      formData.append("isTopRated", newItemFormData.isTopRated);
      formData.append("isRecommended", newItemFormData.isRecommended);
      formData.append("isNew", newItemFormData.isNew);
      formData.append("isDeleted", newItemFormData.isDeleted);

      if (itemImage) {
        formData.append("itemImage", itemImage);
      }

      const res = await api.post("/restaurant/add-menu-item", formData);
      toast.success(res.data.message);
      handleOnClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while adding the item. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnClose = () => {
    setNewItemFormData({
      itemName: "",
      description: "",
      price: "",
      category: "",
      foodType: "",
      status: "available",
      isTopRated: false,
      isRecommended: false,
      isNew: true,
      isDeleted: false,
    });
    setPreviewImage(null);
    setItemImage(null);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-5xl">
          <header className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-4">
            <h2 className="text-lg font-semibold">Add New Item</h2>
            <button
              className="text-red-300 hover:text-red-500"
              onClick={handleOnClose}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </header>

          <main>
            <form className=" space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className=" flex justify-center items-center">
                  <div className="h-52 w-52 mx-auto border-2 border-(--color-primary) rounded overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <label
                        htmlFor="itemImage"
                        className="cursor-pointer flex flex-col items-center justify-center h-full text-(--color-primary)/60 hover:text-(--color-primary) text-center"
                      >
                        <FaRegFileImage size={32} className="mb-2" />
                        <span>Click here to upload an image</span>
                      </label>
                    )}
                  </div>
                  <input
                    type="file"
                    id="itemImage"
                    name="itemImage"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setItemImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }}
                    className="hidden"
                  />
                </div>
                <div className="space-y-4 col-span-2">
                  <div>
                    <label
                      className="block mb-1 font-medium"
                      htmlFor="itemName"
                    >
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      value={newItemFormData.itemName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium"
                      htmlFor="itemPrice"
                    >
                      Item Price
                    </label>
                    <input
                      type="number"
                      id="itemPrice"
                      name="price"
                      value={newItemFormData.price}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block mb-1 font-medium"
                        htmlFor="itemCategory"
                      >
                        Item Category
                      </label>
                      <select
                        id="itemCategory"
                        name="category"
                        value={newItemFormData.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="" className="capitalize">
                          Select Category
                        </option>
                        {itemCategories.map((category, idx) => (
                          <option
                            key={idx}
                            value={category}
                            className="capitalize"
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block mb-1 font-medium"
                        htmlFor="itemType"
                      >
                        Food Type
                      </label>
                      <select
                        id="itemType"
                        name="foodType"
                        value={newItemFormData.foodType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="" className="capitalize">
                          Select Food Type
                        </option>
                        {foodTypes.map((type, idx) => (
                          <option key={idx} value={type} className="capitalize">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="itemDescription"
                  >
                    Item Description
                  </label>
                  <textarea
                    id="itemDescription"
                    name="description"
                    value={newItemFormData.description}
                    onChange={handleInputChange}
                    className=" w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </form>
          </main>

          <footer className="flex justify-between border-t border-(--color-secondary) pt-2 mt-4">
            <button
              className="bg-(--color-secondary) disabled:bg-(--color-secondary)/60 text-(--color-secondary-content) px-4 py-2 rounded mr-2"
              onClick={handleOnClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="bg-(--color-primary) disabled:bg-(--color-primary)/60 text-(--color-primary-content) px-4 py-2 rounded"
              onClick={handleAddNewItem}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AddNewItemModal;
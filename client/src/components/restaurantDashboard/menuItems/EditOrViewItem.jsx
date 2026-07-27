import { useMemo, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../../config/Apiconfig";

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

const statusOptions = ["available", "unavailable", "discontinued"];

const getDefaultFormData = (item) => ({
  itemName: item?.itemName || "",
  description: item?.description || "",
  price: item?.price ?? "",
  category: item?.category || "",
  foodType: item?.foodType || "",
  status: item?.status || "available",
  isTopRated: !!item?.isTopRated,
  isRecommended: !!item?.isRecommended,
  isNew: !!item?.isNew,
});

const EditOrViewItem = ({
  selectedItem,
  modalMode,
  isOpen,
  onClose,
  onActionSuccess,
}) => {
  const isViewMode = modalMode === "view";
  const [formData, setFormData] = useState(getDefaultFormData(selectedItem));
  const [itemImage, setItemImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    selectedItem?.image?.url || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalTitle = useMemo(
    () => (isViewMode ? "View Menu Item" : "Edit Menu Item"),
    [isViewMode],
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateItem = async () => {
    if (!selectedItem?._id) {
      toast.error("Invalid menu item selected.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("itemName", formData.itemName);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("foodType", formData.foodType);
      payload.append("status", formData.status);
      payload.append("isTopRated", formData.isTopRated);
      payload.append("isRecommended", formData.isRecommended);
      payload.append("isNew", formData.isNew);

      if (itemImage) {
        payload.append("itemImage", itemImage);
      }

      const response = await api.put(
        `/restaurant/menu-item/${selectedItem._id}`,
        payload,
      );

      toast.success(response.data.message || "Menu item updated successfully");

      if (onActionSuccess) {
        await onActionSuccess();
      }

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update item details. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-5xl max-h-[92vh] overflow-y-auto">
        <header className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-4">
          <h2 className="text-lg font-semibold">{modalTitle}</h2>
          <button
            className="text-red-300 hover:text-red-500"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <IoMdCloseCircleOutline size={24} />
          </button>
        </header>

        <main className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="h-52 w-52 mx-auto border-2 border-(--color-primary) rounded overflow-hidden">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              {!isViewMode && (
                <>
                  <label htmlFor="editItemImage" className="cursor-pointer">
                    Click to Change Image
                  </label>
                  <input
                    type="file"
                    id="editItemImage"
                    name="itemImage"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setItemImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }}
                  />
                </>
              )}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="editItemName"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="editItemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                  className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="editItemPrice"
                >
                  Item Price
                </label>
                <input
                  type="number"
                  id="editItemPrice"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                  className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="editItemCategory"
                  >
                    Item Category
                  </label>
                  <select
                    id="editItemCategory"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                  >
                    <option value="">Select Category</option>
                    {itemCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="editFoodType"
                  >
                    Food Type
                  </label>
                  <select
                    id="editFoodType"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                  >
                    <option value="">Select Food Type</option>
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="editStatus"
                  >
                    Status
                  </label>
                  <select
                    id="editStatus"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <label
                className="block mb-1 font-medium"
                htmlFor="editItemDescription"
              >
                Item Description
              </label>
              <textarea
                id="editItemDescription"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isViewMode}
                className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
                rows={4}
              />
            </div>

            <div className="md:col-span-3">
              <div className="flex gap-6 items-center">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isTopRated"
                    checked={formData.isTopRated}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                  />
                  <span>Top Rated</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isRecommended"
                    checked={formData.isRecommended}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                  />
                  <span>Recommended</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                  />
                  <span>New</span>
                </label>
              </div>
            </div>
          </div>
        </main>

        <footer className="flex justify-end border-t border-(--color-secondary) pt-3 mt-4 gap-2">
          <button
            className="bg-(--color-secondary) disabled:bg-(--color-secondary)/60 text-(--color-secondary-content) px-4 py-2 rounded"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {isViewMode ? "Close" : "Cancel"}
          </button>

          {!isViewMode && (
            <button
              className="bg-(--color-primary) disabled:bg-(--color-primary)/60 text-(--color-primary-content) px-4 py-2 rounded"
              onClick={handleUpdateItem}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default EditOrViewItem;
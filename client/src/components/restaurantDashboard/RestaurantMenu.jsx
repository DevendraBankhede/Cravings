import { useState, useEffect } from "react";
import { FaAward } from "react-icons/fa";
import { LuPencilLine, LuTrash2, LuEye, LuChevronDown } from "react-icons/lu";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import ConfirmModal from "./menuItems/ConfirmModal";
import AddNewItemModal from "./menuItems/AddNewItemModal";
import EditOrViewItem from "./menuItems/EditOrViewItem";
import api from "../../config/Apiconfig";
import toast from "react-hot-toast";
import Loader from "../Loader";

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
  const [menuItems, setMenuItems] = useState([]);

  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false);
  const [isEditViewItemModalOpen, setIsEditViewItemModalOpen] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/restaurant/menu-items", {
        params: { t: Date.now() },
      });
      setMenuItems(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while fetching menu items. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    queueMicrotask(() => {
      fetchMenuItems();
    });
  }, []);

  const handleStatusChange = async (itemId, status) => {
    try {
      const response = await api.patch(
        `/restaurant/menu-item/${itemId}/status?status=${encodeURIComponent(status)}`,
      );
      toast.success(response.data.message || "Item status updated");
      await fetchMenuItems();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update item status. Please try again.",
      );
    }
  };

  if (isLoading) {
    return <Loader height="100%" width="100%" />;
  }

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
            {menuItems.length === 0 ? (
              <div className="text-center py-10 text-(--color-primary)/70">
                No menu items found.
              </div>
            ) : (
              <>
                {menuItems.map((item, index) => (
                  <div
                    key={item._id || index}
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
                            handleStatusChange(item._id, e.target.value);
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
                        title={
                          item.isTopRated ? "Top Rated" : "Mark as Top Rated"
                        }
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
                          item.isRecommended
                            ? "Recommended"
                            : "Mark as Recommended"
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
              </>
            )}
          </div>
        </div>
      </div>

      {isControlsModalOpen && (
        <ConfirmModal
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isControlsModalOpen}
          onClose={() => setIsControlsModalOpen(false)}
          onActionSuccess={fetchMenuItems}
        />
      )}

      {isAddNewItemModalOpen && (
        <AddNewItemModal
          isOpen={isAddNewItemModalOpen}
          onClose={() => setIsAddNewItemModalOpen(false)}
          onActionSuccess={fetchMenuItems}
        />
      )}

      {isEditViewItemModalOpen && (
        <EditOrViewItem
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isEditViewItemModalOpen}
          onClose={() => setIsEditViewItemModalOpen(false)}
          onActionSuccess={fetchMenuItems}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
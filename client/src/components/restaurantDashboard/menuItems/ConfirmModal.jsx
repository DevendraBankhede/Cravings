import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../../config/Apiconfig";

const modalConfig = {
  delete: {
    heading: "Confirm Deletion",
    description: "This will remove the item from your active menu.",
    confirmLabel: "Delete Item",
    confirmClass: "bg-red-600 hover:bg-red-700 text-white",
  },
  topRated: {
    heading: "Change Top Rated",
    description: "Toggle this item's top-rated badge.",
    confirmLabel: "Confirm",
    confirmClass: "bg-(--color-primary) hover:opacity-90 text-(--color-primary-content)",
  },
  recommended: {
    heading: "Change Recommendation",
    description: "Toggle this item's recommended badge.",
    confirmLabel: "Confirm",
    confirmClass: "bg-(--color-primary) hover:opacity-90 text-(--color-primary-content)",
  },
  new: {
    heading: "Change New Badge",
    description: "Toggle this item's new badge.",
    confirmLabel: "Confirm",
    confirmClass: "bg-(--color-primary) hover:opacity-90 text-(--color-primary-content)",
  },
};

const ConfirmModal = ({
  selectedItem,
  modalMode,
  isOpen,
  onClose,
  onActionSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentConfig = modalConfig[modalMode] || {
    heading: "Are you sure?",
    description: "Please confirm this action.",
    confirmLabel: "Confirm",
    confirmClass: "bg-(--color-primary) hover:opacity-90 text-(--color-primary-content)",
  };

  const handleConfirm = async () => {
    if (!selectedItem?._id) {
      toast.error("Invalid item selected.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (modalMode === "delete") {
        const response = await api.delete(
          `/restaurant/menu-item/${selectedItem._id}`,
        );
        toast.success(response.data.message || "Item deleted successfully");
      } else {
        const controlMap = {
          topRated: "isTopRated",
          recommended: "isRecommended",
          new: "isNew",
        };

        const control = controlMap[modalMode];
        const response = await api.patch(
          `/restaurant/menu-item/${selectedItem._id}/control?control=${encodeURIComponent(control)}`,
        );
        toast.success(response.data.message || "Item control updated");
      }

      if (onActionSuccess) {
        await onActionSuccess();
      }

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to complete this action. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className=" text-2xl flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2">
            <h1 className="text-(--color-primary)">Are you sure?</h1>

            <button
              className="text-red-300 hover:text-red-500"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-(--color-primary)">
              {currentConfig.heading}
            </h2>
            <p className="text-sm text-gray-600">{currentConfig.description}</p>
            <p className="text-sm">
              Item: <span className="font-semibold">{selectedItem?.itemName}</span>
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-(--color-secondary) pt-3">
            <button
              className="bg-(--color-secondary) disabled:bg-(--color-secondary)/60 text-(--color-secondary-content) px-4 py-2 rounded"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded disabled:opacity-60 ${currentConfig.confirmClass}`}
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : currentConfig.confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
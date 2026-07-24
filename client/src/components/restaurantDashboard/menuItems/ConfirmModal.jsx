import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ConfirmModal = ({ selectedItem, modalMode, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className=" text-2xl flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2">
            <h1 className="text-(--color-primary)">Are your Sure ?</h1>

            <button
              className="text-red-300 hover:text-red-500"
              onClick={onClose}
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>
          <div>
            <h2 className="">
              {modalMode === "delete" && "Confirm Deletion"}
              {modalMode === "topRated" && "Confirm Top Rated Status Change"}
              {modalMode === "recommended" &&
                "Confirm Recommended Status Change"}
              {modalMode === "new" && "Confirm New Status Change"}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
import React from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";

const RiderPhotos = ({
  user,
  profilePicPreview,
  editingPhoto,
  isSavingPhoto,
  onStartEdit,
  onCancel,
  onSelectPhoto,
  onSave,
}) => {
  return (
    <div className="bg-(--color-base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-(--color-primary)">Profile Photo</h3>
        </div>
        {!editingPhoto ? (
          <button
            onClick={onStartEdit}
            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2 justify-end">
            <button
              onClick={onSave}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              disabled={isSavingPhoto}
            >
              {isSavingPhoto ? "Saving..." : "Save Photo"}
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
              disabled={isSavingPhoto}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-26 h-26">
            <img
              src={profilePicPreview || user?.photo?.url || "/ProfileAvatar.png"}
              alt="Profile"
              className="w-full h-full rounded-xl object-cover border-2 border-(--color-primary)"
            />
          </div>

          {editingPhoto && (
            <div
              className="absolute cursor-pointer bottom-0.5 right-0.5 p-1.5 rounded-ee-xl w-fit bg-(--color-base-100)"
              title="Change Photo"
            >
              <label htmlFor="riderPhotoPic" className="cursor-pointer">
                <MdOutlineAddAPhoto className="text-sm" />
              </label>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                id="riderPhotoPic"
                className="hidden"
                onChange={onSelectPhoto}
              />
            </div>
          )}
        </div>

        <p className="text-xs text-(--color-secondary)">
          Upload a clear profile image so restaurants and customers can identify you quickly.
        </p>
      </div>
    </div>
  );
};

export default RiderPhotos;
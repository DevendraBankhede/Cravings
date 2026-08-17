import React from "react";
import { MdOutlineLockReset } from "react-icons/md";

const Index = ({ user, onOpenPasswordModal }) => {
  return (
    <div className="bg-(--color-base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-(--color-primary)">Security</h3>
        </div>
        <button
          onClick={onOpenPasswordModal}
          className="flex items-center gap-2 border border-(--color-primary) text-(--color-primary) px-2 py-0.5 rounded text-xs hover:bg-(--color-primary) hover:text-(--color-primary-content)"
        >
          <MdOutlineLockReset /> Change Password
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="w-full">
          <label className="text-xs font-semibold">Role</label>
          <input
            type="text"
            value={user?.role || "rider"}
            readOnly
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>

        <div className="w-full">
          <label className="text-xs font-semibold">Email</label>
          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="w-full px-1.5 py-1 border border-(--color-secondary) bg-(--color-base-100) rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
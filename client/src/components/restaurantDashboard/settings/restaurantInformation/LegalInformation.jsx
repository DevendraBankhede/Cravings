import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const LegalInformation = () => {
  const [editingLegalInfo, setEditingLegalInfo] = useState(false);

  const handleSaveLegalInfo = () => {
    // Implement save logic here
    setEditingLegalInfo(false);
  };

  const handleCancelLegalInfo = () => {
    setEditingLegalInfo(false);
  };
  const [legalInfoFormData, setLegalInfoFormData] = useState({
    legalName: "",
    companyType: "",
  });

  return (
    <>
      <div className="bg-(--color-base-100) rounded-lg p-3">
        <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-(--color-primary)">
              Legal Information
            </h3>
          </div>

          {!editingLegalInfo ? (
            <div className="flex gap-3">
              <button
                onClick={() => setEditingLegalInfo(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              >
                <MdEdit /> Edit
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSaveLegalInfo}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                disabled={!editingLegalInfo}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelLegalInfo}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                disabled={!editingLegalInfo}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="w-full">
            <label className="text-xs font-semibold">Legal Name</label>
            <input
              type="tel"
              name="legalName"
              value={legalInfoFormData?.legalName || ""}
              onChange={(e) =>
                setLegalInfoFormData({
                  ...legalInfoFormData,
                  legalName: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingLegalInfo ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingLegalInfo}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">Company Type</label>
            <input
              type="tel"
              name="companyType"
              value={legalInfoFormData?.companyType || ""}
              onChange={(e) =>
                setLegalInfoFormData({
                  ...legalInfoFormData,
                  companyType: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingLegalInfo ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingLegalInfo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalInformation;
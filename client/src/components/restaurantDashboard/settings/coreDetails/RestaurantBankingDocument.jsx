import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const RestaurantBankingDocument = () => {
  const [editingBankingDocument, setEditingBankingDocument] = useState(false);

  const [restaurantData, setRestaurantData] = useState(
    JSON.parse(sessionStorage.getItem("cravingRestaurant")) || {},
  );

  const [bankingDocumentFormData, setBankingDocumentFormData] = useState({
    bankName: restaurantData?.financialDetails?.bankName || "",
    accountNumber: restaurantData?.financialDetails?.accountNumber || "",
    ifscCode: restaurantData?.financialDetails?.ifscCode || "",
    panCard: restaurantData?.documents?.panCard || "",
    gst: restaurantData?.documents?.gstCertificate || "",
    fssai: restaurantData?.documents?.fssaiCertificate || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveBankingDocument = async () => {
    setIsLoading(true);
  };

  const handleCancelBankingDocument = () => {
    setEditingBankingDocument(false);
  };

  return (
    <>
      <div className="bg-(--color-base-100) rounded-lg p-3">
        <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
          <div className="flex items-center gap-3">
            <h3 className="w-full text-sm font-semibold text-(--color-primary)">
              Banking & Documents
            </h3>
          </div>

          {!editingBankingDocument ? (
            <div className="flex gap-3">
              <button
                onClick={() => setEditingBankingDocument(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              >
                <MdEdit /> Edit
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSaveBankingDocument}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelBankingDocument}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
          <div className="w-full">
            <label className="text-xs font-semibold">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={bankingDocumentFormData?.bankName || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  bankName: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={bankingDocumentFormData?.accountNumber || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  accountNumber: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={bankingDocumentFormData?.ifscCode || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  ifscCode: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">Pan Card Number</label>
            <input
              type="text"
              name="panCard"
              value={bankingDocumentFormData?.panCard || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  panCard: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">GST Number</label>
            <input
              type="text"
              name="gst"
              value={bankingDocumentFormData?.gst || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  gst: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>

          <div className="w-full">
            <label className="text-xs font-semibold">fssai Code</label>
            <input
              type="text"
              name="fssai"
              value={bankingDocumentFormData?.fssai || ""}
              onChange={(e) =>
                setBankingDocumentFormData({
                  ...bankingDocumentFormData,
                  fssai: e.target.value,
                })
              }
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingBankingDocument ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingBankingDocument}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantBankingDocument;
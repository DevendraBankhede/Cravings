import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const LegalInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editingLegalInfo, setEditingLegalInfo] = useState(false);

  const [restaurantData, setRestaurantData] = useState(
    JSON.parse(sessionStorage.getItem("cravingRestaurant")) || [],
  );

  const handleSaveLegalInfo = async () => {
    // Implement save logic here

    try {
      setEditingLegalInfo(false);
      setIsLoading(true);

      const res = await api.put(
        "/restaurant/update-legal-info",
        legalInfoFormData,
      );

      toast.success(res.data.message);
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred updating restaurant. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelLegalInfo = () => {
    setEditingLegalInfo(false);
  };
  const [legalInfoFormData, setLegalInfoFormData] = useState({
    legalName: restaurantData.legal?.legalName || "",
    companyType: restaurantData.legal?.companyType || "",
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
                {isLoading ? "Saving..." : "Save Changes"}
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
              type="text"
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
            <select
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
            >
              <option value="">-- Select Company Type --</option>
              <option value="privateLimitedCompany">
                Private Limited Company
              </option>
              <option value="publicLimitedCompany">
                Public Limited Company
              </option>
              <option value="limitedLiabilityPartnership">
                Limited Liability Partnership (LLP)
              </option>
              <option value="soleProprietorship">Sole Proprietorship</option>
              <option value="partnershipFirm">Partnership Firm</option>
              <option value="onePersonCompany">One Person Company (OPC)</option>
              <option value="section8Company">
                Section 8 Company (Non-profit Organizations)
              </option>
              <option value="trustSociety">Trust / Society</option>
              <option value="governmentPublicSectorUndertaking">
                Government / Public Sector Undertaking (PSU)
              </option>
              <option value="foreignSubsidiaryLiaisonOffice">
                Foreign Subsidiary / Liaison Office
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalInformation;
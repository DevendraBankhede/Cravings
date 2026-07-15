import React, { useState } from "react";
import RestaurantInformation from "./settings/RestaurantInformation";
import ResturantCoreDetails from "./settings/ResturantCoreDetails";
import RestaurantPhotos from "./settings/RestaurantPhotos";

const RestaurantSetting = () => {
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];
  const [activeTab, setActiveTab] = useState("coreDetails");

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  return (
    <>
      <div className=" h-full flex flex-col">
        <div className="border-b border-(--color-secondary)/50 flex justify-between mb-2 w-full">
          <div className="flex gap-3 ">
            {Tabs.map((tab, idx) => (
              <>
                <div
                  key={idx}
                  className={`p-2 uppercase cursor-pointer ${activeTab === tab.id ? "text-(--color-primary) border-b-3 border-(--color-primary)" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </div>
              </>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="w-22 text-xs font-semibold">Currently Open</label>
            <input
              type="checkbox"
              name="isOpen"
              checked={isRestaurantOpen}
              onChange={() => setIsRestaurantOpen(!isRestaurantOpen)}
              className=" w-4 h-4 accent-(--color-primary)"
            />
          </div>
        </div>
        <div className="h-full rounded-lg bg-(--color-base-200) p-2">
          {activeTab === "information" && <RestaurantInformation />}
          {activeTab === "coreDetails" && <ResturantCoreDetails />}
          {activeTab === "photos" && <RestaurantPhotos />}
        </div>
      </div>
    </>
  );
};

export default RestaurantSetting;
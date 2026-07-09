import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const RestaurantSidebar = ({ activeTab, setActiveTab }) => {
  const mainTabs = [
    { name: "Overview", value: "overview", icon: <MdDashboard /> },
    { name: "Orders", value: "orders", icon: <FaShoppingCart /> },
  ];

  const settingsTab = { name: "Settings", value: "settings", icon: <IoMdSettings /> };

  const renderTab = (tab) => (
    <li
      key={tab.value}
      className={`cursor-pointer p-2 rounded text-(--color-neutral) flex items-center gap-3 ${
        activeTab === tab.value
          ? "bg-(--color-primary) text-(--color-primary-content) font-semibold"
          : "hover:bg-(--color-secondary) hover:text-(--color-secondary-content) transition-colors duration-200"
      }`}
      onClick={() => setActiveTab(tab.value)}
    >
      {tab.icon} {tab.name}
    </li>
  );

  return (
    <>
      <div className="h-full flex flex-col">
        <ul className="space-y-4 flex-1">
          {mainTabs.map((tab) => renderTab(tab))}
        </ul>
        <ul className="space-y-4 border-t border-(--color-secondary) py-2">
          {renderTab(settingsTab)}
        </ul>
      </div>
    </>
  );
};

export default RestaurantSidebar;
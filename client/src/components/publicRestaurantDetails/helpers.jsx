import { FaLeaf, FaDrumstickBite, FaInstagram, FaFacebookSquare, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";

export const foodTypeDot = (foodType) => {
  if (!foodType) return "bg-gray-400";
  const ft = foodType.toLowerCase();
  if (ft.includes("non")) return "bg-red-500";
  if (ft.includes("veg") || ft.includes("vegan")) return "bg-green-500";
  return "bg-yellow-500";
};

export const restaurantTypeLabel = (type) => {
  const map = {
    veg: {
      label: "Pure Veg",
      color: "text-green-600 bg-green-50",
      icon: <FaLeaf className="text-green-500" />,
    },
    "non-veg": {
      label: "Non-Veg",
      color: "text-red-600 bg-red-50",
      icon: <FaDrumstickBite className="text-red-500" />,
    },
    vegan: {
      label: "Vegan",
      color: "text-green-700 bg-green-50",
      icon: <FaLeaf className="text-green-600" />,
    },
    jain: {
      label: "Jain",
      color: "text-orange-600 bg-orange-50",
      icon: <FaLeaf className="text-orange-500" />,
    },
    both: {
      label: "Veg & Non-Veg",
      color: "text-purple-600 bg-purple-50",
      icon: <MdOutlineRestaurantMenu className="text-purple-500" />,
    },
  };
  return (
    map[type] || {
      label: type,
      color: "text-gray-600 bg-gray-100",
      icon: null,
    }
  );
};

export const platformIcon = (platform) => {
  const p = platform?.toLowerCase() || "";
  if (p.includes("instagram")) return <FaInstagram className="text-pink-500" />;
  if (p.includes("facebook")) return <FaFacebookSquare className="text-blue-500" />;
  if (p.includes("twitter") || p.includes("x")) return <FaXTwitter className="text-black" />;
  if (p.includes("youtube")) return <FaYoutube className="text-red-500" />;
  if (p.includes("whatsapp")) return <FaWhatsapp className="text-green-500" />;
  return <IoGlobeOutline className="text-gray-500" />;
};
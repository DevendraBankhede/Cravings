import React from "react";

const RestaurantGallery = ({ images }) => {
  if (!images?.length) return null;

  return (
    <div className="bg-(--color-base-100) rounded-2xl p-4 shadow-sm">
      <h2 className="text-sm font-bold text-(--color-primary) mb-3 uppercase tracking-wide">
        Gallery
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <img
            key={img.publicId || idx}
            src={img.url}
            alt={`Restaurant ${idx + 1}`}
            className="w-full h-28 object-cover rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantGallery;
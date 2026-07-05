import React, { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import bgImage1 from "../assets/carousel/bgImage1.jpg";
import bgImage2 from "../assets/carousel/bgImage2.jpg";
import bgImage3 from "../assets/carousel/bgImage3.jpg";
import bgImage4 from "../assets/carousel/bgImage4.jpg";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const images = [bgImage1, bgImage2, bgImage3, bgImage4];

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Carousel Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <IoChevronBack size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <IoChevronForward size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
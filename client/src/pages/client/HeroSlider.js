import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    require("../../assets/client/image/hero_banner_1.webp"),
    require("../../assets/client/image/hero_banner_2.webp"),
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="slider_container">
      <div className="image_container">
        <button onClick={prevSlide} className="slider_button prev_button">
          <ChevronLeft />
        </button>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`banner ${index + 1}`}
            className={`slider_image ${index === currentIndex ? "active" : ""}`}
            style={{ display: index === currentIndex ? "block" : "none" }}
          />
        ))}
        <div className="text_container">
          <span>Get up to 30% off on your first $150 purchase</span>
          <h1>
            Do not miss our amazing <br /> grocery deals
          </h1>
          <button>
            <p>Shop now</p> <ArrowRight />
          </button>
        </div>
        <button onClick={nextSlide} className="slider_button next_button">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;

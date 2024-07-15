import { useState } from "react";
import FeatureCard from "../../layouts/client/FeaturedCard";
import "../../assets/client/css/Feature.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Feature = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalCards = 5;

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === totalCards - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="future_main">
      <div className="heading_future">
        <h1>Featured Grocery</h1>
        <div className="slider_button">
          <button onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <button onClick={nextSlide}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="featured_card">
        <FeatureCard startIndex={startIndex} />
      </div>
    </div>
  );
};

export default Feature;

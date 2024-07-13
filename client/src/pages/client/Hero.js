import HeroCategory from "./HeroCategory";
import HeroSlider from "./HeroSlider";
import "../../assets/client/css/Hero.css";

const Hero = () => {
  return (
    <div className="main_container">
      <HeroSlider />
      <HeroCategory />
    </div>
  );
};

export default Hero;

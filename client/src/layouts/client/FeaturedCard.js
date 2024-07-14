import { Heart, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getItemData } from "../../store/slices/item";
import { useEffect } from "react";
// redux
import { addToCart } from "../../store/slices/addtoCard";

const FeaturedCard = ({ startIndex, totalCards }) => {
  const item = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemData());
  }, [dispatch]);

  const visibleCards = [];
  for (let i = 0; i < totalCards; i++) {
    visibleCards.push(item[(startIndex + i) % item.length]);
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {visibleCards.map((item) => (
        <div className="card_container" key={item.id}>
          <div className="glassSection">
            <div className="discountBadge">
              <span>
                50
                <br /> off
              </span>
            </div>
            <img src={`/upload/${item.item_img}`} alt="card banner" />
          </div>
          <div className="detail_future">
            <h4>{item.item_title}</h4>
            <span>{item.item_weight}kg</span>
            <p>
              {item.item_price} <del>25</del>
            </p>
          </div>
          <div className="buttons">
            <button className="heart">
              <Heart />
            </button>
            <button onClick={handleAddToCart(item)}>
              Add <ShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedCard;

import { Heart, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getItemData } from "../../store/slices/item";
import { useEffect } from "react";
import { addCartItem } from "../../store/slices/addtoCard";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeaturedCard = ({ startIndex }) => {
  const { isAuthenticated, user } = useAuth0();
  const item = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemData());
  }, [dispatch]);

  if (!item || item.length === 0) {
    return <div>Loading...</div>;
  }

  const visibleCards = [];
  for (let i = 0; i < 5; i++) {
    visibleCards.push(item[(startIndex + i) % item.length]);
  }

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error("Please create an account to add items to the cart.");
      return;
    } else {
      toast.success("Item added successfully");
    }

    dispatch(addCartItem({ userId: user.sub, item: product }));
  };

  return (
    <>
      {visibleCards.map((item, index) => (
        <div className="card_container" key={item.id || index}>
          <div className="glassSection">
            <div className="discountBadge">
              <span>
                20%
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
            <button onClick={() => handleAddToCart(item)}>
              Add <ShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedCard;

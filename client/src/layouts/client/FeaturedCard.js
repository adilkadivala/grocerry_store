import { Heart, ShoppingCart } from "lucide-react";

const FeaturedCard = ({ startIndex }) => {
  const cards = [
    {
      id: 1,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "25%",
      img: require("../../assets/client/image/future_img.png"),
    },
    {
      id: 2,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "25%",
      img: require("../../assets/client/image/future_img2.png"),
    },
    {
      id: 3,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "55%",
      img: require("../../assets/client/image/future_img3.png"),
    },
    {
      id: 4,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "25%",
      img: require("../../assets/client/image/future_img4.png"),
    },
    {
      id: 5,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "25%",
      img: require("../../assets/client/image/future_img5.png"),
    },
    {
      id: 6,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$37.00",
      originalPrice: "$59.12",
      discount: "25%",
      img: require("../../assets/client/image/future_img6.png"),
    },
    {
      id: 7,
      title: "Nestle Cerelac Mixed Fruits & Wheat with Milk",
      weight: "500g Pack",
      price: "$36.00",
      originalPrice: "$59.12",
      discount: "85%",
      img: require("../../assets/client/image/future_img3.png"),
    },
  ];

  const visibleCards = [];
  for (let i = 0; i < 5; i++) {
    visibleCards.push(cards[(startIndex + i) % cards.length]);
  }

  return (
    <>
      {visibleCards.map((item) => (
        <div className="card_container" key={item.id}>
          <div className="glassSection">
            <div className="discountBadge">
              <span>
                {item.discount}
                <br /> off
              </span>
            </div>
            <img src={item.img} alt="card banner" />
          </div>
          <div className="detail_future">
            <h4>{item.title}</h4>
            <span>{item.weight}</span>
            <p>
              {item.price} <del>{item.originalPrice}</del>
            </p>
          </div>
          <div className="buttons">
            <button className="heart">
              <Heart />
            </button>
            <button>
              Add <ShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedCard;

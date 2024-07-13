const Card = () => {
  const Category = [
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 2,
      img: require("../../assets/client/image/future_img.png"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
    {
      id: 1,
      img: require("../../assets/client/image/hero_card.webp"),
      text: "This is a card",
    },
  ];

  return (
    <div className="card_container">
      {Category.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.img} alt="Category banner" />
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;

const dbConnect = require("../connect/connect");

// get item to cart
const getCartItems = async (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT c.id, c.item_id, i.item_img, i.item_title, i.item_weight, i.item_price
    FROM cart c
    JOIN item i ON c.item_id = i.id
    WHERE c.user_id = ?
  `;
  dbConnect.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json(data);
  });
};

// Add item to cart
const addCartItem = async (req, res) => {
  const { user_id, item_id } = req.body;
  const query = `
    INSERT INTO cart (user_id, item_id)
    VALUES (?, ?)
  `;
  const data = [user_id, item_id];
  dbConnect.query(query, data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.sendStatus(200);
  });
};

// Remove item from cart
const removeCartItem = async (req, res) => {
  const { userId, itemId } = req.params;
  const query = "DELETE FROM cart WHERE user_id = ? AND item_id = ?";
  dbConnect.query(query, [userId, itemId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.sendStatus(200);
  });
};

module.exports = {
  getCartItems,
  addCartItem,
  removeCartItem,
};
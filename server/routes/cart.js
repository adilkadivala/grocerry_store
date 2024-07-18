const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

router.route("/cart/:userId").get(cartController.getCartItems);
router.route("/cart").post(cartController.addCartItem);
router.route("/cart/:userId/:itemId").delete(cartController.removeCartItem);

module.exports = router;

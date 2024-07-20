const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

router.route("/getcartitem/:userId").get(cartController.getCartItems);
router.route("/insertcartcart").post(cartController.addCartItem);
router.route("/deletecartitem/:id").delete(cartController.removeCartItem);

module.exports = router;

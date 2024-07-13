const express = require("express");
const router = express.Router();
const item_data = require("../controller/item");
const Middleware = require("../middleware/filehandler");

router.route("/getitem").get(item_data.getItem);
router
  .route("/postitem")
  .post(Middleware.location.single("item_img"), item_data.insertItem);

router
  .route("/updateitem/:id")
  .put(Middleware.location.single("item_img"), item_data.updateItem);

router.route("/deleteitem/:id").delete(item_data.deletItem);

module.exports = router;

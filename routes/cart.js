const express = require("express");
const {
  delete_item,
  add_cart_item,
  get_cart_items,
} = require("../controllers/cart.controller");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// fetch the items in the cart of a particular user
router.get("/getCart", isAuth, get_cart_items);

// add items to the user's cart
router.post("/addCart", isAuth, add_cart_item);

// delete a specific item from a specific user's cart
router.delete("/deleteCart/:itemId", isAuth, delete_item);

module.exports = router;

const express = require("express");
const { post_order } = require("../controllers/order.controller");

const router = express.Router();
const isAuth = require("../middlewares/auth");

// fetch the orders of a specific user
//router.get("/get_order/:id");

// make a new order
router.post("/postOrder", isAuth, post_order);

module.exports = router;

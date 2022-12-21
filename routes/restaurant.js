const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const express = require("express");
const {
  addRestaurant,
  getRestaurants,
  getOneRestaurant,
  deleteRestaurant,
  editRestaurant,
} = require("../controllers/restaurant.controller");
const router = express.Router();

router.get("/getRestaurants", auth, getRestaurants);
router.get("/getRestaurant/:id", getOneRestaurant);
router.post("/addRestaurant", auth, role("Admin"), addRestaurant);
router.delete("/deleteRestaurant/:id", auth, role("Admin"), deleteRestaurant);
router.put("/editRestaurant/:id", auth, role("Admin"), editRestaurant);

module.exports = router;

const express = require("express");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  getDishs,
  deleteDish,
  getOneDish,
  editDish,
  addDish,
  isAvaible,
  getAllDishs,
} = require("../controllers/dish.controller");

const router = express.Router();

router.get("/getDishs/:id", auth, getDishs);
router.get("/getAllDishs", auth, getAllDishs);
router.get("/getDish/:id", auth, getOneDish);
router.post("/addDish", auth, role("Admin"), addDish);
router.delete("/deleteDish/:id", auth, role("Admin"), deleteDish);
router.put("/isAvaible/:id", auth, role("Admin"), isAvaible);
router.put("/editDish/:id", auth, role("Admin"), editDish);

module.exports = router;

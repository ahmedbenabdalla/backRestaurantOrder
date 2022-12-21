const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
  price: {
    type: Number,
    required: true,
  },
  isAvaible: {
    type: Boolean,
    required: true,
  },
  cookingTime: {
    type: String,
    required: true,
  },
});

module.exports = Dish = mongoose.model("Dish", dishSchema);

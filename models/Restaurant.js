const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: String,
  address: {
    type: String,
    required: true,
  },
});

module.exports = Restaurant = mongoose.model("Restautrant", restaurantSchema);

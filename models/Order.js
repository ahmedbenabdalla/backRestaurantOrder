const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
    {
      dishId: {
        type: String,
      },
      name: String,
      quantity: {
        type: Number,
        min: [1, "Quantity can not be less then 1."],
      },
      price: Number,
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);

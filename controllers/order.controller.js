const Order = require("../models/Order");

exports.post_order = async (req, res) => {
  try {
    console.log("in add dish");
    const newOrder = await new Order(req.body);
    newOrder.save();
    res.send(newOrder);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

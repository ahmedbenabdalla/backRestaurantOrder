const Dish = require("../models/Dish");

exports.getDishs = async (req, res) => {
  try {
    console.log("in get dishes");
    const dishs = await Dish.find({ restaurantId: req.params.id });
    res.send(dishs);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
exports.getAllDishs = async (req, res) => {
  try {
    const dishs = await Dish.find();
    res.send(dishs);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.getOneDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    res.send(dish);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.addDish = async (req, res) => {
  try {
    console.log("in add dish");
    const newDish = await new Dish(req.body);
    newDish.save();
    res.send(newDish);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const deletedProduct = await Dish.findByIdAndDelete(req.params.id);
    res.send({ msg: `${deletedDish.title} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.editDish = async (req, res) => {
  try {
    const editedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.send(editedDish);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
exports.isAvaible = async (req, res) => {
  try {
    console.log("in is Avaible");
    const dish = await Dish.findById(req.params.id);
    const editedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { isAvaible: !dish.isAvaible },
      { new: true }
    );

    res.send(editedDish);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const Restaurant = require("../models/Restaurant");

exports.addRestaurant = async (req, res) => {
  try {
    const newRestaurant = await new Restaurant(req.body);
    newRestaurant.save();
    res.send(newRestaurant);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
exports.getRestaurants = async (req, res) => {
  try {
    console.log("in get restaurant");
    const restaurants = await Restaurant.find();
    res.send(restaurants);
  } catch (error) {
    console.log("error");
    res.status(500).json({ errors: error.message });
  }
};
exports.getOneRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(restaurant);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
exports.deleteRestaurant = async (req, res) => {
  try {
    console.log("in delete restaurant");
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ msg: `${deletedRestaurant.name} was successfully deleted` });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.editRestaurant = async (req, res) => {
  try {
    const editedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editedRestaurant);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

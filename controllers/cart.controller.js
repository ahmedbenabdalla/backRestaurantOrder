const Cart = require("../models/Cart");
const Dish = require("../models/Dish");

const calcbill = (array) => {
  let s = 0.0;
  for (let i = 0; i < array.length; i++) {
    s += parseFloat(array[i].quantity * parseFloat(array[i].price));
  }
  return s;
};

module.exports.get_cart_items = async (req, res) => {
  console.log("in get Cart");
  const userId = req.user.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      console.log(cart);
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_cart_item = async (req, res) => {
  console.log("cart");
  const userId = req.user._id;
  console.log("userId", userId);
  const { dishId, quantity } = req.body;
  console.log(req.body);

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Dish.findOne({ _id: dishId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.name;
    const imageUrl = item.imageUrl;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.dishId == dishId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let dishItem = cart.items[itemIndex];
        dishItem.quantity = quantity;
        cart.items[itemIndex] = dishItem;
      } else {
        cart.items.push({ dishId, name, quantity, price, imageUrl });
      }
      cart.bill = calcbill([...cart.items]);
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const fitems = [{ dishId, name, quantity, price, imageUrl }];
      const newCart = new Cart({
        userId,
        items: fitems,
        bill: calcbill([...fitems]),
      });
      newCart.save();
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.delete_item = async (req, res) => {
  console.log("in delete item");
  const userId = req.user.id;
  console.log(userId);
  const dishId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((d) => d.dishId == dishId);
    if (itemIndex > -1) {
      let dishItem = cart.items[itemIndex];
      cart.bill -= dishItem.quantity * dishItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

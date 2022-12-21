const express = require("express");
const app = express();

const connectDB = require("./config/connectDB");
const user = require("./routes/user");
const restaurant = require("./routes/restaurant");
const Dish = require("./routes/Dish");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
connectDB();

app.use(express.json());

app.use("/user", user);
app.use("/restaurant", restaurant);
app.use("/restaurant/dish", Dish);
app.use("/cart", Cart);
app.use("/order", Order);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server running on port ${PORT}...`)
);

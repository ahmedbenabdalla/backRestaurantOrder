const User = require("../models/User");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, phone, password, role } = req.body;
  try {
    const existantUser = await User.findOne({ email });
    if (existantUser)
      return res.status(400).send({ msg: "User already exists" });
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });
    var salt = await bc.genSalt(10);
    var hash = await bc.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, secret);
    res.status(200).send({
      token,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) res.status(404).json({ msg: "Invalid email or password" });
    const isMatch = await bc.compare(password, user.password);
    if (!isMatch) res.status(401).json({ msg: "Invalid email or password" });
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secret);
    res.status(200).send({
      token: token,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
  } catch (error) {
    res.status(500).send(error.msg);
  }
};
exports.getUser = (req, res) => {
  res.status(200).send(req.user);
  console.log(req.user);
};

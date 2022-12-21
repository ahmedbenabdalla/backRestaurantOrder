const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  role: {
    type: String,
    default: "client",
    enum: ["client", "user restaurant"],
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email ID"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password length must be atleast 6 characters"],
    minlength: [6, "Password length must be atleast 6 characters"],
  },
  username: { type: String, required: [true, "Username"] },
});

module.exports = mongoose.model("User", User);

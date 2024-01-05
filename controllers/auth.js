const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(400).json({ message: "User exits, login" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hash,
      username: username,
    });
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.Secret_Key
    );
    return res
      .status(200)
      .json({ message: "user created", user: newUser, token: token });
  } catch (error) {
    return res.status(400).json({ message: "User not created", error: error });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email: email });
    if (!exist) {
      return res.status(400).json({ message: "No User exits, signup" });
    }
    const match = await bcrypt.compare(password, exist.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect credentials, login" });
    }
    const token = jwt.sign(
      { email: exist.email, userId: exist._id },
      process.env.Secret_Key
    );
    return res
      .status(200)
      .json({ message: "user loggedIn", user: exist, token: token });
  } catch (error) {
    return res.status(400).json({ message: "User not created", error: error });
  }
};

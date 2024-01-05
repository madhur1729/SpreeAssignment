const mongoose = require("mongoose");

const note = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Note", note);

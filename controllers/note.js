const mongoose = require("mongoose");
const Note = require("../models/note");

exports.getAllNotes = async (req, res) => {
  try {
    const id = req.userId;
    const notes = await Note.find({ userId: { $eq: id } });
    return res.status(200).json({ data: notes });
  } catch (error) {
    return res.status(400).json({ message: "Note not created", error: error });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const notes = await Note.findById(id);
    return res.status(200).json({ data: notes });
  } catch (error) {
    return res.status(400).json({ message: "Note not created", error: error });
  }
};

exports.getNoteBySearch = async (req, res) => {};

exports.createNote = async (req, res) => {
  try {
    const newnote = await Note.create({ ...req.body, userId: req.userId });
    return res.status(200).json({
      message: "Note created",
      newnote,
      params: req.params,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Note not created",
      error: error,
      ...req.params,
      ...req.body,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    const note = req.body;
    const updatenote = await Note.findByIdAndUpdate(id, note);
    res.status(200).json({ updatenote, message: "updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Note not updated", error: error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Note not created", error: error });
  }
};

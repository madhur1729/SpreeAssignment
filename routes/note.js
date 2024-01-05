const express = require("express");
const { auth } = require("../middleware/auth");
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");

/* express router */
const router = express.Router();

router.get("/notes", auth, getAllNotes);
router.get("/notes/:id", getNoteById);
// router.get("/ask/:tag", getQuestionByTag);
router.post("/notes", auth, createNote);
router.patch("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

module.exports = router;

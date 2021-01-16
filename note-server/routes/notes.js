const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

//GET ALL NOTES
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//SUBMIT A NOTE
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//SPECIFIC NOTE
router.get("/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.json(note);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//DELETE NOTE
router.delete("/:noteId", async (req, res) => {
  try {
    const removedNote = await Note.deleteOne({ _id: req.params.noteId });
    res.json(removedNote);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//UPDATE NOTE
router.patch("/:noteId", async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedNote);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;

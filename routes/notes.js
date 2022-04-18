const router = require("express").Router();
const auth = require("../middleware/auth");
const Note = require("../models/Note");

// get all notes of a user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }, { user: 0 }).sort({
      date: -1,
    });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/search/:q", auth, async (req, res) => {
  try {
    const reg = new RegExp(req.params.q, "i");
    const notes = await Note.find({ user: req.user._id, content: reg });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, content, label } = req.body;

    if (title === "" && content === "")
      return res.status(400).json("Enter atleast one field");

    const newNotes = new Note({
      title,
      content,
      user: req.user._id,
      label,
    });

    const note = await newNotes.save();
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, content, label } = req.body;

  if (title === "" && content === "")
    return res.status(400).json("Enter atleast one field");

  const noteField = {};

  if (title) noteField.title = title;
  if (content) noteField.content = content;
  if (label) noteField.label = label;

  try {
    let note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user._id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(req.params.id, noteField, {
      new: true,
    });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ msg: "Note not found" });

    if (note.user.toString() !== req.user._id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note removed" });
  } catch (error) {}
});

module.exports = router;

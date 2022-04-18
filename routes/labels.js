const router = require("express").Router();
const Label = require("../models/Label");
const Note = require("../models/Note");
// const mongooose = require("mongoose");
const auth = require("../middleware/auth");

// get all label
router.get("/", auth, async (req, res) => {
  try {
    const labels = await Label.findOne({ userId: req.user._id });
    res.json(labels?.labels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:name", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      label: req.params.name,
    });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// router add label

router.post("/", auth, async (req, res) => {
  const { name } = req.body;
  if (name === undefined)
    return res.status(400).json({ msg: "Provide a label name" });

  try {
    const labelExist = await Label.findOne({ userId: req.user._id });
    if (labelExist) {
      const labels = await Label.updateOne(
        { userId: req.user._id },
        { $addToSet: { labels: name } }
      );
      return res.json(labels);
    }

    const label = new Label({
      labels: [name],
      userId: req.user._id,
    });

    const newLabelArr = await label.save();
    res.json(newLabelArr);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:name", auth, async (req, res) => {
  if (req.params.name === undefined)
    return res.status(400).json({ msg: "Provide a label name" });

  try {
    const deletedLabel = await Label.updateOne(
      { userId: req.user._id },
      { $pull: { labels: req.params.name } }
    );
    res.json(deletedLabel);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

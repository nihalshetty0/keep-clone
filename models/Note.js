const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
  },
});

module.exports = mongoose.model("Note", NoteSchema);

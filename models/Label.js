const mongooose = require("mongoose");

const LabelSchema = mongooose.Schema({
  labels: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongooose.model("Label", LabelSchema);

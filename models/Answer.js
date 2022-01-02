const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "items" },
  content: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("answers", answerSchema);

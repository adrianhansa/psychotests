const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("tests", testSchema);

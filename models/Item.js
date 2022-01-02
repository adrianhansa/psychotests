const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "tests",
    },
    scale: [{ type: mongoose.Schema.Types.ObjectId, ref: "scales" }],
    content: { type: String, required: true },
    orderNumber: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("items", itemSchema);

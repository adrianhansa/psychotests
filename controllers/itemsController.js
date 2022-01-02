const Item = require("../models/Item");

const addItem = async (req, res) => {
  try {
    const { content, orderNumber, scaleId } = req.body;
    if (!content || !orderNumber)
      return res.status(400).json({ message: "All fields are required" });
    const item = await Item.create({
      test: req.params.testId,
      scale: scaleId,
      content,
      orderNumber,
    });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find({ test: req.params.testId });
    if (!items) return res.status(404).json({ message: "Items not found" });
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { content, orderNumber, scaleId } = req.body;
    if (!content || !orderNumber)
      return res.status(400).json({ message: "All fields are required" });
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { content, orderNumber, scale: scaleId },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addItem, getItem, deleteItem, updateItem, getItems };

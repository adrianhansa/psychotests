const Scale = require("../models/Scale");
const Test = require("../models/Test");

const addScale = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ message: "Please give it a name" });
    const scale = await Scale.create({
      name,
      description,
      test: req.params.testId,
    });
    res.status(200).json(scale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getScale = async (req, res) => {
  try {
    const scale = await Scale.findById(req.params.id);
    if (!scale) return res.status(404).json({ message: "Scale not found" });
    res.status(200).json(scale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getScales = async (req, res) => {
  try {
    const test = await Test.findOne({ slug: req.params.slug });
    if (!test) return res.status(200).json({ message: "Test not found" });
    const scales = await Scale.find({ test: test._id });
    res.status(200).json(scales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateScale = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const scale = await Scale.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.status(200).json(scale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteScale = async (req, res) => {
  try {
    const scale = await Scale.findByIdAndDelete(req.params.id);
    if (!scale) return res.status(404).json({ message: "Scale not found" });
    res.status(200).json({ message: "Scale deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addScale, getScale, deleteScale, updateScale, getScales };

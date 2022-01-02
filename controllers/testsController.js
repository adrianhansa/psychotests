const Test = require("../models/Test");
const slugify = require("slugify");

const addTest = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).json({ message: "Please complete all fields." });
    const slug = slugify(name, {
      lower: true,
      trim: true,
      remove: /[*+~.()'"!?:@]/g,
    });
    const existingTest = await Test.findOne({ slug });
    if (existingTest)
      return res.status(400).json({
        message: "This name is already in use. Please choose another one.",
      });
    const test = await Test.create({
      name,
      description,
      slug,
      user: req.user.id,
    });
    res.status(200).json(test);
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTestForClient = async (req, res) => {
  try {
    const test = await Test.findOne(req.params.slug);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTestsForClient = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTestForAdmin = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTestsForAdmin = async (req, res) => {
  try {
    const tests = await Test.find({ user: req.user.id });
    res.status(200).json(tests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTest = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).json({ message: "All fields are required." });
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { name, password },
      { new: true }
    );
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json({ message: "Test deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTest,
  getTestForAdmin,
  getTestForClient,
  getTestsForAdmin,
  getTestsForClient,
  updateTest,
  deleteTest,
};

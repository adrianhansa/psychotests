const Test = require("../models/Test");
const slugify = require("slugify");

const addTest = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).json({ message: "Pleased  complete all fields." });
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

module.exports = { addTest };

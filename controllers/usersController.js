const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");

const register = async (req, res) => {
  try {
    const { name, email, password, passwordVerify } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({ message: "All fields are required." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "The password must contain at least 6 characters." });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ message: "The two passwords are not identical." });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message:
          "There is already an account associated with this email address. Please login.",
      });
    const passwordHashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHashed });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email/password are required" });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email/password" });
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify)
      return res.status(404).json({ message: "Invalid email/password" });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET
  );
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "development"
          ? "lax"
          : process.env.NODE_ENV === "production" && "none",
      secure:
        process.env.NODE_ENV === "development"
          ? false
          : process.env.NODE_ENV === "production" && true,
    })
    .json({
      id: user._id,
      name: user.name,
    });
};

module.exports = sendToken;

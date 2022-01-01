const auth = (req, res, next) => {
  console.log("AUTH");
  next();
};

module.exports = auth;

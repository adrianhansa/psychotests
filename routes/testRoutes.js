const router = require("express").Router();
const auth = require("../middlewares/auth");
const { addTest } = require("../controllers/testsController");

router.post("/", auth, addTest);

module.exports = router;

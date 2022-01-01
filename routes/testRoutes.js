const router = require("express").Router();
const auth = require("../utils/auth");
const { addTest } = require("../controllers/testsController");

router.post("/", auth, addTest);

module.exports = router;

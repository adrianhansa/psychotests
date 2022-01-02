const router = require("express").Router();
const {
  getTestForClient,
  getTestsForClient,
} = require("../controllers/testsController");

router.get("/", getTestsForClient);
router.get("/:slug", getTestForClient);

module.exports = router;

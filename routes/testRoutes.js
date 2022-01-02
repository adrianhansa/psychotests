const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addTest,
  getTestForAdmin,
  getTestForClient,
  getTestsForAdmin,
  getTestsForClient,
  updateTest,
  deleteTest,
} = require("../controllers/testsController");

router.get("/", getTestsForClient);
router.post("/", auth, addTest);
router.get("/:slug", getTestForClient);
router.get("/admin/:id", getTestForAdmin);
router.put("/admin/:id", updateTest);
router.delete("/admin/:id", deleteTest);
router.get("/admin/", auth, getTestsForAdmin);
router.get("/admin/:id", auth, getTestForAdmin);

module.exports = router;

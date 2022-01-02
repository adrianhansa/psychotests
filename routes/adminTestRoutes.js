const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addTest,
  getTestForAdmin,
  getTestsForAdmin,
  updateTest,
  deleteTest,
} = require("../controllers/testsController");

router.post("/", auth, addTest);
router.get("/", auth, getTestsForAdmin);
router.get("/:id", auth, getTestForAdmin);
router.put("/:id", auth, updateTest);
router.delete("/:id", auth, deleteTest);

module.exports = router;

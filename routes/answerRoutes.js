const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addAnswer,
  getAnswer,
  getAnswers,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answersController");

router.post("/", auth, addAnswer);
router.get("/", getAnswers);
router.get("/:id", getAnswer);
router.put("/:id", auth, updateAnswer);
router.delete("/:id", auth, deleteAnswer);

module.exports = router;

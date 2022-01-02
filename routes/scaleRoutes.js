const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addScale,
  getScale,
  getScales,
  updateScale,
  deleteScale,
} = require("../controllers/scalesController");

router.get("/", getScales);
router.post("/", auth, addScale);
router.get("/:id", auth, getScale);
router.put("/:id", auth, updateScale);
router.delete("/:id", deleteScale);

module.exports = router;

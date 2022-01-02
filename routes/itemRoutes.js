const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addItem,
  getItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController");

router.get("/", getItems);
router.post("/", auth, addItem);
router.get("/:id", auth, getItem);
router.put("/:id", auth, updateItem);
router.delete("/:id", deleteItem);

module.exports = router;

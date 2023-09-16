const express = require("express");
const router = express.Router();
const {
  getAll,
  addData,
  getById,
  updateById,
  delById,
} = require("../controllers/postController");

router.route("/").get(getAll).post(addData);
router.route("/:id").get(getById).put(updateById).delete(delById);

module.exports = router;

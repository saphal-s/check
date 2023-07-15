const express = require("express");
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");
const { authCheck, adminCheck } = require("../middleware/auth");
const router = express.Router();

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
module.exports = router;

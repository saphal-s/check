const express = require("express");
const {
  create,
  remove,
  update,
  read,
  updateimg,
  listAll,
} = require("../controllers/blog");
const { authCheck, adminCheck } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/blog", upload.single("image"), authCheck, adminCheck, create);
router.get("/blogs", listAll);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", authCheck, adminCheck, remove);
router.put("/blog/:slug", authCheck, adminCheck, update);
router.put(
  "/blogimg/:slug",
  upload.single("image"),
  authCheck,
  adminCheck,
  updateimg
);

module.exports = router;

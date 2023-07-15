const express = require("express");

const { authCheck, adminCheck } = require("../middleware/auth");
const {
  create,
  list,
  read,
  contactStatus,
  remove,
} = require("../controllers/contact");
const router = express.Router();

router.post("/contact", create);
router.get("/contacts", authCheck, adminCheck, list);
router.delete("/contact", authCheck, adminCheck, remove);
router.get("/contact/:slug", authCheck, adminCheck, read);
router.put("/admin/contact-status", authCheck, adminCheck, contactStatus);

module.exports = router;

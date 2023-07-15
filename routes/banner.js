const express = require('express');
const { create, remove, display } = require('../controllers/banner');
const { authCheck, adminCheck } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/banner',upload.single('image'),authCheck,adminCheck,create);
router.get('/banner',display);
router.delete('/banner/:id',remove);


module.exports = router;
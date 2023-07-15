const express = require('express');
const { create, remove, display } = require('../controllers/productad');
const { authCheck, adminCheck } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/productad',upload.single('image'),authCheck,adminCheck,create);
router.get('/productad',display);
router.delete('/productad/:id',remove);


module.exports = router;
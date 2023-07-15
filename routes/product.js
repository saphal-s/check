const express = require('express');
const { create, listAll, remove, update, read, updateimg, list, productStar, listRelated, searchFilters} = require('../controllers/product');
const { authCheck, adminCheck } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/product',upload.single('image'),authCheck,adminCheck,create);
router.get('/products',listAll);
router.delete('/product/:slug',authCheck,adminCheck,remove);
router.put('/product/:slug',authCheck,adminCheck,update);
router.put('/productimg/:slug',upload.single('image'),authCheck,adminCheck,updateimg);
router.get('/product/:slug',read);
router.post('/products',list);


router.get('/product/related/:productId',listRelated) 
router.put('/product/star/:productId',authCheck,productStar)
router.post('/search/filters',searchFilters) 

module.exports = router;
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const productRouter = require('./products.routes');

router.get('/', indexController.mainProducts);
router.use('/productos', productRouter);

module.exports = router;
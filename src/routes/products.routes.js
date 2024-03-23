const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);
router.get('/carrito', productsController.mainProducts);
router.get('/detalle/:id', productsController.detail);


module.exports = router;
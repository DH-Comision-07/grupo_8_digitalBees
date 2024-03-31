const express = require('express');
const router = express.Router();
//const path = require('path');
const productsController = require('../controllers/productsController');
const uploadMulter = require("../middlewares/multerMiddleware");

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.getAll);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/carrito', productsController.mainProducts);
/*** GET DETAIL ONE PRODUCT ***/
router.get('/detalle/:id', productsController.detail);
/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', uploadMulter.single('img') ,productsController.store); 
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.update); 
/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
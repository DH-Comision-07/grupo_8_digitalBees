const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.getAll);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/carrito', productsController.mainProducts);
/*** GET DETAIL ONE PRODUCT ***/
router.get('/detalle/:id', productsController.detail);
/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', productsController.store); 
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.update); 
/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
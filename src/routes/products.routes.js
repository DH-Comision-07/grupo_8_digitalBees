const express = require('express');
const router = express.Router();
//const path = require('path');
const productsController = require('../controllers/productsController');
const uploadMulter = require("../middlewares/multerMiddleware");
const credentialsMid = require('../middlewares/credentialsMid');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.getAll);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/carrito', productsController.mainProducts);
/*** GET DETAIL ONE PRODUCT ***/
router.get('/detalle/:id', productsController.detail);

/*** GET ALL PRODUCTS ADMIN ***/ 
router.get('/admin', credentialsMid.adminMid ,productsController.getAllAdmin);
/*** CREATE ONE PRODUCT ADMIN ***/ 
router.get('/admin/create/', productsController.create); 
router.post('/', uploadMulter.single('img') ,productsController.store); 
/*** EDIT ONE PRODUCT ***/ 
router.get('/admin/edit/:id', productsController.edit); 
router.put('/:id', uploadMulter.single('img'), productsController.update); 
/*** DELETE ONE PRODUCT***/ 
router.delete('/admin/:id', productsController.destroy); 


module.exports = router;
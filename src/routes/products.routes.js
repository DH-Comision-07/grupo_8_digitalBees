const express = require('express');
const router = express.Router();
//const path = require('path');
const productsController = require('../controllers/productsController');
const uploadMulter = require("../middlewares/multerMiddleware");
const credentialsMid = require('../middlewares/credentialsMid');
const productsValidations = require('../middlewares/productsValidationsMid');
const usersController = require('../controllers/usersController');
const authMid = require('../middlewares/authMid');
const orderController = require('../controllers/orderController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.getAll);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/carrito', authMid, productsController.mainProducts);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/pedido/:id', authMid, orderController.getOneOrder );
/*** GET DETAIL ONE PRODUCT ***/
router.get('/detalle/:id', productsController.detail);


/*** GET ALL PRODUCTS ADMIN ***/ 
router.get('/admin', credentialsMid.adminMid ,productsController.getAllAdmin);
/*** CREATE ONE PRODUCT ADMIN ***/ 
router.get('/admin/create/', productsController.create); 
router.post('/', uploadMulter.single('img'), productsValidations,productsController.store); 
/*** EDIT ONE PRODUCT ***/ 
router.get('/admin/edit/:id', productsController.edit); 
router.put('/:id', uploadMulter.single('img'), productsController.update); 
/*** DELETE ONE PRODUCT***/ 
router.delete('/admin/:id', productsController.destroy); 


module.exports = router;
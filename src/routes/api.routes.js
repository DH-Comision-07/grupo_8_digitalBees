const express = require('express');
const router = express.Router();

const apiControllerProducts = require('../controllers/apiProductsController');
const apiControllerUsers = require('../controllers/apiUsersController')


//products
router.get('/detalle/:id', apiControllerProducts.product);
router.get('/products', apiControllerProducts.products)
router.post("/checkout", apiControllerProducts.checkout);

//users
router.get('/users/:id', apiControllerUsers.user);
router.get('/users', apiControllerUsers.users);


module.exports = router;
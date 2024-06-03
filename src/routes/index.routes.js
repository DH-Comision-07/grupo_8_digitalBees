const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const productRouter = require('./products.routes');
const usersRouter = require('./users.routes');
const apiRouter = require('./api.routes')

router.get('/', indexController.mainProducts);
router.use('/productos', productRouter);
router.use('/usuarios', usersRouter);
router.use("/api/", apiRouter);

module.exports = router;
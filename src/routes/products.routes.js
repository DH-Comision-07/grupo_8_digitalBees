const express = require('express');
const router = express.Router();
const multer=require('multer');
const path = require('path');
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname,'../../public/img/groups'))
    },
    filename:(req,file,cb) =>{
        console.log(file);
        const newFileName = 'group-' +  Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload=multer({ storage });


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.getAll);
/*** GET POPULAR PRODUCTS FROM SHOPPING CART ***/
router.get('/carrito', productsController.mainProducts);
/*** GET DETAIL ONE PRODUCT ***/
router.get('/detalle/:id', productsController.detail);
/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('img') ,productsController.store); 
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.update); 
/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
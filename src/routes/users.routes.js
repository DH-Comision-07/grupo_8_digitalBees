const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadMulter = require("../middlewares/multerUsers");
const path = require('path');
const { body } = require('express-validator');

/* EL USUARIO INGRESA CON SUS DATOS.
En este caso se deberán verificar los permisos de usuarios para mostrar la vista con las
acciones que tiene permitidas el usuario que ingrese, es decir, de acuerdo con los 
permisos del usuario logueado, se deben ocultar botones del CRUD.

Los botones del CRUD son los que enviarán el "request" para las acciones.

En el caso de cliente, debe mostrar el sitio web para compras y demás funciones de e-commerce.
En el caso de Sales, debe darle permiso únicamente de actualizar productos.
En el caso de Manager, debe permitir Ver, Crear, Editar, y Borrar productos, y para usuarios, 
    unicamente debe permitir Ver y Editar usuarios
En el caso de Admin, debe permitir CRUD COMPLETO tanto para productos como para usuarios. */

const validations = [
    body('first_name').notEmpty().withMessage('el campo no puede estar vacio'),
    body('last_name').notEmpty().withMessage('el campo no puede estar vacio'),
    body('email').notEmpty().withMessage('el campo no puede estar vacio'),
    body('country').notEmpty().withMessage('el campo no puede estar vacio'),
    body('city').notEmpty().withMessage('el campo no puede estar vacio'),
    body('address').notEmpty().withMessage('el campo no puede estar vacio'),
    body('phone_number').notEmpty().withMessage('el campo no puede estar vacio'),
    body('password').notEmpty().withMessage('el campo no puede estar vacio'),

]


//************************************************* */
//METODOS CLIENTE
router.get("/login", usersController.login);

// formulario de registro
router.get("/registro", usersController.register);
//procesando el registro
router.post("/registro", uploadMulter.single('profile_picture'), validations ,usersController.processRegister);


//************************************************* */
//METODOS ADMINISTRADOR

/*** GET ALL USERS ***/ 
router.get("/admin", usersController.authorization);

/*** GET DETAIL ONE USER ***/
router.get('/detalle/:id', usersController.detail);

/*** CREATE ONE USER ***/ 
router.get('/admin/create/', usersController.create); 
router.post('/', uploadMulter.single('img'), usersController.store); 

/*** EDIT ONE USER ***/ 
router.get('/admin/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 

/*** DELETE ONE USER ***/ 
router.delete('/admin/:id', usersController.destroy); 


module.exports = router;
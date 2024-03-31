const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadMulter = require("../middlewares/multerMiddleware");
const path = require('path');

/*** GET ALL USERS ***/ 
router.get('/', usersController.getAll);

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

router.get("/login", usersController.login);

// Renderiza la vista para registro de usuario.
router.get("/registro", usersController.register);

// Mientras se organiza todo lo de los permisos por usuarios, se renderiza la vista "admin/admin"
router.get("/admin", usersController.authorization);


/*** GET POPULAR USERS ***/
/* Revisar esta ruta si aplica o no, porque no tenemos usuarios destacados o populares.
router.get('/carrito', usersController.mainProducts);*/

/*** GET DETAIL ONE USER ***/
router.get('/detalle/:id', usersController.detail);

/*** CREATE ONE USER ***/ 
router.get('/create/', usersController.create); 
router.post('/', uploadMulter.single('img'), usersController.store); 

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); 
router.put('/:id', usersController.update); 

/*** DELETE ONE USER ***/ 
router.delete('/:id', usersController.destroy); 


module.exports = router;
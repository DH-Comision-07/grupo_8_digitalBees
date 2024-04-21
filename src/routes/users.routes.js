const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadMulter = require("../middlewares/multerUsers");
const path = require('path');
const registerValidations = require('../middlewares/registerValidationsMid');
const guestMid= require('../middlewares/guestMid');
const authMid = require('../middlewares/authMid');
const credentialsMid = require('../middlewares/credentialsMid');

//************************************************* */
//METODOS CLIENTE

// FORMULARIO REGISTRO
router.get("/registro", guestMid, usersController.register);
//procesando y guardando el registro
router.post("/registro", uploadMulter.single('profile_picture'), registerValidations ,usersController.processRegister);

// FORMULARIO LOGIN
router.get("/login" ,guestMid,usersController.login);
//procesando y guardando el login
router.post("/login", usersController.loginProcess);

//perfil de usuario
router.get("/perfil", authMid,usersController.profile);

//metodo LogOut
router.get("/logout",usersController.logout);

//************************************************* 
/*METODOS ADMINISTRADOR*/

/*** GET ALL USERS ***/ 
router.get("/admin", credentialsMid.adminMid ,usersController.authorization);

/*** GET DETAIL ONE USER ***/
router.get('/detalle/:id' ,usersController.detail);

/*** CREATE ONE USER ***/ 
router.get('/admin/create/', usersController.create); 
router.post('/', uploadMulter.single('profile_picture'), usersController.store); 

/*** EDIT ONE USER ***/ 
router.get('/admin/edit/:id', usersController.edit); 
router.put('/:id', uploadMulter.single('profile_picture') ,usersController.update); 

/*** DELETE ONE USER ***/ 
router.delete('/admin/:id', usersController.destroy); 


module.exports = router;
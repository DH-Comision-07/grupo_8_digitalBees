const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const productService= require("../model/service/productService");
const userService = require("../model/service/userService");
const roleService = require("../model/service/roleService");
const orderService = require('../model/service/orderService');

module.exports = {
	//USUARIOS CLIENTES
	register: (req, res) => {
		res.render("users/register")
	},
	processRegister: async (req, res) => {
		try {
			// Array de validaciones
			const resultValidation = validationResult(req);
			const countryCities = {
				Argentina: ['Buenos Aires', 'Córdoba', 'Rosario'],
				Colombia: ['Bogotá', 'Medellín', 'Cali'],
				Mexico: ['Ciudad de México', 'Guadalajara', 'Monterrey']
			};
	
			const selectedCountry = req.body.country;
			const cities = countryCities[selectedCountry] || [];
	
			//resultValidation en su propiedad errors es mayor a cero
			if (resultValidation.errors.length > 0) {
				return res.render('users/register', {
					//errors es la variable que voy a pasar a la vista, mapped convierte el array en un objeto literal
					errors: resultValidation.mapped(),
					selectedCountry: selectedCountry,
					cities: cities,
					oldData: req.body
				});
			}
	
			// Buscar usuario por email
			let userInDb = await userService.findByField( req.body.email);
	
			if (userInDb) {
				return res.render('users/register', {
					errors: {
						email: {
							msg: 'Este email ya está registrado'
						}
					},
					oldData: req.body
				});
			}
	
			// Crear usuario
			let userToCreate = {
				...req.body,
				password: bcryptjs.hashSync(req.body.password, 10),
				profile_picture: req.file.filename,
				account_status: 1,
				user_role_id: 1
			};
	
			let userCreated = await userService.save(userToCreate);
	
			return res.redirect("/usuarios/login");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Error en el servidor");
		}
	}, 

	login: (req, res) => res.render("users/login"), 

	loginProcess: async (req, res) => {

	
		try {
			//"email" es el campo que esta en el json, req.body.email es el valor que digita el usuario en el formulario
			//"email tiene que coincidir con el nombre en el json y en el name de la vista"
			let userToLogin = await userService.findByField(req.body.email);
			
			if (userToLogin) {
				//esto es para crear un clon del usuario en sesion y no una referencia en memoria que apunte al principal
				let userToSession = JSON.parse(JSON.stringify(userToLogin));

				//req.body.password es lo que llega de la vista, en la vista el name tiene que ser password
			
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToSession.password);
				//let isOkThePassword = req.body.password === userToSession.password;
	
				if (isOkThePassword) {
					userToLogin.last_login = new Date();
					
					await userService.update(userToLogin, userToSession.user_id);
					delete userToSession.password;
					req.session.userLogged = userToSession;
	
					if (req.body.remember) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
					}
	
					return res.redirect("/usuarios/perfil");
				}
				return res.render('users/login', {
					errors: {
						email: {
							msg: 'Las credenciales son invalidas'
						}
					}
				});
	
			}
	
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'No se encuentra este email en nuestra base de datos'
					}
				}
			});
		} catch (error) {
			console.error("Error en el proceso de inicio de sesión:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},

	profile: async (req, res) => {
		try {
			let pedidosEnPerfil = await orderService.getAllOrders(req.session.userLogged.user_id);
			if (pedidosEnPerfil == undefined) {
				pedidosEnPerfil = []
			}
			let listaDeProductos = await productService.getMain();
			res.render("users/userProfile", { usuario: req.session.userLogged, 
				'listaDeProductos': listaDeProductos,
				'pedidosEnPerfil': pedidosEnPerfil
			});
		} catch (error) {
			console.error("Error al ingresar al perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	editProfile: async (req, res) => {
		try {
			const usuario = await userService.getOneBy(req.params.id);
			res.render('users/editUserProfile', { 'usuario': usuario });
		} catch (error) {
			console.error("Error al editar el perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	updateProfile: async (req, res) => {
		try {
			let listaDeProductos = await productService.getMain();
			let userRol = req.session.userLogged.user_role;
			
			if (req.file) {
				let user = req.body;
				user.profile_picture = req.file.filename;
				let updatedUser = await userService.update(req.body, req.params.id, userRol);
				res.render('users/userProfile', { 'usuario': updatedUser, 'listaDeProductos': listaDeProductos });
			} else {
				let updatedUser = await userService.update(req.body, req.params.id);
				res.render('users/userProfile', { 'usuario': updatedUser, 'listaDeProductos': listaDeProductos });
			}
		} catch (error) {
			console.error("Error al actualizar el perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		//localStorage.removeItem('userEmail')
		return res.redirect('/')
	},
	/************************************************/
	//USUARIOS ADMINISTRADOR

	//get all users
	authorization: async (req, res) => {
		try {
			const usuarios = await userService.getAll();
			const rol = await roleService.getAllRoles();
			res.render('users/admin/adminUsers', { usuarios: usuarios, roles: rol });
		} catch (error) {
			console.error("Error al autorizar ver los usuarios:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	//get detail user
	detail: async (req, res) => {
		try {
			const usuario = await userService.getOneBy(req.params.id);
			res.render("users/admin/usersDetail", { usuario: usuario });
		} catch (error) {
			console.error("Error al obtener detalle del usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	// Create - Form to create
	create: async function(req,res){
        try {
            let rol = await roleService.getAllRoles();  
			let isChecked = 0;       
			res.render('users/admin/user-create', {roles: rol, isChecked: isChecked})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
	
	// Create -  Method to store
	store: async (req, res) => {
		try {
			if (req.file) {
				let user = req.body;
				user.password = bcryptjs.hashSync(req.body.password, 10),
				user.profile_picture = 'img/imgUsers/' + req.file.filename;
				user.account_status = req.body.account_status === 'on' ? 1 : 0;
				
				await userService.save(user);
			}
			const usuarios = await userService.getAll();
			res.render("users/admin/adminUsers", { 'usuarios': usuarios });
		} catch (error) {
			console.error("Error al guardar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	// Update - Form to edit
	edit: async (req, res) => {
		try {
			const usuario = await userService.getOneBy(req.params.id);
			let rol = await roleService.getAllRoles();
			res.render('users/admin/user-edit', { usuario : usuario, roles : rol });
		} catch (error) {
			console.error("Error al editar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	// Update - Method to update
	update: async (req, res) => {
		try {
			if (req.file) {
				let user = req.body;
				user.profile_picture = 'img/imgUsers/' + req.file.filename;
			} 
			await userService.update(req.body, req.params.id);
			res.redirect('/usuarios/admin');
		} catch (error) {
			console.error("Error al actualizar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	// Delete - Delete one product from DB
	destroy: async (req, res) => {
		try {
			console.log("REQ PARAMS--> ", req.params.id);
			await userService.delete(req.params.id);
			res.redirect("/usuarios/admin");
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
}

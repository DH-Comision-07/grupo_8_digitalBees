const userService = require("../service/userService");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const usersController = {

	//USUARIOS CLIENTES

    register: (req, res) => {
		res.render("users/register")
	},

	processRegister:(req,res)=>{
		//array de validaciones
		const resultValidation= validationResult(req);
		//resultValidation en su propiedad errors es mayor a cero
		if(resultValidation.errors.length > 0){
			return res.render('users/register',{
				//errors es la variable que voy a pasar a la vista, mapped convierte el array en un objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDb =userService.findByField('email', req.body.email);

		if (userInDb) {
			return res.render('users/register',{
				//errors es la variable que voy a pasar a la vista, mapped convierte el array en un objeto literal
				errors: {
					email:{
						msg:'este email ya esta registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password : bcryptjs.hashSync(req.body.password, 10),
			profile_picture : req.file.filename,
			account_status: "active",
			user_role: "Client"
		}

		let userCreated = userService.save(userToCreate)

		return res.redirect("/usuarios/login");
	},

	login: (req, res) => res.render("users/login"), 

	loginProcess:(req , res)=>{
		//"email" es el campo que esta en el json, req.body.email es el valor que digita el usuario en el formulario
		//"email tiene que coincidir con el nombre en el json y en el name de la vista"
		let userToLogin = userService.findByField('email', req.body.email);
		console.log("--->>>", userToLogin);
		
		if (userToLogin) {
			//esto es para crear un clon del usuario en sesion y no una referencia en memoria que apunte al principal
			let userToSession = JSON.parse(JSON.stringify(userToLogin))
			//req.body.password es lo que llega de la vista, en la vista el name tiene que ser password
			
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToSession.password)
			if (isOkThePassword){
				userToLogin.last_login = new Date().toLocaleDateString()
				userService.update(userToLogin, userToLogin.user_id);
				delete userToSession.password;
				req.session.userLogged = userToSession;

				if (req.body.remember) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect("/usuarios/perfil")
			}
			return res.render('users/login' , {
				errors:{
					email: {
						msg :'Las credenciales son invalidas'
					}
				}
			});
			
		}
		
		return res.render('users/login' , {
			errors:{
				email: {
					msg :'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},

	profile: (req, res) => {
		res.render("users/userProfile", {
			usuario: req.session.userLogged
		})
	},

	//crear boton de logout
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/')
	},

	/************************************************/
	//USUARIOS ADMINISTRADOR
   
	//get all users
	authorization: (req, res) => {
		res.render('users/admin/adminUsers',{'usuarios': userService.getAll()})
	},
	//get detail user
	detail: (req, res) =>{
		res.render("users/admin/usersDetail", {'usuario': userService.getOneBy(req.params.id)})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('users/admin/user-create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		if (req.file) {
			let user = req.body;
			user.password = bcryptjs.hashSync(req.body.password, 10),
			user.profile_picture = 'img/imgUsers/' + req.file.filename;
			userService.save(req.body);
			res.render("users/admin/adminUsers", {'usuarios': userService.getAll()});
			
		}else{
			res.render("users/admin/adminUsers", {'usuarios': userService.getAll()});
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('users/admin/user-edit',{ 'usuario': userService.getOneBy(req.params.id)})
	},
	// Update - Method to update
	update: (req, res) => {
		if (req.file) {
			let user = req.body;
			user.profile_picture = 'img/groups/' + req.file.filename;
			res.render('users/admin/usersDetail',{'usuario': userService.update(req.body,req.params.id) })
			
		}else{
			res.render('users/admin/usersDetail',{'usuario': userService.update(req.body,req.params.id) })
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		userService.delete(req.params.id);
		res.redirect("/usuarios/admin");
	}   
}

module.exports = usersController;
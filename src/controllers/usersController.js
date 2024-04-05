const userService = require("../service/userService");
const { validationResult } = require('express-validator');

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
		
		//return res.send("pasaron las validaciones");
	},

	storeRegister: (req, res) => {
		if (req.file) {
			let user = req.body;
			user.img = 'img/imgUsers/' + req.file.filename;
			userService.save(req.body);
			res.render('users/admin/adminUsers',{'usuarios': userService.getAll()})
			
		}else{
			res.render('users/admin/adminUsers',{'usuarios': userService.getAll()})
		}
	},

	login: (req, res) => res.render("users/login"),

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
			user.img = 'img/imgUsers/' + req.file.filename;
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
		res.render('users/admin/usersDetail',{'usuario': userService.update(req.body,req.params.id) })
		//res.send(req.body);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		userService.delete(req.params.id);
		res.redirect("/usuarios/admin");
        /* Considero que deberiamos incluir en la vista "usuarios" un mensaje que aparezca después
        de la eliminación: "USUARIO ELIMINADO CON ÉXITO" */
	}   
}

module.exports = usersController;
const userService = require("../service/userService")

const usersController = {

	//USUARIOS CLIENTES

    register: (req, res) => {
		res.render("users/register")
	},

	processRegister:(req,res)=>{
		return res.send({
			body: req.body,
			file:req.file
		});
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
			user.img = 'img/people/' + req.file.filename;
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
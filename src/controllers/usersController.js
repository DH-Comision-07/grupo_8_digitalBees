const userService = require("../service/userService")

const usersController = {
    /*Modificar la vista a renderizar de la lista de todos los usuarios*/ getAll:(req, res) => res.render("users/listaUsuarios", {'listaDeUsuarios': userService.getAll()}),
    /*Chequear esta línea a ver si aplica o no*/ //mainProducts:(req, res) => res.render("products/productCart", {'listaDeCarrito': productService.getMain()}),
    /*Modificar la vista a renderizar del detalle de un usuario*/ detail: (req, res) => res.render("users/user-detail", {'usuario': userService.getOneBy(req.params.id)}),
    
    login: (req, res) => res.render("users/login"),

    register: (req, res) => res.render("users/register"),

    authorization: (req, res) => res.render("users/admin/admin"),

	// Create - Form to create
	create: (req, res) => {
		/* Enlazar con la vista de creación de usuario */ res.render('users/user-create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		if (req.file) {
			let user = req.body;
			user.img = 'img/people/' + req.file.filename;
			userService.save(req.body);
			res.render("users/listaUsuarios", {'listaDeUsuarios': userService.getAll()});
			//res.send("producto creado!!")
		}else{
			res.render("users/listaUsuarios", {'listaDeUsuarios': userService.getAll()});
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		/* Enlazar con la vista user-edit */ res.render('users/user-edit',{ 'usuario': userService.getOneBy(req.params.id)})
	},
	// Update - Method to update
	update: (req, res) => {
		/* Enlazar con la vista user-detail */ res.render('users/user-detail',{'usuario': userService.update(req.body,req.params.id) })
		//res.send(req.body);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		userService.delete(req.params.id);
		res.redirect("/usuarios");
        /* Considero que deberiamos incluir en la vista "usuarios" un mensaje que aparezca después
        de la eliminación: "USUARIO ELIMINADO CON ÉXITO" */
	}   
}

module.exports = usersController;
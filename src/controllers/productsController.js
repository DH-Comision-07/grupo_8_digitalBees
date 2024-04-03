const productService= require("../service/productService")

const productsController={
    getAll:(req, res) => res.render("products/listaProductos", {'listaDeProductos': productService.getAll()}),
    mainProducts:(req, res) => res.render("products/productCart", {'listaDeCarrito': productService.getMain()}),
    detail: (req, res) => res.render("products/product-detail", {'producto': productService.getOneBy(req.params.id)}),
    

	//get all products admin
	getAllAdmin:(req, res) => res.render("users/admin/admin", {'listaDeProductos': productService.getAll()}),
	// Create - Form to create
	create: (req, res) => {
		res.render('products/product-create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		if (req.file) {
			let product = req.body;
			product.img = 'img/groups/' + req.file.filename;
			productService.save(req.body);
			res.render("users/admin/admin", {'listaDeProductos': productService.getAll()})
			//res.send("producto creado!!")
		}else{
			res.render("users/admin/admin", {'listaDeProductos': productService.getAll()})
			
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('products/product-edit',{ 'producto': productService.getOneBy(req.params.id)})
	},
	// Update - Method to update
	update: (req, res) => {
		if (req.file) {
			let product = req.body;
			product.img = 'img/groups/' + req.file.filename;
			res.render('products/product-detail',{'producto': productService.update(product,req.params.id) })
			
		}else{
			res.render('products/product-detail',{'producto': productService.update(req.body,req.params.id) })
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productService.delete(req.params.id);
		res.redirect("/productos/admin")
	}
    
}

module.exports = productsController;
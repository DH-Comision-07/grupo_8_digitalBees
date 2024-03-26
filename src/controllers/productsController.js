const productService= require("../service/productService")

const productsController={
    getAll:(req, res) => res.render("products/listaProductos", {'listaDeProductos': productService.getAll()}),
    mainProducts:(req, res) => res.render("products/productCart", {'listaDeCarrito': productService.getMain()}),
    detail: (req, res) => res.render("products/product-detail", {'producto': productService.getOneBy(req.params.id)}),
    
	// Create - Form to create
	create: (req, res) => {
		res.render('products/product-create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		productService.save(req.body);
		res.render("products/listaProductos", {'listaDeProductos': productService.getAll()})
		//res.send("producto creado!!")
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('products/product-edit',{ 'producto': productService.getOneBy(req.params.id)})
	},
	// Update - Method to update
	update: (req, res) => {
		res.render('products/product-detail',{'producto': productService.update(req.body,req.params.id) })
		//res.send(req.body);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productService.delete(req.params.id);
		res.redirect("/productos")
	}
    
}

module.exports = productsController;
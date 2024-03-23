const productService= require("../service/productService")

const productsController={
    getAll:(req, res) => res.render("products/listaProductos", {'listaDeProductos': productService.getAll()}),
    mainProducts:(req, res) => res.render("products/productCart", {'listaDeCarrito': productService.getMain()}),
    detail: (req, res) => res.render("products/product-detail", {'producto': productService.getOneBy(req.params.id)}),
    
}

module.exports = productsController;
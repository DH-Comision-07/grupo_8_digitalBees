const productService= require("../model/service/productService")

const indexController={
    mainProducts:(req, res) => res.render("index", {'listaDeProductos': productService.getMain()}) 
}

module.exports = indexController;
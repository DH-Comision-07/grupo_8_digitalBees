const productService= require("../service/indexService")

const indexController={
    mainProducts:(req, res) => res.render("index", {'listaDeProductos': productService.getMain()}) 
}

module.exports = indexController;
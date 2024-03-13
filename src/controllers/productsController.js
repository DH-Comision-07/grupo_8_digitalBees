let productos = require('../views/database/datosProductos');
const listaDeProductos= productos()
let producto;
const path = require('path');

const productsController={
    getAll:(req, res) =>res.render("products/listaProductos", {"listaDeProductos" : listaDeProductos}),
    getMain:(req, res) =>res.render("products/productCart", {listaDeProductos}),
    getOne: (req, res) => {
        let idProducto=req.params.id;
            productoFiltrado = listaDeProductos.filter(function(producto){
                return producto.id == idProducto
            })

        res.render('products/product-detail', {"producto": productoFiltrado[0]} )
    }
    
}

module.exports = productsController;
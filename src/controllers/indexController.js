let productos = require('../views/database/datosProductos');
const listaDeProductos= productos()
const path = require('path');

const indexController={
    getMain:(req, res) =>res.render("index", {listaDeProductos})
}

module.exports = indexController;
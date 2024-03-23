const fs = require('fs');
const path = require('path');
//con el require y la ruta ya me parsea el archivo JSON
const products = require('../data/productos.json')
const productsFilePath = path.join(__dirname, '../data/productos.json');

//aqui va todas las funciones que voy a pasar al controller
let productService = {  
    //paso los productos al atributo products
    products: products,
    //me retorna todos los productos del archivo JSON
    getAll: function(){
        return this.products;
    },

    getMain: function(){
        return this.products.filter((product) => product.destacado == true);
    },

    // Detail - Detail from one product
	getOneBy: function(id){
        return this.products.find((product) => product.id == id);
    }
}

module.exports = productService;
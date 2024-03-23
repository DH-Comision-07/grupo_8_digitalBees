const fs = require('fs');
const path = require('path');
const products = require('../data/productos.json')
const productsFilePath = path.join(__dirname, '../data/productos.json');

//aqui va todas las funciones que voy a pasar al controller
let indexService = {  
    //paso los productos al atributo products
    products: products,
    getMain: function(){
        return this.products.filter((product) => product.destacado == true);
    }
}

module.exports = indexService;
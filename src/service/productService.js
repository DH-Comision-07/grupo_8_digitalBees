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
        return this.products.filter((product) => product.popular == true);
    },

    // Detail - Detail from one product
	getOneBy: function(id){
        return this.products.find((product) => product.id == id);
    },
    save: function(product){
        console.log(product)
         let idMayor = products.reduce((contador, product) => {
            if (product.id > contador) {
                return product.id;
            }
            return contador;
        }, 0);
        
        let idIncrementado = idMayor + 1;
        
        let NewProduct = {
            id: idIncrementado,
            title: product.title,
            cost: product.cost,
            img: product.img,
            description: product.description,
            category: product.category
        };     

        //guardo el producto en el array productos
        this.products.push(NewProduct);
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(this.products))
        return "OK"
    },

    update: function(formProductUpdate,id){
       
        let productSearch = products.find(productSearch => productSearch.id == id)
        
        if (productSearch) {
            productSearch.title = formProductUpdate.title;
            productSearch.cost = formProductUpdate.cost;
            productSearch.img = formProductUpdate.img;
            productSearch.description= formProductUpdate.description;
            productSearch.category= formProductUpdate.category;
        }

        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(this.products))
        
        return productSearch;

    },

    delete: function (id) {
        // contiene la nueva lista de productos sin incluir el que quiero eliminar    
        let newProducts = this.products.filter((product) => product.id != id);
        // sobreescribo la lista de productos por la nueva lista
        this.products = newProducts;
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify( this.products))
        return newProducts;
    }

}

module.exports = productService;
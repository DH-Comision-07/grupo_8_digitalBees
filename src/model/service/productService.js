const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let db = require('../db/models')



module.exports = {  
  
    getAll: async function() {
        try {
            return await db.Productos.findAll();
        } catch (error) {
            console.log(err);
            reject([])
        } 
    },
    getAllInList: async function(productos) {
        try {

            return await db.Productos.findAll({
                where: {
                    id: {
                        [Op.in]: productos
                      }
                } 
            });
        } catch (error) {
            console.log(error);
            reject([])
        } 
    },

    getMain: async function() {
        try {
            return await db.Productos.findAll({
                where:{
                    popular: true 
                }
            });
        } catch (error) {
            console.log(err);
        } 
    },

    getOneBy: async function(id) {
        try {
            return await db.Productos.findByPk(id);
        } catch (error) {
            console.log(error);
        } 
    },

    save: async function(nuevoProducto){
        let producto = new Producto(nuevoProducto);
        let productoCreado= await db.Productos.create(producto)
        return productoCreado.dataValues
        
    },

    update: async function (body, id){
        try {
            let producto = new Producto (body);
            await db.Productos.update(producto, {where: {id: id}});
        } catch (error) {
            console.log(error);
            throw new Error("Un error");
        }
    },

    delete: async function (idProducto){
        
        //elimino el producto
        let productoEliminado = await db.Productos.destroy({
            where: {
                id : idProducto
            }
        })

        return productoEliminado
    }

}

function Producto({title, cost, img, description, popular, stock, categoria_id}){
    this.title = title;
    this.cost = cost;
    this.img = img;
    this.description = description;
    this.popular = popular;
    this.stock = stock;
    this.categoria_id = categoria_id;
}
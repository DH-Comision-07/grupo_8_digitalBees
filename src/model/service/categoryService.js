let db = require('../db/models')

module.exports = {
    getAllCategories: async function() {
        try {
            return await db.Categorias.findAll();
        } catch (error) {
            console.log(error);
        } 
    },
    getProductsByCategories: async function(categoriaId) {
        try {
            return await db.Productos.findAll({
                where: {
                    categoria_id: categoriaId
                }
            });
        } catch (error) {
            console.log(error);
        }
    },

    getAllCategoriesByProducts: async function() {
        try {
            // Obtener todas las categorías con la cuenta de productos
            const categorias = await db.Categorias.findAll({
                include: [{
                    model: db.Productos,
                    as: 'CategoriasConProductos', // El alias definido en la asociación de Categorias con Productos
                }],
            });
    
            // Mapear las categorías para agregar el número de productos
            const categoriasConProductos = categorias.map(categoria => {
                const numeroProductos = categoria.CategoriasConProductos.length;
                return {
                    id: categoria.id,
                    name: categoria.name,
                    numeroProductos: numeroProductos
                };
            });
    
            return categoriasConProductos;
        } catch (error) {
            console.log(error);
        } 
    },
}

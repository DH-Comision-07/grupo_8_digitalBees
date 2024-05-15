let db = require('../db/models')

module.exports = {
    getAllCategories: async function() {
        try {
            return await db.Categorias.findAll();
        } catch (error) {
            console.log(error);
        } 
    },
}

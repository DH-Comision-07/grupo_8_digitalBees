let db = require('../db/models')

module.exports = {
    getOne: async function(id) {
        try {
            return await db.Pedidos.findByPk(id);
        } catch (error) {
            console.log(error);
        } 
    },
    getAllOrders: async function(idUsuario) {
        try {
            return await db.Pedidos.findAll(
                {
                    where: {
                        usuarios_user_id: idUsuario
                    } 
                }
            );
        } catch (error) {
            console.log(error);
        } 
    },
}

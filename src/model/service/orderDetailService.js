let db = require('../db/models')

module.exports = {
    getOneDetail: async function(idOrder) {
        try {
            return await db.DetallePedidos.findAll({
                where: {
                    pedido_id: idOrder
                } 
            });

        } catch (error) {
            console.log(error);
        } 
    },
}
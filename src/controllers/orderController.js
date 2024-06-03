const orderService = require('../model/service/orderService')
const orderDetailService = require('../model/service/orderDetailService')
const productService = require('../model/service/productService')

module.exports ={
    getOneOrder: async function(req, res) {
        try {
            let pedido = await orderService.getOne(req.params.id); 
            let detallePedido = await orderDetailService.getOneDetail(req.params.id)
            let productosID = []
            for (let i = 0; i < detallePedido.length; i++) {
                let productoId = detallePedido[i].productos_id;
                productosID.push(productoId)
            }
            let producto = await productService.getAllInList(productosID)
            res.render('products/productOrder', {pedido: pedido, detallePedido: detallePedido, producto: producto });  
            //res.send({ pedido: pedido, detallePedido: detallePedidos, productos: productos });
        } catch (error) {
			console.log(error);
            res.send("Ha ocurrido un error inesperado al recuperar el producto ").status(500);
        }     
    },
}
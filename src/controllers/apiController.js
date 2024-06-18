const productService = require("../model/service/productService");
let db = require('../model/db/models')

module.exports = {
  product: async function (req, res) {
    let producto = await productService.getOneBy(req.params.id);
    return res.json(producto)

  },
  checkout: async function (req, res) {
    console.log("REQ.BODY---> ", req.body);
    let order = await db.Pedidos.create(
      { ...req.body, usuarios_user_id: req.session.userLogged.user_id }
    )


    let arrayDetallePedidos = req.body.detallePedidos
    let orderDetail = []

    for (let i = 0; i < arrayDetallePedidos.length; i++) {
      let detail = arrayDetallePedidos[i];
      orderDetail.push(await db.DetallePedidos.create(
        {
          quantity: detail.quantity,
          cost: detail.cost,
          subtotal: detail.subtotal,
          pedido_id: order.id,
          productos_id: detail.productId
        }
      ))  
    }

    console.log("ORDER--->> ", order);
    res.json({ ok: true, status: 200, order, orderDetail })
  }
}
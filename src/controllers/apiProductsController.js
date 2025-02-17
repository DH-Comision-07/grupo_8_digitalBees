const productService = require("../model/service/productService");
let db = require('../model/db/models');
const categoryService = require("../model/service/categoryService");

module.exports = {
  product: async function (req, res) {
    let producto = await productService.getOneBy(req.params.id);
    return res.json(producto)

  },
  products: async function (req, res) {
    let productos = await productService.getAll();
    let count = productos.length;
    let countProductsbyCategories= await categoryService.getAllCategoriesByProducts();

    let response = {
      count: count,
      countByCategory:countProductsbyCategories,
      products: productos
      
    };

    return res.json(response)

  },

  checkout: async function (req, res) {
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

    res.json({ ok: true, status: 200, order, orderDetail })
  }
}
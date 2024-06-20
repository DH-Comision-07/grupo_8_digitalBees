const userService = require("../model/service/userService");
let db = require('../model/db/models');


module.exports = {
  user: async function (req, res) {
    let usuario = await userService.getOneBy(req.params.id);

    usuarioResponse ={
        user_id:usuario.user_id ,
        email: usuario.email,
        first_name:usuario.first_name,
        last_name:usuario.last_name ,
        profile_picture: usuario.profile_picture,
        address: usuario.address,
        city: usuario.city,
        country:usuario.country ,
        phone_number: usuario.phone_number,
        subscription_date: usuario.subscription_date
    };

    return res.json(usuarioResponse)

  },
  users: async function (req, res) {
    let usuarios = await userService.getAll();
    let count = usuarios.length;
    
    let response = {
      count: count,
      users: usuarios
      
    };

    return res.json(response)

  },
}
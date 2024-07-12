let db = require('../db/models')

module.exports ={
    getAll: async function() {
        try {
            return await db.Usuarios.findAll();
        } catch (error) {
            console.log(err);
            reject([])
        } 
    },
    getOneBy: async function(id) {
        try {
            return await db.Usuarios.findByPk(id);
        } catch (error) {
            console.log(error);
        } 
    },

    findByField: async function(valueField){

        try {
            let userFound = await db.Usuarios.findOne({
                where: {
                    email: valueField 
                }
            });
            return userFound
            
        } catch (error) {
            console.log(error); 
        }  
    },
    save: async function(nuevoUsuario){
        let usuario = new Usuario(nuevoUsuario);
        let usuarioCreado= await db.Usuarios.create(usuario)
        return usuarioCreado.dataValues  
    },

    update: async function (body, id){
        try {
            let usuario = new Usuario(body);
            await db.Usuarios.update(usuario, {where: {user_id: id}});
            body.id = id     
            return body
        } catch (error) {
            console.log(error);
            throw new Error("Un error");
        }
    },

    delete: async function (idUsuario){

        try {

            let pedidos= await db.Pedidos.findAll({
                where: {
                    usuarios_user_id: idUsuario
                }
            });
            
            pedidos.forEach(async pedido => {
                await db.DetallePedidos.destroy({
                    where: {
                        pedido_id: pedido.id
                    }
                });
            });

            //eliminar los pedidos asociados al usuario
            await db.Pedidos.destroy({
                where: {
                    usuarios_user_id: idUsuario
                }
            });
            
            // eliminar el usuario
            let UsuarioEliminado = await db.Usuarios.destroy({
                where: {
                    user_id : idUsuario
                }
            });
    
            return UsuarioEliminado;
        } catch (error) {
            console.log(error);
            throw new Error("Error al eliminar el usuario");
        }
    }
}
function Usuario({email, password, first_name, last_name, profile_picture, address, city, country, phone_number, subscription_date, last_login, account_status, user_role_id}){
    this.email = email;
    this.password = password ;
    this.first_name = first_name;
    this.last_name = last_name;
    this.profile_picture = profile_picture ;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phone_number = phone_number;
    this.subscription_date = new Date();
    this.last_login = last_login;
    this.account_status = account_status;
    this.user_role_id = user_role_id;
}

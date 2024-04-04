const fs = require('fs');
const path = require('path');
//El "require" junto la "ruta" parsea el archivo JSON, por lo cual no se requiere ninguna conversión adicional
const users = require('../data/usuarios.json')
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

//aqui están todas las funciones que el controller invoca
let userService = {  
    //se pasan los usuarios al atributo users
    users: users,
    //retorna todos los usuarios del archivo JSON
    getAll: function(){
        return this.users;
    },

    // Detail - Detail from one user
	getOneBy: function(id){
        return this.users.find((user) => user.user_id == id);
    },
    save: function(user){
         let idMayor = users.reduce((contador, user) => {
            if (user.user_id > contador) {
                return user.user_id;
            }
            return contador;
        }, 0);
        
        let idIncrementado = idMayor + 1;
        
        let NewUser = {
            user_id: idIncrementado,
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            birthdate: user.birthdate,
            address: user.address,
            city: user.city,
            country: user.country,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture,
            subscription_date: user.subscription_date,
            last_login: user.last_login,
            account_status: user.account_status,
            user_role: user.user_role
        };     

        //guarda el nuevo usuario en el array usuarios
        this.users.push(NewUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(this.users)); // Ser reemplazó "path.join(__dirname, '../data/usuarios.json')" por la variable "usersFilePath"
        return "OK"
    },

    update: function(formUserUpdate,id){
       
        let userSearch = users.find(user => user.user_id == id);
        
        if (userSearch) {
            userSearch.email = formUserUpdate.email;
            userSearch.password = formUserUpdate.password;
            userSearch.first_name = formUserUpdate.first_name;
            userSearch.last_name= formUserUpdate.last_name;
            userSearch.gender= formUserUpdate.gender;
            userSearch.birthdate= formUserUpdate.birthdate;
            userSearch.address= formUserUpdate.address;
            userSearch.city= formUserUpdate.city;
            userSearch.country= formUserUpdate.country;
            userSearch.phone_number= formUserUpdate.phone_number;
            userSearch.profile_picture= formUserUpdate.profile_picture;
            userSearch.subscription_date= formUserUpdate.subscription_date;
            userSearch.last_login= formUserUpdate.last_login;
            userSearch.account_status= formUserUpdate.account_status;
            userSearch.user_role= formUserUpdate.user_role;
        }

        fs.writeFileSync(usersFilePath, JSON.stringify(this.users)); // Ser reemplazó "path.join(__dirname, '../data/usuarios.json')" por la variable "usersFilePath"
        
        return userSearch;
    },

    delete: function (id) {
        // contiene la nueva lista de usuarios sin incluir el que se elimina  
        let newUsers = this.users.filter((user) => user.user_id != id);
        // sobreescribe la lista de usuarios por la nueva lista
        this.users = newUsers;
        fs.writeFileSync(usersFilePath, JSON.stringify( this.users)); // Ser reemplazó "path.join(__dirname, '../data/usuarios.json')" por la variable "usersFilePath"
        return newUsers;
    }
}

module.exports = userService;